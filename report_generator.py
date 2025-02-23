import json
import pandas as pd
import numpy as np
from datetime import datetime

class ReportGenerator:
    def __init__(self, trades, initial_balance=1):
        self.trades = trades
        self.initial_balance = initial_balance
        
    def calculate_basic_metrics(self):
        metrics = {}
        
        try:
            if not self.trades:
                return metrics
                
            winning_trades = [t for t in self.trades if t.get('profit_percentage', 0) > 0]
            losing_trades = [t for t in self.trades if t.get('profit_percentage', 0) <= 0]

            try:
                profits = [t.get('profit_percentage', 0) for t in self.trades]
                cumulative_returns = np.cumprod(1 + np.array(profits) / 100) - 1
            except Exception as e:
                print(f"Error calculating returns: {e}")
                cumulative_returns = []

            metrics.update({
                "total_trades": len(self.trades),
                "winning_trades": len(winning_trades),
                "losing_trades": len(losing_trades),
                "win_rate": round(len(winning_trades) / len(self.trades)*100, 2) if self.trades else 0,
            })

            # handle  metrics that might fail 
            try:
                metrics["average_profit"] = round(np.mean([t.get('profit_percentage', 0) for t in self.trades]), 2)
            except Exception as e:
                print(f"Error calculating average profit: {e}")
                metrics["average_profit"] = None

            try:
                metrics["largest_win"] = round(max([t.get('profit_percentage', 0) for t in self.trades]), 2)
                metrics["largest_loss"] = round(min([t.get('profit_percentage', 0) for t in self.trades]), 2)
            except Exception as e:
                print(f"Error calculating largest win/loss: {e}")
                metrics["largest_win"] = None
                metrics["largest_loss"] = None

            try:
                metrics["average_win"] = round(np.mean([t.get('profit_percentage', 0) for t in winning_trades]), 2) if winning_trades else 0
                metrics["average_loss"] = round(np.mean([t.get('profit_percentage', 0) for t in losing_trades]), 2) if losing_trades else 0
            except Exception as e:
                print(f"Error calculating average win/loss: {e}")
                metrics["average_win"] = None
                metrics["average_loss"] = None

            try:
                metrics["total_return"] = round((cumulative_returns[-1] * 100), 2) if len(cumulative_returns) > 0 else 0
            except Exception as e:
                print(f"Error calculating total return: {e}")
                metrics["total_return"] = None

        except Exception as e:
            print(f"Error in basic metrics calculation: {e}")
            
        return metrics
        
        
    
        
    def calculate_time_based_metrics(self):
        try:
            df = pd.DataFrame(self.trades)
            df['exit_time'] = pd.to_datetime(df['exit_time'], errors='coerce')
            df = df.dropna(subset=['exit_time'])  # Remove rows with invalid dates
            
            if df.empty:
                return {
                    "monthly_metrics": {},
                    "best_month": None,
                    "worst_month": None
                }

            df['month'] = df['exit_time'].dt.to_period('M')
            
            monthly_returns = {}
            for month, group in df.groupby('month'):
                try:
                    monthly_returns[str(month)] = {
                        "return": round(sum(group.get('profit_percentage', 0)), 2),
                        "trades": len(group),
                        "win_rate": round(len(group[group['profit_percentage'] > 0]) / len(group), 2)
                    }
                except Exception as e:
                    print(f"Error calculating metrics for month {month}: {e}")
                    continue

            if not monthly_returns:
                return {
                    "monthly_metrics": {},
                    "best_month": None,
                    "worst_month": None
                }

            return {
                "monthly_metrics": monthly_returns,
                "best_month": max(monthly_returns.items(), key=lambda x: x[1]['return'])[0],
                "worst_month": min(monthly_returns.items(), key=lambda x: x[1]['return'])[0]
            }

        except Exception as e:
            print(f"Error in time-based metrics calculation: {e}")
            return {
                "monthly_metrics": {},
                "best_month": None,
                "worst_month": None
            }
        
    def analyze_trade_patterns(self):
        if not self.trades:
            return {"trade_details": [], "pattern_metrics": {}}
            
        trade_details = []
        running_balance = self.initial_balance
        
        for i, trade in enumerate(self.trades):
            try:
                profit_pct = trade.get('profit_percentage', 0)
                running_balance *= (1 + profit_pct/100)
                
                trade_info = {
                    "entry_price": round(trade.get('entry_price', 0), 4),
                    "exit_price": round(trade.get('exit_price', 0), 4),
                    "profit_percentage": round(profit_pct, 2),
                    "entry_time": trade.get('entry_time'),
                    "exit_time": trade.get('exit_time'),
                    "trade_type": "win" if profit_pct > 0 else "loss",
                    "profit_size": self.classify_profit_size(profit_pct),
                }

                # Add duration only if both times are available
                try:
                    trade_info["trade_duration"] = self.calculate_trade_duration(trade)
                except Exception as e:
                    print(f"Error calculating trade duration: {e}")
                    trade_info["trade_duration"] = "unknown"

                trade_details.append(trade_info)
                
            except Exception as e:
                print(f"Error processing trade {i}: {e}")
                continue

        return {
            "trade_details": trade_details,
            "pattern_metrics": self.calculate_pattern_metrics(trade_details)
        }
        
    def classify_profit_size(self, profit_pct):
        if profit_pct > 20:
            return "large_win"
        elif profit_pct > 10:
            return "medium_win"
        elif profit_pct > 0:
            return "small_win"
        elif profit_pct > -10:
            return "small_loss"
        elif profit_pct > -20:
            return "medium_loss"
        else:
            return "large_loss"
            
    def calculate_trade_duration(self, trade):
        try:
            entry_time = pd.to_datetime(trade['entry_time'])
            exit_time = pd.to_datetime(trade['exit_time'])
            # print(entry_time,exit_time)
            duration = exit_time - entry_time
            
            # Convert duration to a more readable format
            days = duration.days
            hours = duration.seconds // 3600
            minutes = (duration.seconds % 3600) // 60
            # print(duration,days,hours,minutes)

            duration_parts = ""
            if days > 0:    
                duration_parts += f"{days}d"
            if hours > 0:
                duration_parts += f"{hours}h"
            if minutes > 0:
                duration_parts += f"{minutes}m"
            
            return duration_parts if len(duration_parts)>0 else "0m"
            
        except (ValueError, KeyError):
            return "unknown"
        
    def calculate_pattern_metrics(self, trade_details):
        if not trade_details:
            return {}
            
        df = pd.DataFrame(trade_details)
        
        return {
            "profit_distribution": {
                "large_wins": len(df[df['profit_size'] == 'large_win']),
                "medium_wins": len(df[df['profit_size'] == 'medium_win']),
                "small_wins": len(df[df['profit_size'] == 'small_win']),
                "small_losses": len(df[df['profit_size'] == 'small_loss']),
                "medium_losses": len(df[df['profit_size'] == 'medium_loss']),
                "large_losses": len(df[df['profit_size'] == 'large_loss'])
            }
        }
        
        
        
    def generate_full_report(self):
        report = {
            "basic_metrics": self.calculate_basic_metrics(),
            "time_metrics": self.calculate_time_based_metrics(),
            "trade_analysis": self.analyze_trade_patterns(),
            "report_generated": datetime.now().strftime("%Y-%m-%d %h:%M:%S")
        }
        
        return report
        
    def save_report(self, filename):
        try:
            report = self.generate_full_report()
            with open(filename, 'w') as f:
                json.dump(report, f, indent=4)
            print(f"Report successfully saved to {filename}")
        except Exception as e:
            print(f"Error saving report: {e}")
            try:
                partial_report = {
                    "error": str(e),
                    "partial_data": report if 'report' in locals() else {},
                    "report_generated": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                }
                with open(filename.replace('.json', '_partial.json'), 'w') as f:
                    json.dump(partial_report, f, indent=4)
                print(f"Partial report saved to {filename.replace('.json', '_partial.json')}")
            except Exception as e2:
                print(f"Could not save partial report: {e2}") 