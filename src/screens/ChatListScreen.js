import { Text, View } from "react-native";
import { WebView } from "react-native-webview";

import Screen from "../components/Screen";

function ChatListScreen() {
  return (
    <Screen>
      <Text>이 곳은 채팅 목록입니다.</Text>
      <View style={{ width: "100%", height: "100%" }}>
        <WebView source={{ uri: "https://naver.com" }} />
      </View>
    </Screen>
  );
}

export default ChatListScreen;
