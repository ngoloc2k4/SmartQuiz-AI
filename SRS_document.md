# Software Requirements Specification (SRS) for QuizMaster AI

## 1. Introduction

### 1.1 Purpose
The purpose of the QuizMaster AI system is to provide an intelligent quiz platform that automatically generates questions, evaluates user answers, and offers detailed explanations. This system is designed to enhance learning outcomes by offering immediate feedback, personalized quizzes, and AI-driven content generation.

### 1.2 Scope
The system consists of three primary components:
- **Front-End:** A responsive web application built with ReactJS and styled using TailwindCSS. It handles user interactions, displays quizzes, and shows results.
- **Back-End:** A RESTful API developed with Java Spring Boot (or alternatively Flask, if required) that manages user data, quizzes, questions, and results. The back-end connects to a MongoDB database.
- **AI Integration:** Uses external AI APIs (e.g., OpenAI or DeepSeek models) to automatically generate quiz questions, evaluate answers, and provide explanations.

### 1.3 Intended Audience
- **Students:** Use the system for self-assessment and learning.
- **Teachers/Administrators:** Manage and create quizzes, monitor user progress, and update content.
- **Developers:** Maintain and extend the system functionality.
- **System Administrators:** Monitor performance, scalability, and security.

### 1.4 Definitions, Acronyms, and Abbreviations
- **SRS:** Software Requirements Specification
- **API:** Application Programming Interface
- **JWT:** JSON Web Token
- **UI:** User Interface
- **UX:** User Experience
- **CRUD:** Create, Read, Update, Delete
- **DB:** Database

---

## 2. Overall Description

### 2.1 Product Perspective
QuizMaster AI is a standalone web application intended for educational purposes. It will interface with a backend API to handle data storage and business logic. The system is designed with modularity in mind, allowing independent updates to the front-end, back-end, and AI components.

### 2.2 Product Functions
- **User Management:** Registration, login, profile update, and account deletion.
- **Quiz Management:** Creation, modification, deletion, and retrieval of quizzes.
- **Question Management:** Adding, updating, and deleting questions; storing question metadata (difficulty, category, etc.).
- **Quiz Execution:** Delivering quizzes to users, collecting responses, and timing quizzes.
- **Result Evaluation:** Automatically grading quizzes and providing detailed explanations.
- **AI Integration:** Automatically generating questions and explanations based on selected topics and difficulty levels.
- **Reporting and Analytics:** Tracking user progress, quiz performance, and providing recommendations for further learning.

### 2.3 User Characteristics
- Users should have basic computer and Internet literacy.
- Students may have limited technical knowledge, so the UI must be intuitive and easy to navigate.
- Administrators and teachers will require more advanced features for quiz management.

### 2.4 Assumptions and Dependencies
- Users will have a stable Internet connection.
- The external AI APIs (e.g., OpenAI) will be accessible and reliable.
- The system will be deployed on cloud platforms (e.g., Heroku for backend, Vercel for frontend).
- Node.js v20 is used for the front-end environment.
- Java Spring Boot (or Flask) is used for the back-end.
- MongoDB is the primary database, either hosted on Atlas or locally.

---

## 3. Functional Requirements

### 3.1 User Management
- **Registration:**
  - **FR1.1:** The system shall allow users to register by providing a name, email, and password.
  - **FR1.2:** The system shall validate the uniqueness of the email.
  - **FR1.3:** Passwords must be hashed before storing in the database.
  
- **Login:**
  - **FR1.4:** The system shall allow users to log in using their email and password.
  - **FR1.5:** Upon successful login, a JWT token shall be generated and returned.
  
- **Profile Management:**
  - **FR1.6:** Users shall be able to view and update their profile information.
  - **FR1.7:** Users can delete their account if desired.

### 3.2 Quiz and Question Management
- **Quiz Creation and Management:**
  - **FR2.1:** Administrators/teachers shall be able to create new quizzes by providing a title, description, and associated questions.
  - **FR2.2:** The system shall allow updating and deletion of quizzes.
  - **FR2.3:** Quizzes shall be stored in the database with metadata such as creation date and creator’s ID.
  
- **Question Management:**
  - **FR2.4:** The system shall allow adding new questions to a quiz with the following attributes: question text, answer options, correct answer, explanation, difficulty, and category.
  - **FR2.5:** Administrators shall be able to update and delete questions.

### 3.3 Quiz Execution and Result Evaluation
- **Quiz Execution:**
  - **FR3.1:** The system shall present quiz questions to the user one at a time, with the appropriate answer options.
  - **FR3.2:** The system shall enforce a time limit if specified.
  - **FR3.3:** Users shall be able to navigate between questions (next, previous).
  
- **Result Evaluation:**
  - **FR3.4:** Upon submission, the system shall automatically grade the quiz based on correct answers.
  - **FR3.5:** The system shall provide detailed explanations for each question (especially for wrong answers).
  - **FR3.6:** Quiz results, including score, answers, and feedback, shall be stored in the database.

### 3.4 AI Integration
- **Automated Content Generation:**
  - **FR4.1:** The system shall integrate with external AI APIs to generate new quiz questions and detailed explanations based on a given topic and difficulty level.
  - **FR4.2:** An API endpoint shall be provided to trigger the generation of a question (`generateQuestion(topic, difficulty)`).
  
- **Adaptive Learning Recommendations:**
  - **FR4.3:** Based on user performance, the system shall recommend subsequent quizzes or topics for further practice.

### 3.5 Reporting and Analytics
- **User Progress Tracking:**
  - **FR5.1:** The system shall track user performance over time, including quiz scores and progress history.
  
- **Feedback Mechanism:**
  - **FR5.2:** Users shall be able to submit feedback for each quiz, and the system shall store these responses.

---

## 4. Non-Functional Requirements

### 4.1 Performance
- **NFR1:** All API responses must be delivered within 2 seconds under normal load.
- **NFR2:** The system should support simultaneous access by at least 500 concurrent users.

### 4.2 Security
- **NFR3:** All sensitive data (passwords, tokens) must be stored securely (e.g., password hashing, use of HTTPS).
- **NFR4:** API endpoints shall be secured using JWT-based authentication.
- **NFR5:** Implement proper CORS policies to restrict access to the API.

### 4.3 Scalability
- **NFR6:** The system shall be designed to scale horizontally, with stateless APIs to support load balancing.
- **NFR7:** Database solutions (MongoDB/PostgreSQL) should support sharding or replication.

### 4.4 Usability
- **NFR8:** The front-end must be responsive and work across desktop, tablet, and mobile devices.
- **NFR9:** The user interface shall be intuitive and require minimal training.

### 4.5 Maintainability
- **NFR10:** The codebase shall be modular, with clear documentation for each module.
- **NFR11:** Use of version control (Git) and continuous integration (CI) is required.

### 4.6 Reliability and Availability
- **NFR12:** The system should have an uptime of at least 99.5% during business hours.
- **NFR13:** Regular backups of the database must be scheduled.

---

## 5. Interface Requirements

### 5.1. User Interface (UI)
- The front-end UI will be built using ReactJS and TailwindCSS. It must follow a consistent theme, with clear navigation menus and easy access to functionalities like login, quiz taking, and results viewing.

### 5.2. API Interface
- The API will be RESTful and follow standard HTTP methods (GET, POST, PUT, DELETE).
- API endpoints should return JSON-formatted responses.
- API documentation will be maintained using tools such as Swagger or Postman Collections.

---

## 6. System Architecture Overview

### 6.1. Front-End
- **Technology:** ReactJS, TailwindCSS
- **Structure:** Component-based, using React Router for navigation and Axios for API calls.
- **Deployment:** Hosted on cloud platforms like Vercel/Netlify.

### 6.2. Back-End
- **Technology:** Java Spring Boot (or Flask if preferred), MongoDB (or PostgreSQL for relational data)
- **Architecture:** RESTful API, secured with JWT
- **Deployment:** Containerized using Docker and deployed on platforms like Heroku.

### 6.3. AI Integration
- **API Integration:** The back-end integrates with external AI services (e.g., OpenAI) to generate questions and explanations.
- **Modularity:** AI services are decoupled from core quiz management to facilitate future upgrades.

---

## 7. Testing and Quality Assurance

### 7.1. Unit Testing
- Each module (front-end components and back-end services) will have unit tests.
- For Java Spring Boot, use JUnit and Mockito for unit testing.

### 7.2. Integration Testing
- Use Postman to test the integration between front-end and back-end APIs.
- Automated integration tests should run in the CI pipeline.

### 7.3. Performance Testing
- Simulate concurrent users to test API performance using tools like JMeter.

### 7.4. User Acceptance Testing (UAT)
- Conduct UAT sessions with end users (students and teachers) to validate usability and functionality.

---

## 8. Assumptions and Dependencies

- Users will have a stable Internet connection.
- External AI APIs are available and responsive.
- Cloud platforms (Heroku, Vercel) will provide necessary uptime and scalability.
- All team members will use Windows with Node.js v20 for front-end development and Java Spring Boot for back-end development.

---

## 9. Glossary
- **JWT:** JSON Web Token, a compact, URL-safe means of representing claims to be transferred between two parties.
- **RESTful API:** An API that adheres to the REST architectural style, using standard HTTP methods.
- **CRUD:** Create, Read, Update, Delete operations.
- **CI:** Continuous Integration, a practice where developers frequently integrate their code changes into a shared repository.

---

## 10. Appendices
- **Appendix A:** Sample API Request/Response Examples
- **Appendix B:** Deployment Instructions
- **Appendix C:** API Documentation (Swagger/Postman Collection URL)

