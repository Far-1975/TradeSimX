class Condition:
    def __init__(self, lhs, operator, rhs):
        self.lhs = lhs 
        self.operator = operator 
        self.rhs = rhs 
        
    def evaluate(self, data):
        """Evaluate the condition against market data"""
        lhs_value = self._get_value(self.lhs, data)
        
        if self.rhs['type'] == 'indicator':
            rhs_value = self._get_value(self.rhs['indicator'], data)
        else:  # number_input
            rhs_value = self.rhs['value']
            # Handle percentage calculations if needed
            # if self.rhs.get('sign') == '%':
            #     rhs_value = lhs_value * (1 + rhs_value/100)
        
        # Evaluate condition
        if self.operator == '>':
            return lhs_value > rhs_value
        elif self.operator == '<':
            return lhs_value < rhs_value
        elif self.operator == '==':
            return lhs_value == rhs_value
        elif self.operator == '>=':
            return lhs_value >= rhs_value
        elif self.operator == '<=':
            return lhs_value <= rhs_value
        
    def _get_value(self, indicator, data):
        try:
            if indicator == 'close':
                return data['close']
            elif indicator == 'volume':
                return data['volume']
            else:
                return data[indicator]
        except KeyError:
            raise KeyError(f"Indicator '{indicator}' not found in data. Available indicators: {list(data.index)}")


class Strategy:
    def __init__(self, config):
        # Each entry_condition is a list of subconditions (ANDed together)
        # Multiple entry_conditions are ORed together
        self.entry_conditions = [
            [Condition(subcond['lhs'], subcond['operator'], subcond['rhs']) 
             for subcond in condition]
            for condition in config['entry_conditions']
        ]
        
        self.exit_conditions = [
            [Condition(subcond['lhs'], subcond['operator'], subcond['rhs'])
             for subcond in condition]
            for condition in config['exit_conditions']
        ]
        
        self.risk_manager = RiskManager(config.get('risk_management', {}))
        
    def check_entry(self, data):
        for condition_group in self.entry_conditions:
            # All subconditions in the group must be true
            if all(condition.evaluate(data) for condition in condition_group):
                return True
        return False
        
    def check_exit(self, data, entry_price):
        """Check both strategy exit conditions and risk management"""
        strategy_exit = any(
            all(condition.evaluate(data) for condition in condition_group)
            for condition_group in self.exit_conditions
        )
        
        #  risk management conditions
        risk_exit = self.risk_manager.check_exit_conditions(
            data['close'], 
            entry_price
        )
        if strategy_exit:
            print("Strategy exit condition met")
        if risk_exit:
            print("Risk management exit condition met")
        return strategy_exit or risk_exit
        
    def reset_risk_manager(self):
        """Reset risk manager for new trade"""
        self.risk_manager.reset()

class RiskManager:
    def __init__(self, config):
        self.stop_loss = config.get('stop_loss', None)
        self.take_profit = config.get('take_profit', None)
        self.trailing_stop = config.get('trailing_stop_loss', None)
        self.trailing_take_profit = config.get('trailing_take_profit', None)
        
        self.highest_price = None
        self.lowest_price = None
        
    def initialize_trade(self, entry_price):
        """Initialize tracking variables when trade starts"""
        self.highest_price = entry_price
        self.lowest_price = entry_price
        
    def check_exit_conditions(self, current_price, entry_price):
        """Check all risk management exit conditions"""
        if not entry_price:
            return False
            
        if self.highest_price is None:
            self.initialize_trade(entry_price)
            
        profit_pct = ((current_price - entry_price) / entry_price) * 100
        
        # Update tracking prices
        self.highest_price = max(self.highest_price, current_price)
        self.lowest_price = min(self.lowest_price, current_price)
        
        if self.stop_loss:
            stop_price = entry_price * (1 - self.stop_loss['value']/100)
            if current_price <= stop_price:
                return True
                
        if self.take_profit:
            take_profit_price = entry_price * (1 + self.take_profit['value']/100)
            if current_price >= take_profit_price:
                return True
                
        if self.trailing_stop:
            activation_pct = self.trailing_stop['activation']['value']
            callback_pct = self.trailing_stop['callback']['value']
            
            # Only activate trailing stop if we're in sufficient profit
            if profit_pct >= activation_pct:
                print("Trailing stop activated")
                trailing_stop_price = self.highest_price * (1 - callback_pct/100)
                if current_price <= trailing_stop_price:
                    return True
                    
        if self.trailing_take_profit:
            activation_pct = self.trailing_take_profit['activation']['value']
            callback_pct = self.trailing_take_profit['callback']['value']
            
            if profit_pct >= activation_pct:
                print("Trailing take profit activated")
                #   track how far price has fallen from peak
                drawdown_from_peak = ((self.highest_price - current_price) / self.highest_price) * 100
                if drawdown_from_peak >= callback_pct:
                    return True
                    
        return False
        
    def reset(self):
        """Reset tracking variables for new trade"""
        self.highest_price = None
        self.lowest_price = None 
