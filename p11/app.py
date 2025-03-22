from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/summarize', methods=['POST'])
def summarize():
    text = request.json.get('text')
    
    # Example using OpenAI's API
    api_key = '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'  # Replace with your OpenAI API key
    response = requests.post(
        'https://api.openai.com/v1/completions',
        headers={
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json',
        },
        json={
            'model': 'text-davinci-003',
            'prompt': f'Summarize the following text:\n{text}\n\nSummary:',
            'max_tokens': 150,
        }
    )
    
    summary = response.json().get('choices')[0].get('text').strip()
    return jsonify({'summary': summary})

if __name__ == '__main__':
    app.run(debug=True)