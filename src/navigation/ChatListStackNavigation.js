import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ChatListScreen from "../screens/ChatListScreen";
import ChatRoomScreen from "../screens/ChatRoomScreen";

const Stack = createNativeStackNavigator();

const ChatListStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ChatList"
      component={ChatListScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ChatRoom"
      component={ChatRoomScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default ChatListStackNavigator;
