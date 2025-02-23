import pandas as pd
import requests
import time

def calculate_sma(data, period):
    return data.rolling(window=period).mean()

def calculate_tr(data):
    high = data['high']
    low = data['low']
    close = data['close'].shift(1)
    
    tr1 = high - low
    tr2 = abs(high - close)
    tr3 = abs(low - close)
    
    tr = pd.DataFrame([tr1, tr2, tr3]).max()
    return tr

def calculate_atr(data, period=14):
    tr = calculate_tr(data)
    return tr.rolling(window=period).mean()

def calculate_rsi(data, period=14):
    delta = data.diff()
    gain = (delta.where(delta > 0, 0)).rolling(window=period).mean()
    loss = (-delta.where(delta < 0, 0)).rolling(window=period).mean()
    rs = gain / loss
    return 100 - (100 / (1 + rs))

def calculate_macd(data, fast=12, slow=26, signal=9):
    exp1 = data.ewm(span=fast, adjust=False).mean()
    exp2 = data.ewm(span=slow, adjust=False).mean()
    macd = exp1 - exp2
    signal_line = macd.ewm(span=signal, adjust=False).mean()
    return macd, signal_line

def calculate_roc(data, period=10):
    return ((data - data.shift(period)) / data.shift(period)) * 100

def calculate_candle_return(data):
    return (data['close'] - data['open']) / data['open'] * 100




def transform_data(prices, PAIR):
    print(f"Retrieved {len(prices)} candles.")
    
    df = pd.DataFrame(prices, columns=[
        "open time", "open", "high", "low", "close", "volume",
        "close time", "quote asset volume", "number of trades",
        "taker buy base asset volume", "taker buy quote asset volume", "ignore"
    ])
    
    # Convert numeric columns
    numeric_columns = ["open", "high", "low", "close", "volume", 
                      "quote asset volume", "number of trades",
                      "taker buy base asset volume", "taker buy quote asset volume"]
    for col in numeric_columns:
        df[col] = pd.to_numeric(df[col], errors='coerce')
    
    # Convert timestamps
    df["open time"] = pd.to_datetime(df["open time"], unit="ms")
    df["close time"] = pd.to_datetime(df["close time"], unit="ms")
    

    
    return df


def fetch_price_history_by_limit(symbol, BASE_URL, interval="1m", limit=180):
    """Fetch historical price data for a given symbol."""
    endpoint = f"{BASE_URL}/api/v3/klines"
    params = {
        "symbol": symbol,
        "interval": interval,
        "limit": limit
    }
    response = requests.get(endpoint, params=params)
    response.raise_for_status()
    return response.json()

def fetch_price_history_by_interval(symbol, interval, start_time, end_time=None):
    """Fetch large historical data using pagination."""
    url = "https://api.binance.com/api/v3/klines"
    all_klines = []

    while True:
        params = {
            "symbol": symbol,
            "interval": interval,
            "startTime": start_time,
            "limit": 1000,
        }
        if end_time:
            params["endTime"] = end_time

        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        
        if not data:
            break  
        
        all_klines.extend(data)
        start_time = data[-1][6] + 1  

        # Break if we've reached the end_time
        if end_time and start_time >= end_time:
            break

        time.sleep(0.1)

    return all_klines



def add_technical_indicators(df, custom_indicators=None):

    calculator = IndicatorCalculator()
    return calculator.add_indicators(df, custom_indicators)


# def calculate_technical_indicators(df):
#     all_indicators = [
#         'sma_20', 'sma_50', 'sma_200',
#         'volume_sma_5', 'volume_ma_20', 'volume_sma_50',
#         'tr', 'atr', 'rsi', 'macd', 'signal',
#         'roc', 'candle_return'
#     ]
    
#     return add_technical_indicators(df, all_indicators) 

class IndicatorCalculator:
    def __init__(self):
        self.base_indicators = {
            'sma_20': lambda x: calculate_sma(x['close'], 20),
            'sma_50': lambda x: calculate_sma(x['close'], 50),
            'sma_200': lambda x: calculate_sma(x['close'], 200),
            'volume_sma_5': lambda x: calculate_sma(x['volume'], 5),
            'volume_ma_20': lambda x: calculate_sma(x['volume'], 20),
            'volume_sma_50': lambda x: calculate_sma(x['volume'], 50),
            'tr': calculate_tr,
            'atr': lambda x: calculate_atr(x, 14),
            'rsi': lambda x: calculate_rsi(x['close'], 14),
            'candle_return': calculate_candle_return
        }
        
        self.available_columns = [
            'open', 'high', 'low', 'close', 'volume',
            *self.base_indicators.keys()
        ]
        
    def calculate_custom_indicator(self, df, indicator_def):
        """
        {
            "name": "indicator_name",
            "op1": "metric1",
            "oper": "+|-|*|/",
            "op2": "metric2"
        }
        """
        try:
            # Validate operands
            if indicator_def['op1'] not in self.available_columns:
                raise ValueError(f"Invalid operand 1: {indicator_def['op1']}. Must be one of {self.available_columns}")
            if indicator_def['op2'] not in self.available_columns:
                raise ValueError(f"Invalid operand 2: {indicator_def['op2']}. Must be one of {self.available_columns}")
                
            op1_values = df[indicator_def['op1']]
            op2_values = df[indicator_def['op2']]
            
            if indicator_def['oper'] == '+':
                result = op1_values + op2_values
            elif indicator_def['oper'] == '-':
                result = op1_values - op2_values
            elif indicator_def['oper'] == '*':
                result = op1_values * op2_values
            elif indicator_def['oper'] == '/':
                result = op1_values / op2_values
            else:
                raise ValueError(f"Invalid operator: {indicator_def['oper']}. Must be one of +,-,*,/")
                
            return result
            
        except Exception as e:
            print(f"Error calculating custom indicator {indicator_def['name']}: {e}")
            return None

    def add_indicators(self, df, custom_indicators=None):
        """Add both built-in and custom indicators to dataframe"""
        # First calculate all built-in indicators
        for name, func in self.base_indicators.items():
            try:
                df[name] = func(df)
            except Exception as e:
                print(f"Error calculating built-in indicator {name}: {e}")
                df[name] = None
                
        # Then calculate custom indicators if any
        if custom_indicators:
            for indicator in custom_indicators:
                try:
                    # print(indicator)
                    result = self.calculate_custom_indicator(df, indicator)
                    # print(result)
                    if result is not None:
                        df[indicator['name']] = result
                        self.available_columns.append(indicator['name'])
                except Exception as e:
                    print(f"Error adding custom indicator {indicator['name']}: {e}")
                    
        return df