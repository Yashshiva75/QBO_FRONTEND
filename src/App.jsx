import { useState, useEffect } from "react";
import ConnectPage from "./components/ConnectPage";
import Dashboard from "./components/Dashboard";
import { Toaster } from 'react-hot-toast';

export default function App() {
  // 1. Initialize from localStorage
  const [realmId, setRealmId] = useState(() => {
    return localStorage.getItem("realmId") || null;
  });

  // 2. NEW: Effect to catch realmId from the URL (the redirect)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlRealmId = params.get("realmId");

    if (urlRealmId) {
      // Save it to state and storage
      localStorage.setItem("realmId", urlRealmId);
      setRealmId(urlRealmId);
      
      // Clean the URL (removes the ?realmId=xxx from the address bar)
      window.history.replaceState({}, document.title, "/");
    }
  }, []);

  const handleDisconnect = () => {
    localStorage.removeItem("realmId");
    setRealmId(null);
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      {realmId ? (
        <Dashboard realmId={realmId} onDisconnect={handleDisconnect} />
      ) : (
        <ConnectPage onConnect={setRealmId} />
      )}
    </>
  );
}