import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ChatRoomScreen from "../screens/ChatRoomScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator();

const ProfileStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ChatList"
      component={ProfileScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ChatRoom"
      component={ChatRoomScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default ProfileStackNavigator;
