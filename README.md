---

[![Built with React](https://img.shields.io/badge/Built%20with-React-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Styled with TailwindCSS](https://img.shields.io/badge/Styled%20with-TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Powered by Flask](https://img.shields.io/badge/Powered%20by-Flask-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![Database-PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Uses OpenAI](https://img.shields.io/badge/Uses-OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)
[![Dockerized](https://img.shields.io/badge/Dockerized-blue?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

---

# ✨ zenflow-ai: AI-Powered Creative Storytelling Assistant

**zenflow-ai** is a web application designed to empower creators by providing an AI-assisted platform for writing and managing stories. It helps users overcome creative blocks by generating diverse story elements (text passages, image ideas, soundscapes) based on context, allowing for a fluid and innovative writing process.

*(Add screenshots or a demo GIF here to showcase the application)*

## ✨ Features

*   **AI Content Generation:** Utilize OpenAI to generate creative content for specific story elements (text passages, image descriptions, sound concepts) based on user-provided context.
*   **Element-Based Story Building:** Structure your narratives by adding different types of elements (text, image, sound) and generate content for them individually or collaboratively.
*   **Story Management:** Create, view, update, and delete your stories securely under your user account.
*   **User Authentication:** Secure registration and login system to manage personal stories.
*   **Intuitive User Interface:** Clean and responsive design built with React and Tailwind CSS.
*   **Robust Backend API:** Secure and scalable RESTful API built with Flask and SQLAlchemy.
*   **Dockerized Deployment:** Easy setup and running using Docker Compose for both the backend, frontend, and database.

## 🚀 Technology Stack

**Frontend:**
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

**Deployment/Setup:**
*   Docker
*   Docker Compose

## 🛠️ Getting Started

Follow these steps to get `zenflow-ai` up and running on your local machine.

### Prerequisites

*   [Docker](https://www.docker.com/get-started/) and [Docker Compose](https://docs.docker.com/compose/install/) (Recommended)
*   Alternatively (for manual setup): Python 3.8+, Node.js (v14+ recommended) & npm/yarn, PostgreSQL

### Configuration

You will need API keys for OpenAI and configure database credentials.

1.  **OpenAI API Key:** Obtain an API key from the [OpenAI website](https://beta.openai.com/account/api-keys).
2.  **Create `.env` files:**
    *   Navigate to the project root directory.
    *   Copy the example environment files:
        ```bash
        cp API/.env.example API/.env
        cp Client/.env.example Client/.env
        ```
    *   Edit `API/.env`:
        *   Set `SECRET_KEY` to a random string.
        *   Set `JWT_SECRET_KEY` to another random string.
        *   Configure `DATABASE_URL` (e.g., `postgresql://user:password@db:5432/zenflowdb` when using Docker Compose, or your local database URL for manual setup).
        *   Set `OPENAI_API_KEY` to your OpenAI API key.
    *   Edit `Client/.env`:
        *   Set `VITE_API_BASE_URL` to the URL where your backend API will be running (e.g., `http://localhost:5000`).

### Running with Docker Compose (Recommended)

1.  Ensure Docker and Docker Compose are installed and running.
2.  From the project root directory, build and run the services:
    ```bash
    docker-compose up --build
    ```
3.  The Docker Compose setup will start the PostgreSQL database, the Flask API, and the React client.
4.  The backend API should be accessible at `http://localhost:5000`.
5.  The frontend client should be accessible at `http://localhost:5173` (or the default Vite port if changed).

### Manual Setup (Alternative)

#### Backend API

1.  Navigate to the `API` directory:
    ```bash
    cd API
    ```
2.  Create and activate a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate # On Windows use `venv\Scripts\activate`
    ```
3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  Set up the database:
    *   Ensure PostgreSQL is running and you have a database created (matching the database name in your `API/.env` `DATABASE_URL`).
    *   Initialize and apply database migrations using Flask-Migrate:
        ```bash
        flask db init  # Only run the first time to create migration folder
        flask db migrate -m "Initial migration" # Create migration script
        flask db upgrade # Apply migrations to the database
        ```
        *(Note: If not using `flask-migrate`, you would manually create tables based on `app/models.py` or use `db.create_all()`)*
5.  Run the Flask development server:
    ```bash
    flask run
    ```
    (The API will run on `http://localhost:5000` by default).

#### Frontend Client

1.  Navigate to the `Client` directory:
    ```bash
    cd Client
    ```
2.  Install dependencies:
    ```bash
    npm install # or yarn install
    ```
3.  Run the development server:
    ```bash
    npm run dev # or yarn dev
    ```
    (The client will run on `http://localhost:5173` by default).

After following either Docker or Manual steps, the application should be accessible in your web browser at the frontend client's address (e.g., `http://localhost:5173`).

## 📚 API Documentation

The backend provides RESTful endpoints for authentication, story management, and element generation. Explore the `API/routes` directory for specific endpoint details. *(Consider adding more detailed API documentation here or linking to a separate document in the future).*

## 📂 Project Structure

The project is organized into two main directories:

*   `API/`: Contains the Flask backend application, including routes, services, models, and configuration.
*   `Client/`: Contains the React frontend application, including components, pages, and API interaction logic.

## 👋 Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes and commit them (`git commit -m 'Add some feature'`).
4.  Push to the branch (`git push origin feature/your-feature-name`).
5.  Create a new Pull Request.

For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is currently unlicensed. *(It is highly recommended to add a LICENSE file, e.g., MIT, to specify how others can use your code).*

## 📧 Contact

Ossama Hendi - [ossama.hendi21@gmail.com](mailto:ossama.hendi21@gmail.com)

Project Link: [https://github.com/Ossamahendi21/zenflow-ai-](https://github.com/Ossamahendi21/zenflow-ai-)
