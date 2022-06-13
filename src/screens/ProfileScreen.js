import { useEffect, useRef } from "react";
import { BackHandler } from "react-native";
import { WebView } from "react-native-webview";

import Screen from "../components/Screen";
import useToken from "../hooks/useToken";

function ProfileScreen() {
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
        source={{ uri: "http://192.168.0.29:3001/" }}
        ref={webviewRef}
        onMessage={handleMessage}
        injectedJavaScript={script}
      />
    </Screen>
  );
}

export default ProfileScreen;
