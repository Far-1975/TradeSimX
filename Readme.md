# TradeWave - A No-Code Algorithmic Trading Backtesting Platform 
 A modern No-Code Trading Strategy Backtesting Platform that empowers traders to create Strategy, backtest, and optimize their trading strategies without writing a single line of code. 
 Powered by advanced AI analytics , ChatBot and real-time insights .


### Solution Demo Video Link

[Demo Video](https://www.youtube.com/watch?v=sSSDNEmsVww)
[![Alt text](https://img.youtube.com/vi/sSSDNEmsVww/0.jpg)](https://www.youtube.com/watch?v=sSSDNEmsVww)

## Features

### Strategy Builder
- **Entry/Exit Points**: Create complex trading conditions
  - Multiple indicators support
  - AND/OR logic combinations
  - Custom indicator creation
- **Risk Management**:
  - Stop-loss configuration
  - Take-profit settings

### Analytics Dashboard
- **Performance Metrics**:
  ```bash
  Monthly Returns: Track your strategy's monthly performance
  Win Rate: Analyze success ratio
  Risk/Reward: Evaluate risk-adjusted returns
  ```

- **Interactive Charts**:
  ```bash
  📈 Monthly Returns Chart
  📊 Win/Loss Ratio
  ⏱️ Trade Duration Analysis
  ```

- **AI Assistant**:
  ```bash
  🤖 Real-time strategy analysis
  💡 Performance insights
  🔄 Optimization suggestions
  📝 Custom recommendations
  ```

### Tech Stack
- **Frontend**: 
  - React.js
  - JavaScript
  - Tailwind Css
  - React-Chartjs-2
- **Backend**:
  - Python
  - flask
- **Database**:
  - MongoDB
- **GenAI**:
  - OPENAI
  - Langchain
    


## Getting Started

### Prerequisites
```bash
  node -v # v14.0.0 or higher
  npm -v # v6.0.0 or higher
  ```

### Installation
 **Clone the repository**
```bash
git clone https://github.com/UditJain2622004/backtest-platform.git
  ```
 **Navigate to frontend directory**
```bash
cd backtest-platform/Frontend
  ```
**Install dependencies**
```bash
npm install
  ```
**Start Frontend server**
```bash
npm run dev
  ```
The frontend will be available at `http://localhost:5173`

**For env file**
```bash
make a .env file in that file write
MONGODB_URI:<YOUR MONGODB URI>
JWT_SECRET:<MAKE SECRET KEY FOR JWT>
MODEL:gpt-4o-mini
OPEN_API_KEY:<YOUR OPENAPI KEY>
  ```

**For Start Backend**
```bash
cd ..
cd backtest-platform
pip install -r requirements.txt
  ```
**For Start Backend Server**
```bash
python backend/app.py
  ```
The backend API will be available at `http://localhost:5000`
## Configuration Steps

### 1. OpenAI API Setup

1. Go to [OpenAI API Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key and add it to your backend `.env` file as `OPENAI_API_KEY`

## Team member
- **Udit Jain** - [Udit Jain](https://github.com/UditJain2622004)
- **Ankush** - [Ankush Kumar](https://github.com/ankush270)
- **Ankur** - [Ankur](https://github.com/ankurpunia30)

## Team Name
- **The Big 3**



