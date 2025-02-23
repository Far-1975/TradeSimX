import requests
import time
import pandas as pd
import numpy as np

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
            "limit": 1000,  # Maximum per request
        }
        if end_time:
            params["endTime"] = end_time

        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        
        if not data:
            break  # No more data to fetch
        
        all_klines.extend(data)
        start_time = data[-1][6] + 1  # Start time for next request

        # Break if we've reached the end_time
        if end_time and start_time >= end_time:
            break

        time.sleep(0.1)  # Prevent hitting rate limits

    return all_klines

def calculate_technical_indicators(df):
    """Calculate various technical indicators for analysis"""
    # Volume indicators
    df['volume_ma'] = df['Volume'].rolling(window=20).mean()
    df['volume_ratio'] = df['Volume'] / df['volume_ma']
    
    # Price moving averages
    df['sma_20'] = df['Close'].rolling(window=20).mean()
    df['sma_50'] = df['Close'].rolling(window=50).mean()
    df['sma_200'] = df['Close'].rolling(window=200).mean()
    
    # Volatility (ATR)
    df['tr'] = np.maximum(
        df['High'] - df['Low'],
        np.maximum(
            abs(df['High'] - df['Close'].shift()),
            abs(df['Low'] - df['Close'].shift())
        )
    )
    df['atr'] = df['tr'].rolling(window=14).mean()
    
    # RSI
    delta = df['Close'].diff()
    gain = (delta.where(delta > 0, 0)).rolling(window=14).mean()
    loss = (-delta.where(delta < 0, 0)).rolling(window=14).mean()
    rs = gain / loss
    df['rsi'] = 100 - (100 / (1 + rs))
    
    # MACD
    exp1 = df['Close'].ewm(span=12, adjust=False).mean()
    exp2 = df['Close'].ewm(span=26, adjust=False).mean()
    df['macd'] = exp1 - exp2
    df['signal'] = df['macd'].ewm(span=9, adjust=False).mean()
    
    # Price momentum
    df['roc'] = ((df['Close'] - df['Close'].shift(10)) / df['Close'].shift(10)) * 100
    
    return df

def transform_data(prices, PAIR):
    print(f"Retrieved {len(prices)} candles.")
    
    # Convert to DataFrame for easier processing
    df = pd.DataFrame(prices, columns=[
        "Open time", "Open", "High", "Low", "Close", "Volume",
        "Close time", "Quote asset volume", "Number of trades",
        "Taker buy base asset volume", "Taker buy quote asset volume", "Ignore"
    ])
    
    # Convert numeric columns
    numeric_columns = ["Open", "High", "Low", "Close", "Volume", 
                      "Quote asset volume", "Number of trades",
                      "Taker buy base asset volume", "Taker buy quote asset volume"]
    for col in numeric_columns:
        df[col] = pd.to_numeric(df[col], errors='coerce')
    
    # Convert timestamps
    df["Open time"] = pd.to_datetime(df["Open time"], unit="ms")
    df["Close time"] = pd.to_datetime(df["Close time"], unit="ms")
    
    # Calculate technical indicators
    df = calculate_technical_indicators(df)
    
    return df

def is_potential_explosion(df, i, threshold=50):
    """Check if a crypto is showing signs of potential explosive move"""
    if i < 200:  # Need enough data for indicators
        return False
        
    current = df.iloc[i]
    prev = df.iloc[i-1]
    
    # Volume analysis
    volume_surge = current['volume_ratio'] > 1.5  # Reduced from 2.0
    
    # Price action (simplified)
    price_above_mas = (current['Close'] > current['sma_20'] and 
                      current['sma_20'] > current['sma_50'])  # Removed 200 SMA requirement
    
    # Momentum
    strong_momentum = current['roc'] > 3  # Reduced from 5
    
    # RSI not extremely overbought
    rsi_healthy = current['rsi'] < 75  # Increased from 70
    
    # MACD momentum (simplified)
    macd_momentum = current['macd'] > current['signal']
    
    # Volatility increasing (optional)
    volatility_increasing = current['atr'] > df['atr'].rolling(window=10).mean().iloc[i]  # Shorter window
    
    # Need fewer conditions to trigger
    return (volume_surge and price_above_mas and 
            ((strong_momentum and rsi_healthy) or (macd_momentum and volatility_increasing)))