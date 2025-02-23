import os
import json
import logging
import sys
from datetime import datetime
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_openai import OpenAI, ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.output_parsers import PydanticOutputParser
from pydantic import BaseModel, Field
from typing import List
import asyncio

# Add the backend directory to Python path
backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if backend_dir not in sys.path:
    sys.path.append(backend_dir)

from reports.builder import ReportBuilder

# Load environment variables
load_dotenv()

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class TradingInsights(BaseModel):
    insights: List[str] = Field(description="List of trading strategy insights")

def get_and_save_insights(data):
    """Generate insights using Groq with Llama 3.1 Versatile"""
    try:
        # Initialize Groq with Llama 3.1 Versatile
        llm = ChatGroq(
            temperature=data.get("model_temperature", 0.7),
            groq_api_key=os.getenv('GROQ_API_KEY'),
            model_name="llama-3.1-70b-versatile",
            max_tokens=4096
        )

        # llm = ChatOpenAI(
        #     model_name = os.getenv("OPENAI_MODEL")
        # )

        # Create output parser
        parser = PydanticOutputParser(pydantic_object=TradingInsights)

        # Create a structured prompt optimized for Llama3
        template = """
        You are an expert trading analyst. Analyze the following trading metrics and trade analysis and provide actionable insights in the exact JSON format specified below.

        Basic Metrics:
        - Total Trades: {total_trades}
        - Winning Trades: {winning_trades}
        - Losing Trades: {losing_trades}
        - Win Rate: {win_rate}%
        - Average Profit: {average_profit}%
        - Largest Win: {largest_win}%
        - Largest Loss: {largest_loss}%
        - Average Loss: {average_loss}%
        - Total Return: {total_return}%

        Trade Analysis:
        - Number of Large Wins: {large_wins}
        - Number of Medium Wins: {medium_wins}
        - Number of Small Wins: {small_wins}
        - Number of Small Losses: {small_losses}
        - Number of Medium Losses: {medium_losses}
        - Number of Large Losses: {large_losses}

        Provide at least 4 insights covering:
        1. Strategy performance
        2. Risk management
        3. Potential improvements
        4. Market adaptation

        Return ONLY a JSON object in this exact format, with no additional text:
        {{
            "insights": [
                "1. Performance: <your insight here>",
                "2. Risk: <your insight here>",
                "3. Improvements: <your insight here>",
                "4. Market: <your insight here>"
            ]
        }}
        """

        # Create prompt with format instructions
        prompt = ChatPromptTemplate.from_template(template=template)

        # Format the prompt with metrics data
        basic_metrics = data["basic_metrics"]
        trade_analysis = data["trade_analysis"]["pattern_metrics"]["profit_distribution"]

        messages = prompt.format_messages(
            total_trades=basic_metrics["total_trades"],
            winning_trades=basic_metrics["winning_trades"],
            losing_trades=basic_metrics["losing_trades"],
            win_rate=basic_metrics["win_rate"],
            average_profit=basic_metrics["average_profit"],
            largest_win=basic_metrics["largest_win"],
            largest_loss=basic_metrics["largest_loss"],
            average_loss=basic_metrics["average_loss"],
            total_return=basic_metrics["total_return"],
            large_wins=trade_analysis["large_wins"],
            medium_wins=trade_analysis["medium_wins"],
            small_wins=trade_analysis["small_wins"],
            small_losses=trade_analysis["small_losses"],
            medium_losses=trade_analysis["medium_losses"],
            large_losses=trade_analysis["large_losses"]
        )

        # Get response from Groq
        response = llm.invoke(messages)

        # Manual JSON parsing as fallback
        try:
            # Try the parser first
            insights = parser.parse(response.content)
        except Exception as parse_error:
            logging.warning(f"Parser failed, attempting manual JSON extraction: {str(parse_error)}")
            # Try to extract JSON manually
            try:
                # Find JSON content between curly braces
                json_str = response.content[response.content.find('{'):response.content.rfind('}')+1]
                parsed_data = json.loads(json_str)
                insights = TradingInsights(**parsed_data)
            except Exception as json_error:
                logging.error(f"Manual JSON parsing failed: {str(json_error)}")
                raise

        # Prepare data for ReportBuilder
        strategy_data = {
            "symbol": data["symbol"],
            "total_trades": basic_metrics["total_trades"],
            "winning_trades": basic_metrics["winning_trades"],
            "losing_trades": basic_metrics["losing_trades"],
            "win_rate": basic_metrics["win_rate"],
            "average_profit": basic_metrics["average_profit"],
            "average_loss": basic_metrics["average_loss"],
            "risk_reward_ratio": abs(basic_metrics["average_profit"] / basic_metrics["average_loss"]),
            "profit": basic_metrics["total_return"],
            "max_drawdown": abs(min(trade["profit_percentage"] for trade in data["trade_analysis"]["trade_details"])),
            }

        report_data = {
            "strategy_data": strategy_data,
            "insights": insights.insights,
            "model_info": {
                "model": "llama-3.1-70b-versatile",
                "provider": "Groq",
                "timestamp": datetime.now().isoformat(),
                "temperature": data.get("model_temperature", 0.7)
            }
        }

        # Use ReportBuilder to save the report
        print("Saving Report")
        report_builder = ReportBuilder(report_data)
        report_id = report_builder.save_report()
        print(report_id)
        print("Report Saved")
        
        return {
            "report_id": report_id,
            "insights": insights.insights
        }

    except Exception as e:
        logging.error(f"Error generating insights: {str(e)}")
        logging.exception(e)
        return {
            "report_id": 123,
            "insights": ["Could","Not","Generate","Insights"]
        }

async def async_generate_insights(data):
    """Wrap the main function with asyncio for parallel execution"""
    return await asyncio.to_thread(get_and_save_insights, data)


def generate_insights(data):
    try:
        result = asyncio.run(async_generate_insights(data))
        return result
    except Exception as e:
        logging.error(f"Error generating insights: {str(e)}")
        logging.exception(e)
        return None

if __name__ == "__main__":
    # Load the dummy.json file
    file_path = os.path.join(os.path.dirname(__file__), 'dummy.json')
    try:
        with open(file_path, "r") as f:
            backtest_data = json.load(f)

        # Run the function asynchronously
        result = asyncio.run(async_generate_insights(backtest_data))
        if result:
            print("\nInsights generated successfully!")
            print(f"Report ID: {result['report_id']}")
            print("\nKey Insights:")
            for insight in result['insights']:
                print(f"\n{insight}")
        else:
            print("Failed to generate insights")
    except FileNotFoundError:
        logging.error(f"Could not find dummy.json at {file_path}")
    except Exception as e:
        logging.error(f"Error: {str(e)}")
        logging.exception(e)
