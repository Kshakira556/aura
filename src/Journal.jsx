// src/Journal.jsx
import React, { useEffect, useState } from "react";
import { db, auth } from "./firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { signOut } from "firebase/auth";

export default function Journal({ user }) {
  const [text, setText] = useState("");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("✅ Using user prop:", user);

  useEffect(() => {
    if (!user) return;

    async function fetchEntries() {
      try {
        const q = query(
          collection(db, "journalEntries"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(q);
        const userEntries = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEntries(userEntries);
      } catch (error) {
        console.error("Firestore query failed:", error);
        alert(
          "⚡ Firestore needs a composite index for this query. Check the console for a link to auto-create it."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchEntries();
  }, [user]);

  const saveEntry = async () => {
    if (!text.trim()) return;

    try {
      await addDoc(collection(db, "journalEntries"), {
        text,
        createdAt: serverTimestamp(),
        userId: user.uid,
      });
      setText("");
      // Re-fetch entries
      const q = query(
        collection(db, "journalEntries"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const userEntries = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEntries(userEntries);
    } catch (error) {
      console.error("Error saving entry:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!user) return <p>Please log in to view your journal.</p>;

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Your Journal</h2>
      <button onClick={handleLogout} style={{ marginBottom: 20 }}>
        Logout
      </button>
      <textarea
        rows={4}
        placeholder="Write your journal entry here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />
      <button onClick={saveEntry} style={{ padding: "10px 20px" }}>
        Save Entry
      </button>

      <h3 style={{ marginTop: 30 }}>Your Entries</h3>
      {loading ? (
        <p>Loading your entries...</p>
      ) : entries.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        <ul>
          {entries.map(({ id, text, createdAt }) => (
            <li key={id} style={{ marginBottom: 15 }}>
              <div>{text}</div>
              <small style={{ color: "#555" }}>
                {createdAt?.toDate
                  ? createdAt.toDate().toLocaleString()
                  : "Saving..."}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
