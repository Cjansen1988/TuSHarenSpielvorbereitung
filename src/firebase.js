import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Ersetzt diese Werte durch eure eigene Firebase-Web-App-Konfiguration.
// Ihr findet sie in der Firebase-Konsole unter:
// Projekteinstellungen -> Eure Apps -> Web-App -> "SDK-Einrichtung und Konfiguration"
// Diese Werte sind NICHT geheim (sie werden im Browser sichtbar) -
// der eigentliche Schutz kommt über die Firestore-Sicherheitsregeln (firestore.rules).
const firebaseConfig = {
  apiKey: "DEIN_API_KEY",
  authDomain: "DEIN_PROJEKT.firebaseapp.com",
  projectId: "DEIN_PROJEKT",
  storageBucket: "DEIN_PROJEKT.appspot.com",
  messagingSenderId: "DEINE_SENDER_ID",
  appId: "DEINE_APP_ID",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// Alle Daten dieser App liegen in einer eigenen Top-Level-Collection,
// damit sie nicht mit eurer Kegel-App im selben Firebase-Projekt kollidieren.
export const COLLECTION = "tusharen2";
