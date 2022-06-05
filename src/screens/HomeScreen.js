import { useRef } from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import Screen from "../components/Screen";

function HomeScreen() {
  const webviewRef = useRef();

  return (
    <Screen>
      <View style={{ width: "100%", height: "100%" }}>
        <WebView
          source={{
            uri: "https://629b04d5ac0b813c98a5a8a4--preeminent-licorice-96005b.netlify.app/",
          }}
          ref={webviewRef}
        />
      </View>
    </Screen>
  );
}

export default HomeScreen;
