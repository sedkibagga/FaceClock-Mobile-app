import cv2
import os

# Create a directory to store captured images
images_dir = 'images'
os.makedirs(images_dir, exist_ok=True)

def capture_images():
    cap = cv2.VideoCapture(0)  # Open the webcam

    try:
        count = 0
        while True:
            ret, frame = cap.read()  # Read frame from the webcam
            if not ret:
                print("Failed to capture frame")
                break

            cv2.imshow('Webcam', frame)

            # Save the captured image to the images directory
            img_path = os.path.join(images_dir, f'image_{count}.jpg')
            cv2.imwrite(img_path, frame)

            count += 1

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

    finally:
        cap.release()
        cv2.destroyAllWindows()

if __name__ == "__main__":
    capture_images()
