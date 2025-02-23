import os
import pandas as pd

# from utils import fetch_price_history_by_interval, transform_data, add_technical_indicators
# from backtest import backtest_strategy
# import time
# from datetime import datetime
# import json
# from strategy import Strategy
# from report_generator import ReportGenerator


class Coin:
    usdt_balance = 1
    position = False
    curr_coin = "USDT"
    all_trades = []

    
    def __init__(self, name, pair, df, entry_price=0, entry_time=-1,  trades=[]):
        # Basic info
        self.name = name
        self.pair = pair
        self.df = df
        
        # Position info
        self.entry_price = entry_price
        self.entry_time = entry_time
        
        # Performance tracking
        self.trade_history = []

    @classmethod
    def reset(cls):
        cls.all_trades = []
        cls.curr_coin = "USDT"
        cls.usdt_balance = 1
        cls.position = False
        

        

    def enter_trade(self, entry_price, close_time_timestamp):
        self.__class__.position = True
        self.__class__.curr_coin = self.name

        self.entry_price = entry_price
        self.entry_time = close_time_timestamp
        


    def exit_trade(self, trade_result, profit_pct):
        self.__class__.position = False
        self.__class__.all_trades.append(trade_result)
        self.__class__.curr_coin = "USDT"
        self.__class__.usdt_balance += (self.usdt_balance * profit_pct/100)

        # self.trades.append(trade_result)

        self.entry_price = 0
        self.entry_time = -1

        self.update_trade_history(trade_result)
            

    def update_trade_history(self, trade):
        """Update trade history and check for blocking conditions"""
        self.trade_history.append(trade)

