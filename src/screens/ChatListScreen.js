import { View } from "react-native";
import { WebView } from "react-native-webview";

import Screen from "../components/Screen";

function ChatListScreen() {
  return (
    <Screen>
      <View style={{ width: "100%", height: "100%" }}>
        <WebView
          source={{ uri: "https://cosmic-semolina-b6e8c3.netlify.app" }}
        />
      </View>
    </Screen>
  );
}

export default ChatListScreen;
