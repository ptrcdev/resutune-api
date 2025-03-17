# Resume Analyzer NestJS API

A NestJS-based backend service that handles resume file uploads, parses resume content, and forwards data to a Python-based analysis service. This API acts as an intermediary between the frontend and the NLP analysis service, enabling file parsing, error handling, and secure communication.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Setup and Installation](#setup-and-installation)
  - [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Deployment](#deployment)
- [Future Improvements](#future-improvements)
- [License](#license)

---

## Overview

This API allows users to upload their resumes (in PDF, DOC, DOCX, or TXT format) via a file upload endpoint. The service uses Multer with memory storage to process the uploaded file, then parses it (using libraries such as `pdf-parse` for PDFs) to extract the resume text. Once the text is extracted, the API forwards the resume text along with a job description to a separate Python analysis service. The response from the Python service (which includes detailed metrics, scores, and OpenAI-generated feedback) is returned to the client.

---

## Features

- **File Upload & Parsing:**  
  Handles file uploads with Multer using in-memory storage and parses resumes with appropriate parsers (e.g., `pdf-parse`).

- **API Gateway:**  
  Acts as an intermediary that forwards parsed resume text and job descriptions to the Python analysis API.

- **Error Handling:**  
  Returns meaningful error messages when file uploads or API calls fail.

- **CORS Support:**  
  Configured to allow requests from your frontend application.

---

## Technologies

- **NestJS:** A progressive Node.js framework for building efficient, scalable server-side applications.
- **Multer:** Middleware for handling multipart/form-data (used for file uploads).
- **pdf-parse:** Library for parsing PDF files and extracting text.
- **Node-Fetch:** (or built-in global fetch in newer Node versions) Used to call the Python analysis service.
- **TypeScript:** Provides strong typing and modern JavaScript features.
- **dotenv:** Manages environment variables during development.

---

## Setup and Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/resume-analyzer-api.git
   cd resume-analyzer-api
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Configure Multer to use Memory Storage:**

   Ensure your MulterModule is configured in your NestJS module (e.g., in app.module.ts):

   ```typescript
   import { Module } from '@nestjs/common';
   import { MulterModule } from '@nestjs/platform-express';
   import * as multer from 'multer';
   import { ResumeController } from './resume.controller';

   @Module({
     imports: [
       MulterModule.register({
         storage: multer.memoryStorage(),
       }),
      ],
      controllers: [ResumeController],
    })
    export class AppModule {}
    ```

4. **Environment Variables:**

   Create a `.env` file in the root directory of the project and add the following variables:

   ```env
   PORT=3100
   PYTHON_API_URL=http://localhost:8000
   ALLOWED_ORIGINS=http://localhost:8080 # your frontend URL
   ```
  These variables are used for setting the listening port, the URL to your Python analysis service, and configuring CORS.

## Usage
### Running Locally

1. **Start the application:**

   ```bash
   pnpm run start:dev
   ```

2. **API Endpoints:**

    ```http
    POST /upload
    ```
    Accepts file uploads. This endpoint expects a multipart/form-data request with:

    - **file:** The resume file.
    - **jobText:** A string containing the job description.
    - **resumeText:** (optional) The resume text (used when no file is provided).

    **Example using curl:**

    ```bash
    curl -X POST "http://localhost:3100/upload" \
      -F "file=@/path/to/your/resume.pdf" \
      -F "jobText=Your job description text here..."
    ```

    The endpoint parses the file, extracts the resume text, forwards the data to the Python API, and returns the analysis result.

## Deployment

  This app is deployed on Railway.

## Future Improvements
- Enhanced File Parsing:
  Add support for more file types and integrate more robust parsing libraries.
- Authentication:
  Secure the endpoints with JWT or another authentication method.
- Improved Logging & Monitoring:
  Integrate logging and error tracking to better diagnose issues in production.
- Rate Limiting:
  Implement rate limiting to prevent abuse of the API.
- CI/CD Pipeline:
  Set up GitHub Actions for automated testing and deployment.