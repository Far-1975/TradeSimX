import os
import sys
from datetime import datetime
from dotenv import load_dotenv

# Add the parent directory to system path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.agenticAI.insights import get_and_save_insights

def get_latest_report():
    """Get the most recent report details"""
    reports_dir = os.path.join(os.path.dirname(__file__), 'reports')
    if not os.path.exists(reports_dir):
        return None
        
    # Get all HTML reports
    reports = [f for f in os.listdir(reports_dir) if f.endswith('.html')]
    if not reports:
        return None
        
    # Get the most recent report
    latest_report = max(reports, key=lambda x: os.path.getctime(os.path.join(reports_dir, x)))
    report_id = latest_report.split('report_')[-1].replace('.html', '')
    report_path = os.path.join(reports_dir, latest_report)
    
    created_time = datetime.fromtimestamp(
        os.path.getctime(report_path)
    ).strftime('%Y-%m-%d %H:%M:%S')
    
    return {
        'id': report_id,
        'path': report_path,
        'created': created_time,
        'urls': {
            'view': f'http://localhost:5000/report/{report_id}',
            'download_html': f'http://localhost:5000/report/{report_id}?format=html&download=true',
            'download_pdf': f'http://localhost:5000/report/{report_id}?format=pdf'
        }
    }

def test_report_generation():
    """Test report generation with sample data"""
    # Load environment variables
    load_dotenv()
    
    # Verify Groq API key
    if not os.getenv('GROQ_API_KEY'):
        print("Error: GROQ_API_KEY not found in environment variables")
        return
    
    # Test data
    backtest_data = {
        "symbol": "BTCUSD",
        "strategy_used": "moving_average_crossover",
        "win_rate": 35,
        "risk_reward_ratio": 1.5,
        "take_profit": 50000,
        "stop_loss": 30000,
        "profit": 1000,
        "total_trades": 150,
        "max_drawdown": 12.5,
        "avg_position_size": 0.1
    }
    
    print("\n1. Generating new report using Groq/Llama2...")
    result = get_and_save_insights(backtest_data)
    
    if result:
        print("\nReport generated successfully!")
        print(f"Insights saved to: {result['insights_file']}")
        
        # Get latest report details
        report = get_latest_report()
        if report:
            print("\nReport Details:")
            print("="*50)
            print(f"Generated on: {report['created']}")
            print(f"\nTo view or download the report:")
            print(f"1. Start the Flask server in another terminal:")
            print(f"   cd project-root/backend")
            print(f"   python app.py")
            print(f"\n2. Then use these URLs:")
            print(f"   View in browser: {report['urls']['view']}")
            print(f"   Download HTML: {report['urls']['download_html']}")
            print(f"   Download PDF: {report['urls']['download_pdf']}")
            print("\nOr view the file directly at:")
            print(f"{report['path']}")
            print("="*50)
        else:
            print("No report found")
    else:
        print("Failed to generate report")

if __name__ == "__main__":
    test_report_generation() 