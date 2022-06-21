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
        (function() {
          function wrap(fn) {
            return function wrapper() {
              var res = fn.apply(this, arguments);
              window.ReactNativeWebView.postMessage('navigationStateChange');
              return res;
            }
          }
    
          history.pushState = wrap(history.pushState);
          history.replaceState = wrap(history.replaceState);
          window.addEventListener('popstate', function() {
            window.ReactNativeWebView.postMessage('navigationStateChange');
          });
        })();
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
      setScript(`
        window.isNativeApp = true;
        window.token = "${token}";
        true;
      `);
    }
  }, [token]);

  return { script, setToken, token };
}

export default useToken;
