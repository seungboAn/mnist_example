from tensorflow.keras.datasets import mnist
from tensorflow import keras
from tensorflow.keras import layers

(train_images, train_labels), (test_images, test_labels) = mnist.load_data()
model = keras.Sequential([
    layers.Dense(512, activation="relu"),
    layers.Dense(10, activation="softmax")
])

# confile
model.compile(optimizer="rmsprop",
              loss="sparse_categorical_crossentropy",
              metrics=["accuracy"])

# Data preprocessing
train_images = train_images.reshape((60000, 28 * 28))
train_images = train_images.astype("float32") / 255
test_images = test_images.reshape((10000, 28 * 28))
test_images = test_images.astype("float32") / 255

# Model training
model.fit(train_images, train_labels, epochs=5, batch_size=128)

# Model save
model.save('mnist_model.h5')

# Only for test
# test_digits = test_images[0:10]
# predictions = model.predict(test_digits)
# print(f'test_label: {test_labels[0]}, predict_label: {predictions[0].argmax()}')