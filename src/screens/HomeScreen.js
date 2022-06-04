import { View } from "react-native";
import { WebView } from "react-native-webview";
import Screen from "../components/Screen";

function HomeScreen() {
  return (
    <Screen>
      <View style={{ width: "100%", height: "100%" }}>
        <WebView source={{ uri: "https://google.com" }} />
      </View>
    </Screen>
  );
}

export default HomeScreen;
