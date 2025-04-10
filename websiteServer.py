from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__, template_folder='.', static_folder='.', static_url_path='/')
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

# Handle all static files
@app.route('/<path:path>')
def static_files(path):
    if os.path.isfile(path):
        return send_from_directory('.', path)
    return render_template('index.html')

@app.errorhandler(404)
def page_not_found(e):
    return render_template('index.html')

if __name__ == '__main__':
    print('Starting server...')
    app.run(port=8000, host='0.0.0.0', debug=True)
    print('Server Stopped....')
