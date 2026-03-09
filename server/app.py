from flask import Flask, request, jsonify
from flask_cors import CORS
import os
#import fitz  # PyMuPDF
from werkzeug.utils import secure_filename
from resume_parser import extract_resume_text
from jd_parser import clean_job_description
from LLMHandler import analyze_with_llm

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Upload folder setup
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024  

# Create uploads directory if it doesn't exist
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Allowed file extensions
ALLOWED_EXTENSIONS = {'pdf','docx'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Upload and analyze route
@app.route('/upload_resume', methods=['POST'])

def upload_resume():
    print("[INFO] : Recieved /upload_resume request")
    try:
        # Validate resume
        file = request.files.get('resume')
        if not file or file.filename == '':
            return jsonify({'error': 'No resume file uploaded'}), 400
        if not allowed_file(file.filename):
            return jsonify({'error': 'Only PDF  OR DOCX files are allowed'}), 400

        # Save resume
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        # Extract resume text
        resume_text = extract_resume_text(filepath)
        if os.path.exists(filepath):
            os.remove(filepath)
        if not resume_text:
            return jsonify({'error':'Failed to extract resume text'}),500

        # Get job description
        job_description = request.form.get('jobDescription', '').strip()

        if not job_description:
            return jsonify({'error': 'Job Description is required'}), 400
        cleaned_jd=clean_job_description(job_description)

        job_title = request.form.get('jobTitle','').strip()
        experience_level = request.form.get('experienceLevel','').strip()

        print("[INFO] : Job Title->",job_title)
        print("[INFO] : Experience Level ->", experience_level)

        llm_result = analyze_with_llm(resume_text,cleaned_jd,job_title,experience_level)
        


        # Return both results
        return jsonify({
            'resumeText': resume_text,
            'jobDescription': job_description,
            'jobTitle':job_title,
            'experienceLevel':experience_level,
            'llmAnalysis': llm_result
        })
    

    except Exception as e:
        print("[ERROR] Server Error:",e)
        return jsonify({'error': f'Unexpected server error: {str(e)}'}), 500

# Run server
if __name__ == '__main__':
    app.run(debug=True)