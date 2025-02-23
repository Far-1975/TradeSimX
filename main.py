# import os
# import pandas as pd

# from utils import fetch_price_history_by_interval, transform_data, add_technical_indicators
# from backtest import backtest_strategy
# import time
# from datetime import datetime
# import json
# from strategy import Strategy
# from report_generator import ReportGenerator


# class Coin:
#     usdt_balance = 1
#     position = False
#     curr_coin = "USDT"
#     all_trades = []

    
#     def __init__(self, name, pair, df, entry_price=0, entry_time=-1,  trades=[]):
#         # Basic info
#         self.name = name
#         self.pair = pair
#         self.df = df
        
#         # Position info
#         self.entry_price = entry_price
#         self.entry_time = entry_time
        
#         # Performance tracking
#         self.trade_history = []
        

        

#     def enter_trade(self, entry_price, close_time_timestamp):
#         self.__class__.position = True
#         self.__class__.curr_coin = self.name

#         self.entry_price = entry_price
#         self.entry_time = close_time_timestamp
#         # strategy.risk_manager.initialize_trade(entry_price)


#     def exit_trade(self, trade_result, profit_pct):
#         self.__class__.position = False
#         self.__class__.all_trades.append(trade_result)
#         self.__class__.curr_coin = "USDT"
#         self.__class__.usdt_balance += (self.usdt_balance * profit_pct/100)

#         # self.trades.append(trade_result)

#         self.entry_price = 0
#         self.entry_time = -1

#         self.update_trade_history(trade_result)
            

#     def update_trade_history(self, trade):
#         """Update trade history and check for blocking conditions"""
#         self.trade_history.append(trade)

            

    



# with open('input.json', 'r') as f:
#     config = json.load(f)

# coins = [config["ticker"]]

# start_date_object = datetime.strptime(config['start_date'], "%Y-%m-%d")
# end_date_object = datetime.strptime(config['end_date'], "%Y-%m-%d")

# start_time = int(start_date_object.timestamp())*1000
# end_time = int(end_date_object.timestamp())*1000


# # print("start time - ", start_time)
# # print("end time - ", end_time)

# interval = config['interval']



# print("Starting backtest")
# coin_objects = []
# for coin in coins:
#     df = None
#     PAIR = coin.upper()+"USDT"
#     if os.path.exists(f'./data/{PAIR}.csv'):
#         df = pd.read_csv(f'./data/{PAIR}.csv')
#         # df = calculate_technical_indicators(df)
#     else:
#         prices = fetch_price_history_by_interval(PAIR, interval, start_time, end_time)
#         df = transform_data(prices, PAIR)
#         #save to file
#         df.to_csv(f'./data/{PAIR}.csv', index=False)

    
#     coin_objects.append(Coin(coin, PAIR, df))



# df = add_technical_indicators(df, config['custom_indicators'])


# # Create strategy
# strategy = Strategy(config)
# # for entry in strategy.entry_conditions:
# #     # print(entry)
# #     for condition in entry:
# #         print(condition.lhs)    
# #         print(condition.operator)    
# #         print(condition.rhs)    
# # for exit in strategy.exit_conditions:
# #     # print(entry)
# #     for condition in exit:
# #         print(condition.lhs)    
# #         print(condition.operator)    
# #         print(condition.rhs)    

# # print(strategy.entry_conditions)
# # print(strategy.exit_conditions)

# # exit()

# for t in range(len(coin_objects[0].df)):
#     for coin in coin_objects:
#             current_data = coin.df.iloc[t]
#             if len(current_data) > 0:
#                 backtest_strategy(coin, current_data, strategy)



# # for coin in coin_objects:
# #     print(coin.trades)

# total_trades = len(Coin.all_trades)
# if total_trades > 0:
#     total_profit = sum(trade['profit_percentage'] for trade in Coin.all_trades)
#     avg_profit = total_profit / total_trades
#     win_rate = sum(1 for trade in Coin.all_trades if trade['profit_percentage'] > 0) / total_trades
#     best_trade = max(trade['profit_percentage'] for trade in Coin.all_trades)

#     # Print final results
#     print(f"Final Results:\n")
#     print(f"Total Trades: {total_trades}\n")
#     print(f"Average Profit: {avg_profit:.2f}%\n")
#     print(f"Win Rate: {win_rate:.2%}\n")
#     print(f"Best Trade: {best_trade:.2f}%\n")
#     print(f"Final Balance: {Coin.usdt_balance:.2f} USDT\n")


#     # Generate report
#     report_generator = ReportGenerator(Coin.all_trades, initial_balance=1)
#     report_generator.save_report(f"reports/backtest_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json")


#     log_filename = f"logs/V16StopLossCLV.txt"
#     with open(log_filename, 'a') as log_file:

        
#         # Log final results
#         log_file.write(f"Final Results:\n")
#         log_file.write(f"Total Trades: {total_trades}\n")
#         log_file.write(f"Average Profit: {avg_profit:.2f}%\n")
#         log_file.write(f"Win Rate: {win_rate:.2%}\n")
#         log_file.write(f"Best Trade: {best_trade:.2f}%\n")
#         log_file.write(f"Final Balance: {Coin.usdt_balance:.2f} USDT\n")


        


        
