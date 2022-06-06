import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import IntegrationService from "../services/integration";

const Storage = new IntegrationService(AsyncStorage);

function useToken() {
  const [token, setToken] = useState("");
  const [script, setScript] = useState("");

  useEffect(() => {
    const updateScript = async () => {
      const token = await Storage.getTokenFromStorage();
      const script = `
        window.isNativeApp = true;
        window.token = "${token}";
        true;
      `;

      setScript(script);
    };
    updateScript();
  }, []);

  useEffect(() => {
    if (token) {
      Storage.setTokenToStorage(token);
    }
  }, [token]);

  return { script, setToken };
}

export default useToken;
