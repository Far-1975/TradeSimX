import uuid
from flask import Blueprint, request, jsonify
from auth.routes import token_required
from agenticAI.insights import generate_insights
# from reports.builder import save_report
from models.backtest import BacktestModel
from backtest.utils import add_technical_indicators, transform_data, fetch_price_history_by_interval
from backtest.backtest import backtest_strategy
from backtest.report_generator import ReportGenerator
from datetime import datetime
from backtest.strategy import Strategy
from backtest.main import Coin
import pandas as pd
import os
import json

backtest_routes = Blueprint('backtest_routes', __name__)
backtest_model = None

def init_routes(db):
    global backtest_model
    backtest_model = BacktestModel(db)

    @backtest_routes.route('/backtest', methods=['POST'])
    # @token_required
    def run_backtest():
        try:
            try:
                Coin.reset()
            except Exception as e:
                print(f"Error in Coin.reset(): {str(e)}")
                return jsonify({"status": "error", "message": f"Error in Coin.reset(): {str(e)}"}), 500

            try:
                config = request.get_json()
                # print(config)
                # print("Hellooooo")
            except Exception as e:
                print(f"Error in parsing request JSON: {str(e)}")
                return jsonify({"status": "error", "message": f"Error in parsing request JSON: {str(e)}"}), 400

            coins = [config["ticker"]]

            try:
                start_date_object = datetime.strptime(config['start_date'], "%Y-%m-%d")
                end_date_object = datetime.strptime(config['end_date'], "%Y-%m-%d")
            except Exception as e:
                print(f"Invalid date format: {str(e)}")
                return jsonify({"status": "error", "message": f"Invalid date format: {str(e)}"}), 400

            start_time = int(start_date_object.timestamp()) * 1000
            end_time = int(end_date_object.timestamp()) * 1000

            interval = config['interval']
            coin_objects = []

            for coin in coins:
                try:
                    df = None
                    PAIR = coin.upper()
                    # if os.path.exists(f'../data/{PAIR}.csv'):
                    #     df = pd.read_csv(f'../data/{PAIR}.csv')
                    #     # df = calculate_technical_indicators(df)
                    # else:
                    print("Calling fetch data function")
                    prices = fetch_price_history_by_interval(PAIR, interval, start_time, end_time)
                    print("Returned from fetch data function")
                    print("Calling Transform data function")
                    df = transform_data(prices, PAIR)
                    print("Returned from transform data function")
                    # save to file
                    # df.to_csv(f'../data/{PAIR}.csv', index=False)
                    coin_objects.append(Coin(coin, PAIR, df))
                except Exception as e:
                    print(f"Error handling coin {coin}: {str(e)}")
                    return jsonify({"status": "error", "message": f"Error handling coin {coin}: {str(e)}"}), 500

            try:
                print("Calling add_technical_indicators function")
                df = add_technical_indicators(df, config['custom_indicators'])
                print("Returned from add_technical_indicators function")
            except Exception as e:
                print(f"Error adding technical indicators: {str(e)}")
                return jsonify({"status": "error", "message": f"Error adding technical indicators: {str(e)}"}), 500

            # Run backtest
            strategy = Strategy(config)

            try:
                print("Starting backtest...")
                # Run the backtest
                for t in range(len(coin_objects[0].df)):
                    # print(t)
                    for coin in coin_objects:
                        current_data = coin.df.iloc[t]
                        if len(current_data) > 0:
                            backtest_strategy(coin, current_data, strategy)
            except Exception as e:
                print(f"Error during backtest loop: {str(e)}")
                return jsonify({"status": "error", "message": f"Error during backtest loop: {str(e)}"}), 500

            # Generate report
            if len(Coin.all_trades) > 0:
                try:
                    # print("Helloooooooo")
                    report_generator = ReportGenerator(Coin.all_trades, initial_balance=1)
                    report_filename = f"backtest_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
                    report_path = f"reports/{report_filename}"
                    # print("Helloooooooo")
                    report = report_generator.generate_full_report()
                    report["symbol"] = config["ticker"]
                    # save report to file
                    with open("test.json", 'w') as f:
                        json.dump(report, f)
                    insightsAndReportID = generate_insights(report)
                    report_id = insightsAndReportID['report_id']
                    # print("Helloooooooo")

                    # Store in MongoDB
                    backtest_id = backtest_model.create_backtest(
                        user_id="123",
                        # user_id=current_user['_id'],
                        input_params=config,
                        results=report,
                        report_id=report_id,
                        insights=insightsAndReportID['insights']
                    )

                    return jsonify({
                        "status": "success",
                        "backtest_id": backtest_id,
                        "report_url": f"/report/{report_id}",
                        "report_id": report_id,
                        "data": report,
                        "insights": insightsAndReportID
                    }), 200
                except Exception as e:
                    print(f"Error generating report or saving to database: {str(e)}")
                    return jsonify({"status": "error", "message": f"Error generating report or saving to database: {str(e)}"}), 500
            else:
                return jsonify({
                    "status": "success",
                    "message": "No trades generated"
                }), 200

        except Exception as e:
            print(f"An unexpected error occured!! {str(e)}")
            return jsonify({
                "status": "error",
                "message": str(e)
            }), 500


    @backtest_routes.route('/backtest/<backtest_id>', methods=['GET'])
    @token_required
    def get_backtest_result(current_user, backtest_id):
        try:
            result = backtest_model.get_backtest(backtest_id)
            if not result:
                return jsonify({
                    "status": "error",
                    "message": "Backtest not found"
                }), 404

            # Check if user owns this backtest
            # if result['user_id'] != current_user['_id']:
            #     return jsonify({
            #         "status": "error",
            #         "message": "Unauthorized"
            #     }), 403

            return jsonify({
                "status": "success",
                "data": result
            }), 200

        except Exception as e:
            return jsonify({
                "status": "error",
                "message": str(e)
            }), 500

    return backtest_routes 