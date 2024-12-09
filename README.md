# Model Evaluation Website

## Introduction

Welcome to our **Model Evaluation Platform**! Designed with cutting-edge capabilities, our platform allows users to thoroughly assess their machine learning models across several critical attributes. These include **Correctness**, **Robustness**, **Fairness**, and **Transferability**—each supported by a diverse range of evaluation perspectives and metrics.

Our platform provides flexibility in customizing evaluation tasks, datasets, metrics, and model parameters, giving you full control over how models are assessed. Users can also visualize evaluation results, gaining a clearer, intuitive understanding of model performance. This empowers you to optimize and improve your models more effectively.

Currently, the platform specializes in key computer vision tasks, including **Image Classification**, **Object Detection**, and **Image Segmentation**. We are committed to continually evolving the platform's features, ensuring it stays in sync with advancements in deep learning technologies and application needs, and providing our users with increasingly powerful evaluation tools.

## Properties

Our platform supports model evaluation across the following key attributes:

- **Correctness**
- **Robustness**
- **Fairness**
- **Transferability**

---

## Frontend and Backend Setup

### Backend Setup
1. Create and activate a Conda environment by running the following command:
   ```bash
   conda create --name model-evaluation python=3.9
   conda activate model-evaluation
   ```

2. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. To start the backend, run the `start.sh` script:

   - For **development environment**, add the `dev` flag:
     ```bash
     bash ./src/start.sh dev
     ```

   - For **production environment**, run without the `dev` flag:
     ```bash
     bash ./src/start.sh
     ```

   The script will handle migrations and then either start the Django development server (`runserver`) or use Gunicorn for production (`gunicorn`).

### Frontend Setup
1. Install **nvm** (Node Version Manager) if it's not already installed.

2. Install Node.js version 16.20.2:
   ```bash
   nvm install 16.20.2
   ```

3. Switch to Node.js version 16.20.2:
   ```bash
   nvm use v16
   ```

4. Install **Yarn** package manager for the selected Node.js version:
   ```bash
   npm install -g yarn
   ```

5. Install the necessary frontend dependencies:
   ```bash
   yarn install
   ```

6. To build the frontend project:
   ```bash
   yarn build
   ```

---

## Contact

This project is developed by VIPA Lab from Zhejiang University.
<p align="center">
  <img src="./assets/images/vipa-logo.jpg" width="50%" />
</p>
---
