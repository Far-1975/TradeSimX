import os
import json
from datetime import datetime, timedelta
import uuid
from jinja2 import Template
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch

class ReportBuilder:
    @staticmethod
    def get_reports_dir():
        """Get absolute path to reports directory"""
        # Go up one level from the current file's directory to backend folder
        backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        return os.path.join(backend_dir, 'reports')

    def __init__(self, insights_data):
        self.insights_data = insights_data
        self.report_id = str(uuid.uuid4())
        self.timestamp = datetime.now()
        
    def generate_html_report(self):
        """Generate HTML report from insights data"""
        strategy_data = self.insights_data["strategy_data"]
        insights = self.insights_data["insights"]
        
        html = """
        <!DOCTYPE html>
        <html>
        <head>
            <title>Trading Strategy Analysis Report</title>
            <style>
                :root {
                    --primary-color: #2196F3;
                    --secondary-color: #f5f5f5;
                    --text-color: #333;
                    --border-color: #ddd;
                }
                
                body { 
                    font-family: 'Segoe UI', Arial, sans-serif; 
                    margin: 0;
                    padding: 40px;
                    line-height: 1.6;
                    color: var(--text-color);
                    background-color: #f9f9f9;
                }
                
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                }
                
                .header { 
                    background: white;
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    margin-bottom: 30px;
                    text-align: center;
                }
                
                .header h1 {
                    color: var(--primary-color);
                    margin: 0;
                    font-size: 2.5em;
                }
                
                .timestamp { 
                    color: #666;
                    font-size: 0.9em;
                    margin-top: 10px;
                }
                
                .section {
                    background: white;
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    margin-bottom: 30px;
                }
                
                .section h2 {
                    color: var(--primary-color);
                    margin-top: 0;
                    padding-bottom: 15px;
                    border-bottom: 2px solid var(--secondary-color);
                }
                
                .metrics { 
                    display: grid; 
                    grid-template-columns: repeat(2, 1fr); 
                    gap: 20px; 
                    margin: 20px 0;
                }
                
                .metric-card { 
                    background: white;
                    padding: 25px;
                    border-radius: 10px;
                    border: 1px solid var(--border-color);
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                
                .metric-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                }
                
                .metric-card h3 {
                    color: var(--primary-color);
                    margin-top: 0;
                    font-size: 1.3em;
                    border-bottom: 2px solid var(--secondary-color);
                    padding-bottom: 10px;
                }
                
                .metric-value {
                    font-size: 1.1em;
                    margin: 10px 0;
                    padding: 8px;
                    background: var(--secondary-color);
                    border-radius: 5px;
                }
                
                .metric-value strong {
                    color: var(--primary-color);
                }
                
                .insights { 
                    margin: 20px 0;
                }
                
                .insight-item { 
                    margin: 15px 0;
                    padding: 20px;
                    background: white;
                    border-left: 4px solid #2196F3;
                    border-radius: 5px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                }
                
                .insight-item strong {
                    color: #2196F3;
                    font-size: 1.1em;
                    display: block;
                    margin-bottom: 10px;
                }

                .insight-content {
                    display: block;
                    padding-left: 15px;
                    color: #333;
                    line-height: 1.6;
                }
                
                @media print {
                    body { 
                        background: white;
                        padding: 20px;
                    }
                    .metric-card, .insight-item {
                        break-inside: avoid;
                    }
                    .metric-card:hover, .insight-item:hover {
                        transform: none;
                        box-shadow: none;
                    }
                }
            </style>
        </head>
        <body>
        """ + f"""
            <div class="container">
                <div class="header">
                    <h1>Trading Strategy Analysis Report</h1>
                    <p class="timestamp">Generated on: {self.timestamp.strftime('%Y-%m-%d %H:%M:%S')}</p>
                </div>

                <div class="section">
                    <h2>Strategy Details</h2>
                    <div class="metrics">
                        <div class="metric-card">
                            <h3>Basic Information</h3>
                            <div class="metric-value">
                                <strong>Symbol:</strong> {strategy_data['symbol']}
                            </div>
                            <div class="metric-value">
                                <strong>Total Trades:</strong> {strategy_data['total_trades']}
                            </div>
                            <div class="metric-value">
                                <strong>Win Rate:</strong> {strategy_data['win_rate']}%
                            </div>
                        </div>
                        <div class="metric-card">
                            <h3>Performance Metrics</h3>
                            <div class="metric-value">
                                <strong>Average Profit:</strong> {strategy_data['average_profit']}%
                            </div>
                            <div class="metric-value">
                                <strong>Average Loss:</strong> {strategy_data['average_loss']}%
                            </div>
                            <div class="metric-value">
                                <strong>Risk/Reward:</strong> {strategy_data['risk_reward_ratio']:.2f}
                            </div>
                        </div>
                        <div class="metric-card">
                            <h3>Trade Distribution</h3>
                            <div class="metric-value">
                                <strong>Winning Trades:</strong> {strategy_data['winning_trades']}
                            </div>
                            <div class="metric-value">
                                <strong>Losing Trades:</strong> {strategy_data['losing_trades']}
                            </div>
                            <div class="metric-value">
                                <strong>Max Drawdown:</strong> {strategy_data['max_drawdown']:.2f}%
                            </div>
                        </div>
                        <div class="metric-card">
                            <h3>Results</h3>
                            <div class="metric-value">
                                <strong>Total Return:</strong> {strategy_data['profit']}%
                            </div>
                        </div>
                    </div>
                </div>

                <div class="section">
                    <h2>Analysis Insights</h2>
                    <div class="insights">
                        {self._format_insights(insights)}
                    </div>
                </div>
            </div>
        </body>
        </html>
        """
        return html
    
    def _format_insights(self, insights):
        """Format insights into HTML with bold categories"""
        formatted_insights = []
        for insight in insights:
            if ": " in insight:
                category, content = insight.split(": ", 1)
                formatted_insight = f'''
                <div class="insight-item">
                    <strong>{category}</strong>
                    <span class="insight-content">{content}</span>
                </div>'''
                formatted_insights.append(formatted_insight)
            else:
                # Handle insights without a category
                formatted_insight = f'''
                <div class="insight-item">
                    <span class="insight-content">{insight}</span>
                </div>'''
                formatted_insights.append(formatted_insight)
        return "\n".join(formatted_insights)

    def generate_pdf_report(self, filepath):
        """Generate PDF report using ReportLab"""
        try:
            doc = SimpleDocTemplate(
                filepath,
                pagesize=A4,
                rightMargin=40,
                leftMargin=40,
                topMargin=40,
                bottomMargin=40
            )

            # Get base styles
            styles = getSampleStyleSheet()
            
            # Define custom styles
            title_style = ParagraphStyle(
                'CustomTitle',
                parent=styles['Title'],
                fontSize=20,
                textColor=colors.HexColor('#2196F3'),
                spaceAfter=20,
                alignment=1,
                fontName='Helvetica-Bold'
            )
            
            section_style = ParagraphStyle(
                'SectionStyle',
                parent=styles['Heading2'],
                fontSize=14,
                textColor=colors.HexColor('#333333'),
                spaceBefore=15,
                spaceAfter=10,
                fontName='Helvetica-Bold'
            )
            
            normal_style = ParagraphStyle(
                'NormalStyle',
                parent=styles['Normal'],
                fontSize=10,
                textColor=colors.HexColor('#333333'),
                fontName='Helvetica'
            )

            # Build content
            story = []
            
            # Header
            story.append(Paragraph("Trading Strategy Analysis Report", title_style))
            story.append(Paragraph(
                f"Generated on: {self.timestamp.strftime('%Y-%m-%d %H:%M:%S')}", 
                normal_style
            ))
            story.append(Spacer(1, 20))

            strategy_data = self.insights_data["strategy_data"]

            # Strategy Details
            story.append(Paragraph("Strategy Details", section_style))
            
            # Basic Information
            basic_data = [
                ["Basic Information", ""],
                ["Symbol:", strategy_data['symbol']],
                ["Total Trades:", str(strategy_data['total_trades'])],
                ["Win Rate:", f"{strategy_data['win_rate']}%"]
            ]
            
            # Performance Metrics
            perf_data = [
                ["Performance Metrics", ""],
                ["Average Profit:", f"{strategy_data['average_profit']}%"],
                ["Average Loss:", f"{strategy_data['average_loss']}%"],
                ["Risk/Reward Ratio:", f"{strategy_data['risk_reward_ratio']:.2f}"]
            ]
            
            # Trade Distribution
            dist_data = [
                ["Trade Distribution", ""],
                ["Winning Trades:", str(strategy_data['winning_trades'])],
                ["Losing Trades:", str(strategy_data['losing_trades'])],
                ["Max Drawdown:", f"{strategy_data['max_drawdown']:.2f}%"]
            ]
            
            # Results
            results_data = [
                ["Results", ""],
                ["Total Return:", f"{strategy_data['profit']}%"]
            ]

            # Function to create metric tables
            def create_metric_table(data):
                table_style = TableStyle([
                    ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#f5f5f5')),
                    ('TEXTCOLOR', (0, 0), (-1, 0), colors.HexColor('#2196F3')),
                    ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
                    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                    ('FONTSIZE', (0, 0), (-1, 0), 12),
                    ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
                    ('BACKGROUND', (0, 1), (-1, -1), colors.white),
                    ('TEXTCOLOR', (0, 1), (-1, -1), colors.black),
                    ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
                    ('FONTSIZE', (0, 1), (-1, -1), 10),
                    ('GRID', (0, 0), (-1, -1), 1, colors.lightgrey),
                    ('PADDING', (0, 0), (-1, -1), 6),
                ])
                table = Table(data, colWidths=[2*inch, 3*inch])
                table.setStyle(table_style)
                return table

            # Add metric tables
            for data in [basic_data, perf_data, dist_data, results_data]:
                story.append(create_metric_table(data))
                story.append(Spacer(1, 15))

            # Analysis Insights
            story.append(Paragraph("Analysis Insights", section_style))
            story.append(Spacer(1, 10))

            # Format insights
            for insight in self.insights_data["insights"]:
                if ": " in insight:
                    category, content = insight.split(": ", 1)
                    story.append(Paragraph(
                        f"<b>{category}</b>",
                        ParagraphStyle(
                            'InsightCategory',
                            parent=normal_style,
                            textColor=colors.HexColor('#2196F3'),
                            fontSize=12,
                            spaceBefore=10,
                            spaceAfter=5
                        )
                    ))
                    story.append(Paragraph(
                        content,
                        ParagraphStyle(
                            'InsightContent',
                            parent=normal_style,
                            leftIndent=20,
                            spaceBefore=0,
                            spaceAfter=10
                        )
                    ))
                else:
                    story.append(Paragraph(insight, normal_style))
                    story.append(Spacer(1, 10))

            # Build the PDF
            doc.build(story)
            return True

        except Exception as e:
            print(f"Error generating PDF: {str(e)}")
            return False

    def save_report(self):
        """Save report in HTML, JSON, and PDF formats"""
        reports_dir = self.get_reports_dir()
        os.makedirs(reports_dir, exist_ok=True)

        # Save the raw data
        data_file = os.path.join(reports_dir, f"report_{self.report_id}.json")
        with open(data_file, 'w') as f:
            json.dump(self.insights_data, f, indent=4)

        # Generate and save HTML report
        html_content = self.generate_html_report()
        html_file = os.path.join(reports_dir, f"report_{self.report_id}.html")
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(html_content)

        # Generate and save PDF report
        pdf_file = os.path.join(reports_dir, f"report_{self.report_id}.pdf")
        self.generate_pdf_report(pdf_file)

        return self.report_id

class ReportManager:
    REPORT_EXPIRY = 24  # hours
    SUPPORTED_FORMATS = ['html', 'json', 'pdf']  # Added PDF to supported formats
    
    @staticmethod
    def get_report_path(report_id, format='html'):
        """Get report file path from report ID"""
        # Default to HTML if unsupported format is requested
        if format.lower() not in ReportManager.SUPPORTED_FORMATS:
            format = 'html'
            
        reports_dir = ReportBuilder.get_reports_dir()
        return os.path.join(reports_dir, f"report_{report_id}.{format}")
    
    @staticmethod
    def clean_old_reports():
        """Remove reports older than REPORT_EXPIRY hours"""
        reports_dir = ReportBuilder.get_reports_dir()
        if not os.path.exists(reports_dir):
            return
            
        current_time = datetime.now()
        for filename in os.listdir(reports_dir):
            filepath = os.path.join(reports_dir, filename)
            file_modified = datetime.fromtimestamp(os.path.getmtime(filepath))
            if current_time - file_modified > timedelta(hours=ReportManager.REPORT_EXPIRY):
                try:
                    os.remove(filepath)
                except Exception as e:
                    print(f"Error removing old report {filepath}: {str(e)}")
    
    @staticmethod
    def get_report_content(report_id, format='html'):
        """Get report content by ID and format"""
        try:
            # Default to HTML if unsupported format is requested
            if format.lower() not in ReportManager.SUPPORTED_FORMATS:
                format = 'html'
                
            filepath = ReportManager.get_report_path(report_id, format)
            if not os.path.exists(filepath):
                # Try HTML as fallback
                if format != 'html':
                    html_path = ReportManager.get_report_path(report_id, 'html')
                    if os.path.exists(html_path):
                        filepath = html_path
                        format = 'html'
                    else:
                        return None
                else:
                    return None
                
            with open(filepath, 'r', encoding='utf-8') as f:
                return f.read()
        except Exception as e:
            print(f"Error reading report: {str(e)}")
            return None
            
    @staticmethod
    def get_available_formats(report_id):
        """Get list of available formats for a given report ID"""
        available_formats = []
        for format in ReportManager.SUPPORTED_FORMATS:
            filepath = ReportManager.get_report_path(report_id, format)
            if os.path.exists(filepath):
                available_formats.append(format)
        return available_formats