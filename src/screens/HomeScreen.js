import { useEffect, useRef, useState } from "react";
import { WebView } from "react-native-webview";
import * as ImagePicker from "expo-image-picker";
import { BackHandler } from "react-native";

import Screen from "../components/Screen";
import useForeGroundLocation from "../hooks/useForeGroundLocation";
import useToken from "../hooks/useToken";

function HomeScreen() {
  const webviewRef = useRef();

  const [base64, setBase64] = useState("");
  const [navState, setNavState] = useState({});

  const { script, setToken } = useToken();
  const { longitude, latitude } = useForeGroundLocation();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.3,
      base64: true,
    });

    if (!result.cancelled) {
      setBase64(result.base64);
    }
  };

  const handleMessage = ({ nativeEvent }) => {
    const messageFromWebView = nativeEvent.data;

    if (messageFromWebView.includes("token")) {
      const token = messageFromWebView.split(" ")[1];

      return setToken(token);
    }

    if (messageFromWebView === "open gallery") {
      pickImage();
    }

    if (messageFromWebView === "navigationStateChange") {
      setNavState(nativeEvent);
    }
  };

  useEffect(() => {
    webviewRef.current.injectJavaScript(script);
  }, [script]);

  useEffect(() => {
    webviewRef.current.injectJavaScript(`
      window.longitude = "${longitude}";
      window.latitude = "${latitude}";
      true;
    `);
  }, [longitude, latitude]);

  useEffect(() => {
    webviewRef.current.injectJavaScript(`
      window.base64 = "${base64}";
      true;
    `);
  }, [base64]);

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
        source={{
          uri: "http://192.168.0.35:3000/",
        }}
        ref={webviewRef}
        onMessage={handleMessage}
        injectedJavaScript={script}
        onNavigationStateChange={setNavState}
      />
    </Screen>
  );
}

export default HomeScreen;
