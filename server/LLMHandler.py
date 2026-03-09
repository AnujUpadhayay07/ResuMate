import os
from dotenv import load_dotenv
import google.generativeai as genai
import traceback

# Load .env
env_path = os.path.join(os.path.dirname(__file__), '.env')
#print("Looking for .env at:", env_path)
load_dotenv(dotenv_path=env_path)
#print(".env file exists:", os.path.exists(env_path))

# Load API Key
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY not found in .env file")
#print("Loaded API Key:", api_key)

# Configure the Gemini client
genai.configure(api_key=api_key)

# Use the Gemini 1.5 Flash model (free and fast)
try:
    model = genai.GenerativeModel(model_name="gemini-2.5-flash-lite")
except Exception as e:
    print("Error initializing Gemini Flash model:", e)
    traceback.print_exc()

# Function to create prompt
def create_prompt(resume_text, job_description_text,job_title,experience_level):
    prompt = f"""
    You are a highly professional, empathetic, and strategic career coach and resume expert. Your job is to conduct a detailed, *section-by-section resume analysis* for a candidate applying for the following role:

    - *Target Role*: {job_title}
    - *Experience Level*: {experience_level}

    They have shared:
    - *Resume Text*: See below
    - *Job Description*: See below

    Please generate a full, *motivational, constructive, and tailored* report to guide the user toward resume optimization.

    ---

    ### 🎯 Executive Summary
    - Provide a high-level summary of how aligned this resume is with the target role.
    - Mention the general tone, visual impression, and role-relevance.
    - End with a motivational 1-liner encouraging improvement.

    ---

    ### ✅ Resume Score
    - Provide a score out of 100 based on resume quality.
    - Use this format: Resume Score: XX/100 followed by a short comment (Excellent / Good / Needs Improvement / Poor).
    - Include a *Match Percentage* showing how well it aligns with the job description.

    ---

    ### 🔍 Key Strengths
    - List 5–7 specific and tailored resume strengths.
    - Focus on clarity, impact, measurable outcomes, formatting, and use of tools.

    ---

    ### ⚠ Areas for Improvement
    - List 5–7 detailed areas that need enhancement.
    - Make each one *actionable. Explain *why it matters and how to fix it.

    ---

    ### 👤 Professional Profile Review
    - Analyze the candidate's career narrative and current direction.
    - Is it aligned with their target job?
    - Suggest how to reword the profile if misaligned.

    ---

    ### 🧠 Skills Analysis
    - *Current Skills* (categorized: Technical, Soft, Domain-specific)
    - *Missing Skills* (based on job description and industry expectations)
    - *Skill Proficiency Assessment*: Discuss proficiency level using cues from the resume.

    ---

    ###  💼 Experience Analysis
    - Are experiences framed with action verbs and impact?
    - Are they relevant to the job role?
    - Suggest how to reframe irrelevant experience if needed.

    ---

    ### 🎓 Education & Certifications
    - Evaluate degrees, CGPA, certifications.
    - Suggest any missing courses that would be useful.
    - If applicable, highlight coursework alignment or suggest where it's missing.

    ---

    ### ⚙ ATS Optimization
    - *ATS Score: XX/100* (assess keyword match, layout, headings)
    - Suggest resume structure and keyword changes for ATS friendliness.

    ---

    ### 🧭 Role Alignment & Gap Analysis
    - How well does this resume align with the job description?
    - Give a *% match estimate* and explain the major skill gaps.
    - If the alignment is poor, show exactly what must be done.

    ---

    ### 🛠 Suggested Projects
    List 2–4 *beginner-to-intermediate level projects* the user can build based on missing skills:
    - Mention purpose, tools to use, and real-world relevance.

    ---

    ### 📚 Courses & Certifications
    List 5–7 curated courses (platforms like Coursera, freeCodeCamp, etc.) that match the user's goals.

    ---

    ### 🧭 Motivation Tip
    End with a short motivational paragraph tailored to the user’s profile — something human, constructive, and hopeful.

    ---

    ### Candidate Resume:
    {resume_text}

    ---

    ### Job Description:
    {job_description_text}
    """
  
    return prompt.strip()

# Function to analyze
def analyze_with_llm(resume_text, job_description_text,job_title,experience_level):
    prompt = create_prompt(resume_text, job_description_text,job_title,experience_level)
    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print("[LLM error]:", e)
        traceback.print_exc()
        return "Error occured while generating analysis"

# Uncomment below for testing
# result = analyze_with_llm("Ankita's resume...", "Job description here...")
# print(result)

# Optional: Print available models (for dev/debug)
# for m in genai.list_models():
#     print(m.name, "-", m.supported_generation_methods)