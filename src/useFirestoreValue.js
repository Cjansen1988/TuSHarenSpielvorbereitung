import { useState, useEffect, useCallback, useRef } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db, COLLECTION } from "./firebase";

/**
 * Keeps a Firestore document (COLLECTION/{key}) in sync with local React state.
 * Both trainers see each other's changes live via onSnapshot.
 * Mirrors the shape of the old window.storage-based helpers so the rest
 * of the app barely had to change.
 */
export function useFirestoreValue(key, fallback) {
  const [value, setValueState] = useState(fallback);
  const [loaded, setLoaded] = useState(false);
  const writingRef = useRef(false);

  useEffect(() => {
    const ref = doc(db, COLLECTION, key);
    const unsub = onSnapshot(
      ref,
      (snap) => {
        // Ignore the echo of our own write to avoid a flicker.
        if (writingRef.current) {
          writingRef.current = false;
          return;
        }
        if (snap.exists() && snap.data().value !== undefined) {
          setValueState(snap.data().value);
        } else {
          setValueState(fallback);
        }
        setLoaded(true);
      },
      (err) => {
        console.error(`Firestore-Fehler bei ${key}:`, err);
        setLoaded(true);
      }
    );
    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const setValue = useCallback(
    async (next) => {
      setValueState(next);
      writingRef.current = true;
      try {
        await setDoc(doc(db, COLLECTION, key), { value: next, updatedAt: Date.now() });
      } catch (err) {
        console.error(`Konnte ${key} nicht speichern:`, err);
        writingRef.current = false;
      }
    },
    [key]
  );

  return [value, setValue, loaded];
}
