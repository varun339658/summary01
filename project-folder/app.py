from flask import Flask, request, jsonify, render_template
from flask_cors import CORS  # Import CORS

app = Flask(__name__, static_folder="static", template_folder="templates")
CORS(app)  # Enable CORS after initializing Flask

# Course recommendations
COURSE_RECOMMENDATIONS = {
    1: ["Basic HTML & CSS", "Introduction to Python", "Computer Basics"],
    2: ["JavaScript Essentials", "Intermediate Python", "Data Science Basics"],
    3: ["Advanced JavaScript", "Machine Learning", "AI & Deep Learning"]
}

# Mapping courses to GitHub-hosted raw file URLs
COURSE_FILES = {
    "Basic HTML & CSS": "https://raw.githubusercontent.com/varun339658/resources/main/resources/html_css.pdf",
    "Introduction to Python": "https://raw.githubusercontent.com/varun339658/resources/main/resources/python_basics.pdf",
    "Computer Basics": "https://raw.githubusercontent.com/varun339658/resources/main/resources/computer_basics.pdf",
    "JavaScript Essentials": "https://raw.githubusercontent.com/varun339658/resources/main/resources/javascript.pdf",
    "Intermediate Python": "https://raw.githubusercontent.com/varun339658/resources/main/resources/intermediate_python.pdf",
    "Data Science Basics": "https://raw.githubusercontent.com/varun339658/resources/main/resources/data_science.pdf",
    "Advanced JavaScript": "https://raw.githubusercontent.com/varun339658/resources/main/resources/advanced_js.pdf",
    "Machine Learning": "https://raw.githubusercontent.com/varun339658/resources/main/resources/machine_learning.pdf",
    "AI & Deep Learning": "https://raw.githubusercontent.com/varun339658/resources/main/resources/ai_deep_learning.pdf"
}

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get_courses', methods=['POST'])
def get_courses():
    """Returns recommended courses based on skill level."""
    data = request.json
    skill_level = int(data.get("skill_level", 1))
    recommended_courses = COURSE_RECOMMENDATIONS.get(skill_level, [])
    return jsonify({"recommended_courses": recommended_courses})

@app.route('/download/<course_name>', methods=['GET'])
def download_file(course_name):
    """Redirect user to the GitHub-hosted file URL."""
    from urllib.parse import unquote
    decoded_course_name = unquote(course_name)  # Properly decode URL

    file_url = COURSE_FILES.get(decoded_course_name)
    if file_url:
        return jsonify({"file_url": file_url})
    else:
        return "File not found!", 404

if __name__ == "__main__":
    app.run(debug=True)
