---
# **Chatbot Project**

## **Description**
This project includes a client-side application built with React and a server-side application built with FastAPI. Follow the steps below to set up and run the project.
---

## **Prerequisites**

Make sure the following are installed on your system:

- **Node.js** (v16 or later)
- **Python** (v3.9 or later)
- **Pip** (Python package manager)

---

## **Instructions**

### **1. Clone the Repository**

```bash
git clone <repository-url>
cd <repository-name>
```

---

### **2. Set Up the Client**

1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the client development server:
   ```bash
   npm run dev
   ```

The client application should now be running at `http://localhost:5173`.

---

### **3. Set Up the Server**

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Create and activate a virtual environment (optional):
   ```bash
   python -m venv env
   # Activate the virtual environment
   # On Windows:
   .\env\Scripts\activate
   # On Mac/Linux:
   source env/bin/activate
   ```
3. Install the required dependencies mentioned in requirements.txt

4. Run the server:
   ```bash
   python -m uvicorn main:app --reload
   ```

The server application should now be running at `http://127.0.0.1:8000`.

---

## **4. Run the Full Application**

- **Frontend**: Accessible at `http://localhost:5173`.
- **Backend**: Accessible at `http://127.0.0.1:8000`.

---

## **Notes**

- Ensure the client-side `.env` file is properly configured with the backend API URL:
  ```env
  VITE_API_URL=http://127.0.0.1:8000
  ```
- Ensure the server `.env` file (if applicable) is properly configured.

---

## **Issues and Contributions**

If you encounter any issues, feel free to open an issue or contribute to the project via pull requests.

---
