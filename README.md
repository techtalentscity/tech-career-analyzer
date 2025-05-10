# Tech Career Path Analyzer

An interactive dashboard for analyzing tech career test responses and generating personalized career path recommendations using the Claude API.

## Features

- Upload CSV or Excel files with career test responses
- AI-powered analysis using Anthropic's Claude API
- Interactive visualizations of career compatibility
- Personalized recommendations and next steps
- Multi-candidate support

## How to Use

1. Visit the deployed app: [Tech Career Analyzer](https://yourusername-tech-career-analyzer.streamlit.app)
2. Upload your CSV or Excel file with career test responses
3. View the interactive dashboard with analysis for each candidate
4. Export results as needed

## CSV Format

The system works with various CSV formats, but should include fields such as:
- Name
- Email
- Interests/what the candidate likes doing best
- Work preferences
- Tech areas of interest
- Experience level
- Tools/platforms used

## Local Development

To run this project locally:

1. Clone the repository
2. Install the requirements: `pip install -r requirements.txt`
3. Set your Anthropic API key: `export ANTHROPIC_API_KEY=your_key_here`
4. Run the app: `streamlit run app.py`
