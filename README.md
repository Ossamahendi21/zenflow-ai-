# Zenflow AI Chatbot 🌱✨

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Technologies: Python, Streamlit, Langchain, OpenAI](https://img.shields.io/badge/Technologies-Python%2C%20Streamlit%2C%20Langchain%2C%20OpenAI-blue)

Zenflow AI is a simple, interactive AI chatbot application built using Python, Streamlit for the user interface, and Langchain to manage the conversation flow with the OpenAI API. It provides a clear example of integrating large language models into a functional web application with chat history capabilities.

## Demo

Watch a short demonstration of the chatbot in action:

[https://gitdocify.com/videos/demo.mp4](https://gitdocify.com/videos/demo.mp4)

## Features

*   **AI-Powered Conversations:** Interact with a large language model powered by OpenAI.
*   **Streamlit UI:** Clean and user-friendly chat interface built with Streamlit.
*   **Conversation History:** Maintains context within the current session using Streamlit's session state.
*   **Langchain Integration:** Utilizes Langchain for managing conversation chains and memory.
*   **Easy Setup:** Simple steps to get the application running locally.
*   **Docker Support:** Includes a Dockerfile for easy containerization and deployment.

## Technologies Used

*   Python
*   Streamlit
*   Langchain
*   OpenAI API
*   python-dotenv (for managing API keys securely)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Python 3.7+
*   pip (Python package installer)
*   An OpenAI API Key. You can obtain one from the [OpenAI website](https://beta.openai.com/signup/).
*   (Optional) Docker if you want to run it as a container.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Ossamahendi21/zenflow-ai-.git
    cd zenflow-ai-
    ```

2.  **Setup Environment Variables:**
    The application requires your OpenAI API key. Create a file named `.env` in the root directory of the project and add the following line:

    ```dotenv
    OPENAI_API_KEY='your-openai-api-key-here'
    ```
    Replace `'your-openai-api-key-here'` with your actual OpenAI API key.

3.  **Install Dependencies:**
    Install the required Python packages using pip:

    ```bash
    pip install -r requirements.txt
    ```

### Running the Application

1.  **Run the Streamlit app:**

    ```bash
    streamlit run app.py
    ```

2.  The application should automatically open in your default web browser at `http://localhost:8501`.

### Running with Docker (Optional)

If you have Docker installed, you can build and run the application as a container:

1.  **Build the Docker image:**

    ```bash
    docker build -t zenflow-ai .
    ```

2.  **Run the Docker container:**

    ```bash
    docker run -p 8501:8501 -e OPENAI_API_KEY='your-openai-api-key-here' zenflow-ai
    ```
    Remember to replace `'your-openai-api-key-here'` with your actual key.

3.  Access the application in your browser at `http://localhost:8501`.

## Configuration

The application uses the `python-dotenv` library to load the `OPENAI_API_KEY` from a `.env` file in the project root. Ensure this file exists and contains your valid OpenAI API key as described in the installation steps.

## Contributing

Contributions are welcome! If you find a bug, have a feature request, or want to improve the code, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to customize this README further! You can add more details about specific features, add screenshots, or include information about potential future enhancements.
