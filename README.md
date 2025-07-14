---

## 📝 `README.md`

````markdown
# 🏠 AURA — AI Assistant

**AURA** is a secure web AI assistant designed to protect users from human threats (scams, stalking, manipulation) and eventually AI threats — using behavioral analysis, emotional radar, and autonomous defense mechanisms.

---

## 🚀 Current MVP Progress

✅ **Phase 1:**  
- User Authentication with **Firebase Auth**
- Login & Signup form using **React**
- Smart auto-switch: if signup email already exists, it switches to login and logs in automatically.

---

## 🛠️ Tech Stack So Far

- Frontend: **React**, **JSX**, **CSS**
- Backend/Auth: **Firebase Authentication**
- Hosting: Runs locally with **Vite**

---

## ▶️ How to Run This Project (So Far)

1. **Install dependencies**

   ```bash
   npm install
````

2. **Start the development server**

   ```bash
   npm run dev
   ```

3. Open your browser and visit the local URL shown in the terminal, e.g.:

   ```
   http://localhost:5173/
   ```

4. **Sign up / Log in**

   * Use any email + password.
   * If the email is already in use, the app auto-switches to login.

---

## 🗺️ What’s Next (Planned Features)

✨ **Next Steps:**

1. **Secure Personal Journal**

   * Users can write and save private entries to Firebase Firestore.

2. **GPT-Powered Analysis**

   * Use OpenAI GPT-4 API to analyze entries for mood, sentiment, and threats.

3. **Web Alert Dashboard**

   * Show flagged journal entries with risk levels.

4. **Email/Notification Alerts**

   * Send email alerts if risky behavior is detected.

---

## 💡 Notes

* This project is currently for **web** — mobile version will come later.
* Using **Vite** for fast local development.
* Firebase config is stored in `/src/firebase.js`

---

**Built by Shakira 🫶🏽**

```