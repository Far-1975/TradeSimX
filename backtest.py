from datetime import datetime

def execute_trade(entry_price, exit_price,entry_time,exit_time):
    """Execute a trade and calculate the results"""
    profit_percentage = ((exit_price - entry_price) / entry_price) * 100
    return {
        'entry_price': entry_price,
        'exit_price': exit_price,
        # 'stop_loss': stop_loss,
        # 'take_profit': take_profit,
        'profit_percentage': profit_percentage,

        'entry_time': entry_time,
        'exit_time': exit_time
    }

    

def backtest_strategy(coin_object, current_data, strategy, verbose=False):
    current_price = current_data['close']
    close_time = current_data['close time']
    
    # Check exit conditions if in position
    if coin_object.position and coin_object.curr_coin == coin_object.name:
        if strategy.check_exit(current_data, coin_object.entry_price):
            trade_result = execute_trade(
                entry_price=coin_object.entry_price,
                exit_price=current_price,
                entry_time=coin_object.entry_time,
                exit_time= close_time
                # stop_loss=coin_object.stop_loss,
                # take_profit=coin_object.take_profit
            )
            # print(current_data['sma_20'], trade_result['profit_percentage'])
            coin_object.exit_trade(trade_result, trade_result['profit_percentage'])
            strategy.reset_risk_manager()
            
    # Check entry conditions if not in position
    if not coin_object.position:
        if strategy.check_entry(current_data):
            coin_object.enter_trade(current_price,close_time)

    
    
