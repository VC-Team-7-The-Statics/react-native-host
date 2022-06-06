import { useRef } from "react";
import { WebView } from "react-native-webview";

import Screen from "../components/Screen";
import useToken from "../hooks/useToken";

function ProfileScreen() {
  const webviewRef = useRef();

  const { script, setToken } = useToken();

  const handleMessage = ({ nativeEvent }) => {
    const messageFromWebView = nativeEvent.data;

    if (messageFromWebView.includes("token")) {
      setToken(messageFromWebView);
    }
  };

  return (
    <Screen>
      <WebView
        source={{ uri: "https://shiny-druid-4172be.netlify.app" }}
        ref={webviewRef}
        onMessage={handleMessage}
        injectedJavaScript={script}
      />
    </Screen>
  );
}

export default ProfileScreen;
