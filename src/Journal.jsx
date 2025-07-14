import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  serverTimestamp,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { signOut, onAuthStateChanged } from "firebase/auth";

export default function Journal() {
  const [user, setUser] = useState(null);
  const [text, setText] = useState("");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // ✅ Listen for auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth changed:", currentUser);
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  // ✅ Fetch entries when user is known
  useEffect(() => {
    if (!user) return;

    const fetchEntries = async () => {
      setLoading(true);
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
      setLoading(false);
    };

    fetchEntries();
  }, [user]);

  const saveEntry = async () => {
    if (!text.trim() || !user) return;

    try {
      await addDoc(collection(db, "journalEntries"), {
        text,
        createdAt: serverTimestamp(),
        userId: user.uid,
      });
      setText("");
      refreshEntries();
    } catch (error) {
      console.error("Error saving entry:", error);
    }
  };

  const refreshEntries = async () => {
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
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "journalEntries", id));
      setEntries(entries.filter((entry) => entry.id !== id));
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  const startEditing = (id, currentText) => {
    setEditingId(id);
    setEditingText(currentText);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingText("");
  };

  const saveEdit = async (id) => {
    try {
      const entryRef = doc(db, "journalEntries", id);
      await updateDoc(entryRef, { text: editingText });
      setEditingId(null);
      setEditingText("");
      refreshEntries();
    } catch (error) {
      console.error("Error updating entry:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!user) return <p>🔒 Please log in to view your journal.</p>;
  if (loading) return <p>⏳ Loading entries...</p>;

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
      {entries.length === 0 && <p>No entries yet.</p>}

      <ul>
        {entries.map(({ id, text, createdAt }) => (
          <li key={id} style={{ marginBottom: 15 }}>
            {editingId === id ? (
              <>
                <textarea
                  rows={3}
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  style={{ width: "100%", marginBottom: 5 }}
                />
                <button
                  onClick={() => saveEdit(id)}
                  style={{ marginRight: 5 }}
                >
                  Save
                </button>
                <button onClick={cancelEditing}>Cancel</button>
              </>
            ) : (
              <>
                <div>{text}</div>
                <small style={{ color: "#555" }}>
                  {createdAt?.toDate
                    ? createdAt.toDate().toLocaleString()
                    : "Saving..."}
                </small>
                <br />
                <button
                  onClick={() => startEditing(id, text)}
                  style={{
                    marginTop: 5,
                    backgroundColor: "orange",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>{" "}
                <button
                  onClick={() => handleDelete(id)}
                  style={{
                    marginTop: 5,
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
