from flask import Flask, jsonify
import cv2
import face_recognition
from pymongo import MongoClient
import os
from datetime import datetime  # Import datetime for timestamp
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# MongoDB Atlas connection URI
mongo_uri = "your mongo uri"

# Connect to MongoDB Atlas and specify the 'Users' database
client = MongoClient(mongo_uri)
db = client['Users']
collection = db['recognized_names']  # Access the 'recognized_names' collection within the 'Users' database

# Path to known images and corresponding names
path = 'persons'
classNames = []
encodeListKnown = []

# Load known images and their encodings
for filename in os.listdir(path):
    if filename.endswith(('.jpg', '.jpeg', '.png')):
        img = cv2.imread(os.path.join(path, filename))
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        encoding = face_recognition.face_encodings(img_rgb)[0]
        classNames.append(os.path.splitext(filename)[0])
        encodeListKnown.append(encoding)

print('Encoding Complete.')

# Set to track recognized names that have been inserted into MongoDB
inserted_names = set()

# Function to recognize faces in a given image
def recognize_faces_in_image(img):
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    face_locations = face_recognition.face_locations(img_rgb)
    face_encodings = face_recognition.face_encodings(img_rgb, face_locations)

    recognized_faces = []
    face_boxes = []

    for face_encoding, (top, right, bottom, left) in zip(face_encodings, face_locations):
        matches = face_recognition.compare_faces(encodeListKnown, face_encoding)
        name = "Unknown"

        if True in matches:
            match_index = matches.index(True)
            name = classNames[match_index]
            recognized_faces.append(name)
            face_boxes.append((top, right, bottom, left))

    return recognized_faces, face_boxes

@app.route('/recognize_from_video', methods=['GET'])
def recognize_from_video():
    print('Received GET request for video recognition...')
    cap = cv2.VideoCapture(0)
    recognized_names = []

    while True:
        ret, frame = cap.read()

        if not ret:
            print("Failed to capture frame.")
            break

        recognized_faces, face_boxes = recognize_faces_in_image(frame)
        print('Recognized Faces:', recognized_faces)

        for name, (top, right, bottom, left) in zip(recognized_faces, face_boxes):
            cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)
            cv2.putText(frame, name, (left + 6, bottom - 6), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)

            if name not in inserted_names:
                # Get current timestamp
                current_time = datetime.now()

                # Insert the name and timestamp into MongoDB collection
                result = collection.insert_one({'recognized_name': name, 'timestamp': current_time})
                print('Document inserted:', result.inserted_id)
                inserted_names.add(name)

        cv2.imshow('Recognized Faces', frame)
        cv2.waitKey(1)

    cap.release()
    cv2.destroyAllWindows()

    return jsonify({'recognized_faces': recognized_names}), 200

@app.route('/recognized_names', methods=['GET'])
def get_recognized_names():
    recognized_names = [doc['recognized_name'] for doc in collection.find()]
    return jsonify({'recognized_names': recognized_names}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
