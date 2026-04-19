import { useState, useEffect } from "react";
import ConnectPage from "./components/ConnectPage";
import Dashboard from "./components/Dashboard";
import { Toaster } from 'react-hot-toast';

export default function App() {
  const [realmId, setRealmId] = useState(() => {
    return localStorage.getItem("realmId") || null;
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlRealmId = params.get("realmId");

    if (urlRealmId) {
      localStorage.setItem("realmId", urlRealmId);
      setRealmId(urlRealmId);
      
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