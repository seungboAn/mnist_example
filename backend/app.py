from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from PIL import Image
import numpy as np
from tensorflow import keras

app = Flask(__name__, static_folder='static')
CORS(app)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
model = keras.models.load_model('./models/mnist_model.h5')

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def preprocess_image(image_path):
    img = Image.open(image_path).convert('L')
    img = img.resize((28, 28))
    img_array = np.array(img)
    img_array = img_array.reshape(1, 28 * 28).astype('float') / 255.0
    return img_array

@app.route('/', methods=['GET'])
def main():
    return jsonify({"message": "Hello flask"})

@app.route('/hello', methods=['GET'])
def hello_world():
    return jsonify({"message": "손 글씨 분류 모델 익힘의 정도가 이븐하네요. 이미지를 업로드해서 테스트 해보세요."})

@app.route('/upload', methods=['POST'])
def upload_file():
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    if 'image' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = file.filename
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
    try:
        input_image = preprocess_image(file_path)
        print(input_image)
        predictions = model.predict(input_image)
        predicted_digit = int(np.argmax(predictions[0]))
        confidence = float(np.max(predictions[0]))
        os.remove(file_path)
        return jsonify({
            'predicted_digit': predicted_digit,
            'confidence': confidence
        }), 201
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)
