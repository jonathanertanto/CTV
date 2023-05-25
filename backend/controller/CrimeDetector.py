import numpy as np
import cv2
import sys
import os
import tensorflow as tf
from tensorflow import keras

model = tf.keras.models.load_model('/Users/jonathan/Library/CloudStorage/OneDrive-UTS/2023-Autumn-y3/42028 Deep Learning and Convolutional Neural Network/Assignment 3/CTV/backend/controller/weights.12.hdf5')

class_names = ["Abuse", "Arrest", "Explosion", "Fighting", "NormalVideos", "RoadAccidents", "Robbery", "Shooting", "Shoplifting", "Vandalism"]

base_dir = ('/Users/jonathan/Library/CloudStorage/OneDrive-UTS/2023-Autumn-y3/42028 Deep Learning and Convolutional Neural Network/Assignment 3/CTV/backend/data/'+sys.argv[1])

fileNames = os.listdir(base_dir)
highestScore = 0
idx = -1
i = 0
for fileName in os.listdir(base_dir):
    img_path = base_dir + '/' + fileName
    img = tf.keras.utils.load_img(img_path, target_size=(960, 720))
    img_array = tf.keras.utils.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)
    predictions = model.predict(img_array)
    score = tf.nn.softmax(predictions[0])
    if np.max(score) > highestScore:
        highestScore = np.max(score)
        temp = score
        idx = i
    i = i + 1

print(class_names[np.argmax(temp)], ",", fileNames[idx])