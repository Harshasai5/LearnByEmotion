# emotion_service.py

import tensorflow as tf
import numpy as np
import cv2
import os

from fer.emotion_labels import EMOTION_LABELS
from keras.layers import TFSMLayer
from keras.models import Sequential

# Absolute path to model directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "emotion_model_tf")

print("🔄 Loading FER model using TFSMLayer (Keras 3 compatible)...")

# Load SavedModel as inference-only layer
tfsm_layer = TFSMLayer(
    MODEL_PATH,
    call_endpoint="serving_default"
)

# Wrap inside Sequential model
model = Sequential([tfsm_layer])

print("✅ FER model loaded successfully (Keras 3)")


def preprocess_face(face_img):
    face_img = cv2.cvtColor(face_img, cv2.COLOR_BGR2GRAY)
    face_img = cv2.resize(face_img, (48, 48))
    face_img = face_img / 255.0
    face_img = np.reshape(face_img, (1, 48, 48, 1))
    return face_img


def predict_emotion(face_img):
    processed = preprocess_face(face_img)

    # Run inference
    outputs = model(processed, training=False)

    # Handle dict output from TFSMLayer
    if isinstance(outputs, dict):
        outputs = list(outputs.values())[0]

    predictions = outputs.numpy()

    emotion_index = int(np.argmax(predictions))
    emotion_label = EMOTION_LABELS.get(emotion_index, "Unknown")
    confidence = float(np.max(predictions))

    return {
        "emotion": emotion_label,
        "confidence": round(confidence, 3)
    }
