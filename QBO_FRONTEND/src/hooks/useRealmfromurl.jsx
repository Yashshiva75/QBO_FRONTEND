import { useState, useEffect } from "react";

export function useRealmFromUrl() {
  const [realmId, setRealmId] = useState(() => localStorage.getItem("qbo_realm_id"));

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("realmId");
    if (id) {
      localStorage.setItem("qbo_realm_id", id);
      setRealmId(id);
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  function clearRealm() {
    localStorage.removeItem("qbo_realm_id");
    setRealmId(null);
  }

  // setter so ConnectPage can manually set realmId after popup closes
  function saveRealm(id) {
    localStorage.setItem("qbo_realm_id", id);
    setRealmId(id);
  }

  return [realmId, saveRealm, clearRealm];
}