import { useEffect, useRef } from "react";
import { BackHandler } from "react-native";
import { WebView } from "react-native-webview";

import Screen from "../components/Screen";
import useToken from "../hooks/useToken";

function ChatListScreen() {
  const webviewRef = useRef();

  const { script, setToken } = useToken();

  const handleMessage = ({ nativeEvent }) => {
    const messageFromWebView = nativeEvent.data;

    if (messageFromWebView.includes("token")) {
      const token = messageFromWebView.split(" ")[1];

      return setToken(token);
    }
  };

  useEffect(() => {
    webviewRef.current.injectJavaScript(script);
  }, [script]);

  useEffect(() => {
    const handleBackButtonPress = () => {
      if (webviewRef.current) {
        webviewRef.current.goBack();
        return true;
      }

      return false;
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackButtonPress);

    return () =>
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonPress
      );
  }, []);

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
