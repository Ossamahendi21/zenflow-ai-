---

[![Built with React](https://img.shields.io/badge/Built%20with-React-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Styled with TailwindCSS](https://img.shields.io/badge/Styled%20with-TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Powered by Flask](https://img.shields.io/badge/Powered%20by-Flask-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![Database-PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Uses OpenAI](https://img.shields.io/badge/Uses-OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)
[![SAAS](https://img.shields.io/badge/Product%20Type-SAAS-5D3FD3?style=for-the-badge&logo=vercel&logoColor=white)](#) <!-- Or substitute with your hosting provider logo if applicable -->

---

# ✨ zenflow-ai: AI-Powered Creative Storytelling Assistant (SAAS)

**zenflow-ai** is a hosted web application designed to empower creators by providing an AI-assisted platform for writing and managing stories. It helps users overcome creative blocks by generating diverse story elements (text passages, image ideas, soundscapes) based on context, allowing for a fluid and innovative writing process without requiring any local setup.

*(Add screenshots or a demo GIF here to showcase the application)*

## 🚀 Experience ZenFlow AI

Access the live application and start crafting your stories with AI assistance:

**[👉 Visit the ZenFlow AI Application](YOUR_LIVE_DEMO_URL_HERE)**

*(Replace `YOUR_LIVE_DEMO_URL_HERE` with the actual URL where your application is hosted)*

## ✨ Key Features

*   **AI Content Generation:** Utilize OpenAI to generate creative content for specific story elements (text passages, image descriptions, sound concepts) based on user-provided context.
*   **Element-Based Story Building:** Structure your narratives by adding different types of elements (text, image, sound) and generate content for them individually or collaboratively within the web interface.
*   **Story Management:** Create, view, update, and delete your stories securely under your user account.
*   **User Authentication:** Secure registration and login system built into the web application.
*   **Intuitive User Interface:** Clean and responsive design accessible directly through your browser.

## 💻 Technology Stack

This repository contains the source code for the ZenFlow AI SAAS platform, built using the following technologies:

**Frontend (Client):**
*   React
*   Tailwind CSS
*   React Router
*   Axios
*   Vite

**Backend (API):**
*   Flask
*   Flask-SQLAlchemy (PostgreSQL)
*   Flask-JWT-Extended
*   Flask-CORS
*   OpenAI Python Library
*   Python-dotenv

**Database:**
*   PostgreSQL

## 🏗️ Architecture Overview

ZenFlow AI follows a standard client-server architecture:

*   The **Frontend** (Client/) is a React single-page application that provides the user interface in the browser. It communicates with the backend API.
*   The **Backend** (API/) is a Flask application that handles user authentication, story data management (CRUD operations), and the core AI interactions with the OpenAI API.
*   The **Database** (PostgreSQL) stores user and story data.

This separation allows for clear responsibilities and scalability of both the frontend and backend services, hosted independently.

## 📂 Repository Structure

This repository contains the source code for the ZenFlow AI SAAS:

*   `API/`: Contains the Flask backend application.
*   `Client/`: Contains the React frontend application.
*   Other configuration files (e.g., `docker-compose.yml` for deployment/development environments).

## 👋 Contributing (Optional)

If you are interested in contributing to the ZenFlow AI codebase, please refer to the contribution guidelines. *(If this is a private/portfolio project not intended for external contributions, you can remove this section).*

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes and commit them (`git commit -m 'Add some feature'`).
4.  Push to the branch (`git push origin feature/your-feature-name`).
5.  Create a new Pull Request.

For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is currently unlicensed. *(It is highly recommended to add a LICENSE file, e.g., MIT, if you intend for others to freely use or modify the source code found in this repository).*

## 📧 Contact

Ossama Hendi - [ossama.hendi21@gmail.com](mailto:ossama.hendi21@gmail.com)

Project Repository: [https://github.com/Ossamahendi21/zenflow-ai-](https://github.com/Ossamahendi21/zenflow-ai-)
