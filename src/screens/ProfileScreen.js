import { View } from "react-native";
import { WebView } from "react-native-webview";

import Screen from "../components/Screen";

function ProfileScreen() {
  return (
    <Screen>
      <View style={{ width: "100%", height: "100%" }}>
        <WebView source={{ uri: "https://shiny-druid-4172be.netlify.app" }} />
      </View>
    </Screen>
  );
}

export default ProfileScreen;
