---

## ✅ `README.md`

````markdown
# ✨ Aura

A simple journaling app built with **React** + **Firebase**.  
Users can **sign up**, **log in**, and **save personal journal entries** to their Firestore DB.

---

## 📂 Current Features

✅ User authentication (email & password)  
✅ Auto-switch to login if email already exists  
✅ Journal page shows only your entries  
✅ Create new entries — stored with timestamp and user ID  
✅ Logout and switch users

---

## 🚀 How to run it

1. **Clone the repo**  
   ```bash
   git clone https://github.com/Kshakira556/aura.git
   cd aura
````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Add your Firebase config**
   Check `src/firebase.js` and ensure your Firebase project config is correct:

   ```js
   // src/firebase.js
   import { initializeApp } from "firebase/app";
   import { getAuth } from "firebase/auth";
   import { getFirestore } from "firebase/firestore";

   const firebaseConfig = {
     apiKey: "...",
     authDomain: "...",
     projectId: "...",
     ...
   };

   const app = initializeApp(firebaseConfig);
   export const auth = getAuth(app);
   export const db = getFirestore(app);
   ```

4. **Start the dev server**

   ```bash
   npm run dev
   ```

   Then visit: [http://localhost:5173](http://localhost:5173)

---

## ⚡ Next Up

* ✅ Set up Firestore security rules (optional, but recommended!)
* ✅ Create any needed composite indexes in Firestore if you see a query error.
* ⏭️ **Next feature:**

  * ✅ UI improvements (nicer design for forms & journal)
  * 🗑️ Add ability to delete an entry
  * ✏️ Add ability to edit an entry
  * 📅 Show entry timestamps nicely

---

## 🔒 Firestore Setup Tips

✔️ Your Firestore should have a `journalEntries` collection with documents like:

```
journalEntries/
  <auto-id>/
    text: "My first entry"
    createdAt: <timestamp>
    userId: <Firebase UID>
```

✔️ If you see `The query requires an index` → click the console link, Firebase auto-generates the index for you.

---

## 💙 Contributing

* If you spot any bugs, feel free to open an issue or PR.
* Future plans: Tagging, search, multiple journals per user, offline mode.

---

## 🪶 License

This project is MIT licensed — do whatever you like with it.

---

**Happy journaling! ✨**

```

---