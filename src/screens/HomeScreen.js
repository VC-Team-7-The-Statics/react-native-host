import { useRef } from "react";
import { WebView } from "react-native-webview";

import Screen from "../components/Screen";
import useForeGroundLocation from "../hooks/useForeGroundLocation";
import useToken from "../hooks/useToken";

function HomeScreen() {
  const webviewRef = useRef();

  const { script, setToken } = useToken();
  const { location } = useForeGroundLocation();

  if (location) {
    const script = `
      window.coords = "${location}";
      true;
    `;

    webviewRef.current.injectJavaScript(script);
  }

  const handleMessage = ({ nativeEvent }) => {
    const messageFromWebView = nativeEvent.data;

    if (messageFromWebView.includes("token")) {
      const token = messageFromWebView.split(" ")[1];

      setToken(token);
    }
  };

  return (
    <Screen>
      <WebView
        source={{
          uri: "http://192.168.0.29:3000/",
        }}
        ref={webviewRef}
        onMessage={handleMessage}
        injectedJavaScript={script}
      />
    </Screen>
  );
}

export default HomeScreen;
