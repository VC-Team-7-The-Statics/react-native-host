import { useRef } from "react";
import { WebView } from "react-native-webview";

import Screen from "../components/Screen";
import useToken from "../hooks/useToken";

function ChatListScreen() {
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
        source={{ uri: "https://cosmic-semolina-b6e8c3.netlify.app" }}
        ref={webviewRef}
        onMessage={handleMessage}
        injectedJavaScript={script}
      />
    </Screen>
  );
}

export default ChatListScreen;
