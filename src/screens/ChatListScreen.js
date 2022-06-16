import { useEffect, useRef, useState } from "react";
import { BackHandler } from "react-native";
import { WebView } from "react-native-webview";

import getEnvVars from "../../secrets";
import Screen from "../components/Screen";
import useToken from "../hooks/useToken";

const { CHAT_SCREEN_URL } = getEnvVars();

function ChatListScreen({ navigation }) {
  const webviewRef = useRef();

  const [navState, setNavState] = useState({});

  const { script, setToken } = useToken();

  const handleMessage = ({ nativeEvent }) => {
    const messageFromWebView = nativeEvent.data;

    if (messageFromWebView.includes("token")) {
      const token = messageFromWebView.split(" ")[1];

      return setToken(token);
    }

    if (messageFromWebView === "navigationStateChange") {
      return setNavState(nativeEvent);
    }

    const parsedMessage = JSON.parse(messageFromWebView);

    if (parsedMessage.type === "CHATROOM") {
      navigation.navigate("ChatRoom", {
        userId: parsedMessage.userId,
        roomId: parsedMessage.roomId,
        friendId: parsedMessage.friendId,
        friendImage: parsedMessage.friendImage,
        friendName: parsedMessage.friendName,
      });
    }
  };

  useEffect(() => {
    webviewRef.current.injectJavaScript(script);
  }, [script]);

  useEffect(() => {
    const handleBackButtonPress = () => {
      if (webviewRef.current && navState.canGoBack) {
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
  }, [navState.canGoBack]);

  return (
    <Screen>
      <WebView
        source={{ uri: CHAT_SCREEN_URL }}
        ref={webviewRef}
        onMessage={handleMessage}
        injectedJavaScript={script}
        onNavigationStateChange={setNavState}
      />
    </Screen>
  );
}

export default ChatListScreen;
