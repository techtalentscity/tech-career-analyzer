import os
import pandas as pd
import json
import streamlit as st
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import anthropic
from anthropic import Anthropic
import time

# Set page config
st.set_page_config(
    page_title="Tech Career Path Analyzer",
    page_icon="📊",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Initialize the Claude API client
@st.cache_resource
def get_anthropic_client():
    api_key = os.environ.get("ANTHROPIC_API_KEY") or st.secrets.get("ANTHROPIC_API_KEY")
    if not api_key:
        st.error("ANTHROPIC_API_KEY not found. Please set it as an environment variable or in Streamlit secrets.")
        st.stop()
    return Anthropic(api_key=api_key)

client = get_anthropic_client()

# Cache the analysis to avoid re-running the API call
@st.cache_data
def analyze_career_data(_client, csv_data):
    """
    Analyze career test responses using Claude API
    """
    # Convert the dataframe to JSON for Claude
    data_summary = csv_data.to_json(orient='records')
    
    prompt = f"""
    You are a tech career analytics expert. Please analyze these career test responses and provide detailed career path recommendations for each candidate.
    
    For each candidate, identify:
    1. Top 3 recommended tech career paths with percentage match scores
    2. Skills assessment (technical aptitude, creativity, problem solving, team collaboration, independent work, learning speed, experience level) on a scale of 1-5
    3. Key strengths (top 5)
    4. Development areas (top 5)
    5. Career readiness assessment (current level, required level, and gap for: technical skills, portfolio projects, industry knowledge, certifications, networking)
    6. Personalized career recommendation and next steps
    
    The data is in JSON format:
    {data_summary}
    
    Return your analysis as a JSON object with this structure:
    {{
      "candidate_name": {{
        "name": "Candidate Name",
        "email": "email@example.com",
        "careerScores": [
          {{ "career": "Career Path Name", "score": 8 }},
          {{ "career": "Another Career", "score": 7 }}
        ],
        "careerFit": [
          {{ "name": "Career Path Name", "value": 60 }},
          {{ "name": "Another Career", "value": 30 }},
          {{ "name": "Third Career", "value": 10 }}
        ],
        "skillAssessment": [
          {{ "skill": "Technical Aptitude", "value": 4 }},
          {{ "skill": "Creativity", "value": 3 }}
        ],
        "strengths": [
          {{ "name": "Problem Solving", "value": 5 }},
          {{ "name": "Learning Speed", "value": 4 }}
        ],
        "development": [
          {{ "area": "Portfolio Development", "score": 2 }},
          {{ "area": "Technical Skills", "score": 3 }}
        ],
        "careerReadiness": [
          {{ "category": "Technical Skills", "current": 3, "required": 4, "gap": 1 }},
          {{ "category": "Portfolio Projects", "current": 2, "required": 4, "gap": 2 }}
        ],
        "topCareer": "Software Development / Data Analysis / UI/UX Design",
        "experience": "Beginner (just exploring)",
        "techTools": "GitHub, Python",
        "seekingRole": "Internship/Junior position",
        "quote": "Personal statement from the candidate",
        "recommendation": "Personalized career recommendation"
      }}
    }}
    
    Ensure all values and scoring are based on the candidate's responses, especially their interests, experience, and strengths.
    """
    
    # Show a progress message
    with st.spinner("Analyzing career data with Claude..."):
        start_time = time.time()
        response = client.messages.create(
            model="claude-3-opus-20240229",
            max_tokens=4000,
            temperature=0.1,
            system="You are a career analytics expert who specializes in analyzing tech career test responses. You return data in JSON format only, with no explanation text.",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        elapsed_time = time.time() - start_time
        
        # Extract the JSON data from Claude's response
        try:
            content = response.content[0].text
            # Clean up the text in case it contains extra markdown
            if "```json" in content:
                content = content.split("```json")[1].split("```")[0].strip()
            elif "```" in content:
                content = content.split("```")[1].strip()
            
            # Parse the JSON
            career_analyses = json.loads(content)
            st.success(f"Analysis completed in {elapsed_time:.2f} seconds")
            return career_analyses
        except (json.JSONDecodeError, KeyError) as e:
            st.error(f"Error parsing JSON: {e}")
            st.code(content, language="json")
            st.stop()

def main():
    st.title("Tech Career Path Analyzer")
    st.subheader("Upload CSV with career test responses to generate tech career path recommendations")
    
    # File uploader
    uploaded_file = st.file_uploader("Choose a CSV or Excel file", type=["csv", "xlsx"])
    
    if uploaded_file is not None:
        # Read the file
        try:
            if uploaded_file.name.endswith('.csv'):
                df = pd.read_csv(uploaded_file)
            else:
                df = pd.read_excel(uploaded_file)
                
            # Show data preview
            with st.expander("Preview Data"):
                st.dataframe(df)
            
            # Analyze the data
            career_analyses = analyze_career_data(client, df)
            
            # Create tabs for each candidate
            candidates = list(career_analyses.keys())
            
            # Sidebar for candidate selection
            st.sidebar.header("Select Candidate")
            selected_candidate = st.sidebar.selectbox("Choose a candidate to view their analysis", candidates)
            
            # Get the selected candidate's data
            candidate_data = career_analyses[selected_candidate]
            
            # Main content
            display_candidate_dashboard(candidate_data)
            
        except Exception as e:
            st.error(f"Error processing file: {e}")
    else:
        # Show sample dashboard
        st.info("Upload a CSV file to get started. File should contain career test responses from candidates.")
        
        # Show column recommendations
        with st.expander("Recommended CSV columns"):
            st.markdown("""
            The CSV file should include columns similar to:
            - Full Name / Name
            - Email Address / Email
            - What do you like doing best? / Interests
            - How do you prefer to work?
            - What tech areas are you interested in?
            - What tech-related activities have you enjoyed?
            - What is your experience level?
            - What certifications do you have?
            - What tools/platforms have you used?
            
            But don't worry if your columns are named differently - Claude is flexible and can adapt!
            """)

def display_candidate_dashboard(candidate_data):
    """Display the dashboard for a specific candidate"""
    
    st.header(f"Career Analysis: {candidate_data['name']}")
    
    # Top section with profile card
    col1, col2 = st.columns([2, 1])
    
    with col1:
        # Profile info
        st.subheader("Profile Overview")
        st.markdown(f"""
        **Name:** {candidate_data['name']}  
        **Email:** {candidate_data['email']}  
        **Experience:** {candidate_data['experience']}  
        **Tech Tools:** {candidate_data['techTools']}  
        **Target Role:** {candidate_data['seekingRole']}
        """)
        
    with col2:
        # Top career match
        st.metric(label="Top Career Match", value=candidate_data['careerScores'][0]['career'])
        
    # Personal statement
    st.info(f"💭 **Personal Statement:** _{candidate_data['quote']}_")
    
    # Main dashboard with 3 columns
    col1, col2, col3 = st.columns([1, 1, 1])
    
    with col1:
        # Career fit pie chart
        st.subheader("Career Path Fit")
        fig = px.pie(
            candidate_data['careerFit'], 
            values='value', 
            names='name',
            hole=0.4,
            color_discrete_sequence=px.colors.qualitative.Set3
        )
        fig.update_layout(height=400)
        st.plotly_chart(fig, use_container_width=True)
        
    with col2:
        # Skills radar chart
        st.subheader("Skills Assessment")
        skills_df = pd.DataFrame(candidate_data['skillAssessment'])
        
        fig = px.line_polar(
            skills_df, 
            r='value', 
            theta='skill', 
            line_close=True,
            range_r=[0, 5],
            color_discrete_sequence=['#1f77b4']
        )
        fig.update_layout(height=400)
        st.plotly_chart(fig, use_container_width=True)
        
    with col3:
        # Career scores bar chart
        st.subheader("Career Compatibility Scores")
        top_careers = candidate_data['careerScores'][:5]  # Top 5 careers
        
        fig = px.bar(
            top_careers,
            x='score',
            y='career',
            orientation='h',
            color_discrete_sequence=['#636EFA']
        )
        fig.update_layout(height=400)
        st.plotly_chart(fig, use_container_width=True)
    
    # Second row with 2 columns
    col1, col2 = st.columns([1, 1])
    
    with col1:
        # Strengths
        st.subheader("Key Strengths")
        strengths_df = pd.DataFrame(candidate_data['strengths'])
        
        fig = px.bar(
            strengths_df,
            x='value',
            y='name',
            orientation='h',
            color_discrete_sequence=['#00CC96']
        )
        fig.update_layout(height=350)
        st.plotly_chart(fig, use_container_width=True)
        
    with col2:
        # Development areas
        st.subheader("Development Areas")
        dev_df = pd.DataFrame(candidate_data['development'])
        
        fig = px.bar(
            dev_df,
            x='score',
            y='area',
            orientation='h',
            color_discrete_sequence=['#FFA15A']
        )
        fig.update_layout(height=350)
        st.plotly_chart(fig, use_container_width=True)
    
    # Career readiness
    st.subheader("Career Readiness Assessment")
    readiness_df = pd.DataFrame(candidate_data['careerReadiness'])
    
    fig = go.Figure()
    
    fig.add_trace(go.Bar(
        x=readiness_df['category'],
        y=readiness_df['current'],
        name='Current Level',
        marker_color='#636EFA'
    ))
    
    fig.add_trace(go.Bar(
        x=readiness_df['category'],
        y=readiness_df['gap'],
        name='Gap to Required',
        marker_color='rgba(246, 78, 139, 0.3)',
        base=readiness_df['current']
    ))
    
    fig.add_trace(go.Scatter(
        x=readiness_df['category'],
        y=readiness_df['required'],
        mode='markers',
        name='Required Level',
        marker=dict(
            color='rgba(246, 78, 139, 1)',
            size=12,
            symbol='diamond'
        )
    ))
    
    fig.update_layout(
        barmode='stack',
        height=400,
        yaxis=dict(
            title='Skill Level (0-5)',
            range=[0, 5.5]
        )
    )
    
    st.plotly_chart(fig, use_container_width=True)
    
    # Recommendation section
    st.subheader("Career Recommendation")
    st.write(candidate_data['recommendation'])
    
    # Next steps
    st.subheader("Suggested Next Steps")
    
    top_career = candidate_data['careerScores'][0]['career']
    
    if "Software Development" in top_career:
        next_steps = [
            "Complete a full-stack development course that includes both front-end and data visualization",
            "Build a personal project that showcases coding skills with an interactive UI",
            "Join tech communities focused on software development",
            "Create a portfolio website showcasing your projects"
        ]
    elif "Data Science" in top_career or "Analysis" in top_career:
        next_steps = [
            "Take courses in data science fundamentals, statistics, and Python/R",
            "Work on data analysis projects using real-world datasets",
            "Learn visualization tools like Tableau or Power BI",
            "Join data science competitions on platforms like Kaggle"
        ]
    elif "UI/UX Design" in top_career:
        next_steps = [
            "Create a comprehensive UI/UX portfolio showcasing versatile design skills",
            "Join design communities for mentorship and feedback on work",
            "Practice technical aspects of design through guided courses",
            "Learn user research methodologies to strengthen UX skills"
        ]
    elif "Cybersecurity" in top_career:
        next_steps = [
            "Pursue security certifications like CompTIA Security+",
            "Create cybersecurity demonstration projects",
            "Participate in security CTF (Capture The Flag) competitions",
            "Build knowledge of security tools and vulnerability assessment"
        ]
    else:
        next_steps = [
            f"Develop skills specific to {top_career}",
            "Create a portfolio of relevant projects",
            "Connect with professionals in this field through LinkedIn and professional groups",
            "Stay updated with industry trends and best practices"
        ]
    
    for step in next_steps:
        st.markdown(f"- {step}")
    
    # Resources section
    with st.expander("Career Resources"):
        st.markdown(f"""
        ## Resources for {top_career}
        
        ### Learning Platforms
        - **Coursera**: Offers courses from top universities and companies
        - **Udemy**: Affordable courses on technical skills
        - **LinkedIn Learning**: Business and technical courses with LinkedIn integration
        - **freeCodeCamp**: Free coding challenges and certifications
        
        ### Communities
        - **Stack Overflow**: For technical questions and answers
        - **GitHub**: For collaborating on code and showcasing projects
        - **Reddit**: Subreddits specific to your area of interest
        - **Discord Communities**: For real-time discussions with peers
        
        ### Tools and Practice
        - **GitHub**: Version control and project portfolio
        - **Leetcode/HackerRank**: For coding practice
        - **Kaggle**: For data science projects
        - **Figma/Adobe XD**: For UI/UX design
        """)
    
    # Export options
    st.subheader("Export Options")
    col1, col2 = st.columns([1, 1])
    
    with col1:
        if st.button("Export as PDF"):
            st.warning("PDF export feature coming soon!")
    
    with col2:
        json_data = json.dumps(candidate_data, indent=2)
        st.download_button(
            label="Download JSON Data",
            data=json_data,
            file_name=f"{candidate_data['name'].replace(' ', '_')}_career_analysis.json",
            mime="application/json"
        )

if __name__ == "__main__":
    main()
