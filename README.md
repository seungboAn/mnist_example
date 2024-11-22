# mnist_example

## Overview

This project is an example of a handwritten digit recognition application that demonstrates how to implement an AI service in the form of a REST API. Utilizing the well-known MNIST dataset, the application allows users to upload handwritten digit images and receive predictions from a trained machine learning model.

## Usage

This project consists of a frontend and a backend component. Follow these steps to run the application:

1. Start Frontend and Backend Server
### Frontend

To start the frontend server:
Run the following command:

```bash
   cd ./frontend

   npm install 

   npm run dev
```

### Backend

To start the Backend server:
Run the following command:

```bash
    cd ./backend

    python app.py
```

2. Check Server Status and Test
- Access `http://localhost:3000`
- Use the "확인하기" button to verify that the server is running properly.

3. Upload images from the `./sample` directory to test the digit recognition functionality.
