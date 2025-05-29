# AI Image Generation Application

This is a Next.js application integrated with Genkit AI for AI-powered image generation. It leverages Google's Gemini API for its AI capabilities.

## Setup and Installation

To get this project up and running on your local machine, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Adilahmed03/Ai-Image-Generation.git/
    cd Ai-Image-Generation
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up your Gemini API Key:**

    This application requires a Gemini API key to function correctly. You can obtain one from the Google Cloud Console or Google AI Studio.

    Create a `.env` file in the root of your project and add your API key as follows:

    ```plaintext
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```

    Replace `YOUR_API_KEY_HERE` with your actual Gemini API key.

## Running the Application

Once the setup is complete, you can run the application using the following commands:

1.  **Start the Next.js development server:**

    Open your terminal and run:

    ```bash
    npm run dev
    ```

    This will start the Next.js application, typically accessible at `http://localhost:9002`.

2.  **Start the Genkit AI development server:**

    Open a **new terminal window** and run:

    ```bash
    npm run genkit:dev
    ```

    This command starts the Genkit AI backend, which is essential for the image generation functionality. Ensure this is running alongside the Next.js server.

After both commands are running, you should be able to access the application in your web browser and utilize its AI image generation features.
