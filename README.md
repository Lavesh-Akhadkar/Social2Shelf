# Social2Shelf

Welcome to [Social2Shelf](https://social2-shelf.vercel.app) by Cryptic Coders This repository contains the code and documentation for our hackathon submission.

## Table of Contents

- [Introduction](#introduction)
- [Usage](#usage)
- [Installation](#installation)
- [License](#license)

## Introduction

Our solution is a platform that enables users to seamlessly convert social media content into comprehensive product listings. Users upload social media links, images, or videos related to a product they like. The backend fetches data from these inputs, extracting information such as product name, description, images, and price to build structured listings. These listings are then displayed on a dummy Amazon-like site where users can browse and purchase items, creating an efficient bridge between social media engagement and e-commerce.

## Usage

1. Paste the link to your social media listing in the input field on homepage or dashboard
2. Verify the auto filled form by Generative AI.
3. Click Sell on Amazon
4. Your product is listed on Amazon 🎉


## Installation

### Note: The process of local installation and running involves a lot of steps and api keys we recommend to check out our deployment of the project here: [Link Here](https://social2-shelf.vercel.app)

To install and run this project, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/Lavesh-Akhadkar/Social2Shelf
    ```
2. Install frontend dependencies:
    ```bash
    cd web
    npm install
    ```
3. Install backend dependencies:
    ```bash
    cd backend
    pip install -r requirements.txt
    ```
4. Create a .env file in backend/app directory for following services for a private deployment:
    ```bash
    MONGODB_URL
    MONGODB_DB_NAME
    CLOUDINARY_SECRET
    MISTRAL_API_KEY
    ```
5. Run backend using following command 
    ```bash
    uvicorn backend.app.main:app --reload
    ```
6. Run frontend using following command in web directory
    ```bash
    npm run dev
    ```

## License

This project is licensed under the MIT License.
