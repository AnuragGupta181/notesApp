# 📝 Notes App

A full-stack **Notes Application** with features like **Add, Edit, Delete, and Collaboration**. Built with **MERN stack** and deployed on **Vercel** (frontend) and **Render** (backend).

---

## Live Demo

* **Frontend**: [notes-app-zeta-gilt.vercel.app](https://notes-app-zeta-gilt.vercel.app)
* **Backend**: [https://notesapp-qum9.onrender.com](https://notesapp-qum9.onrender.com)

 If the hosted site is not working, follow the steps below to run the project locally.

---

## Installation & Setup (Local)

### 1️ Clone the Repository

```bash
git clone https://github.com/AnuragGupta181/notesApp.git
```

### 2️ Backend Setup

```bash
cd notesApp/server
npm install
```

Create a `.env` file in `/server` with the following:

```env
MONGODB_URI=mongodb+srv://anu:123@mycluster.gjelc.mongodb.net/notes_app
JWT_SECRET=mein_tu_papa_hunn_papa@111
PORT=3000
```

Run the backend:

```bash
npm run dev
```

### 3️ Frontend Setup { Open in a new terminal }

```bash
cd notesApp/client
npm install
```

Create a `.env` file in `/client` with the following:

```env
VITE_URL=http://localhost:3000/
```

Run the frontend:

```bash
npm run dev
```

---

## Tech Stack

* **Frontend**: React + Vite
* **Backend**: Node.js + Express
* **Database**: MongoDB (Atlas)
* **Authentication**: JWT
* **Deployment**: Vercel (frontend), Render (backend)

---

## Run Project

Once both backend and frontend are running:

* Open [http://localhost:5173](http://localhost:5173) in your browser (default Vite port).

---

## 🙏 Acknowledgments

Thank you for checking out my project! ✨

**Jai Hind 🇮🇳**
