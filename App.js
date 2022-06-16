import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import ChatListStackNavigator from "./src/navigation/ChatListStackNavigation";
import ProfileStackNavigator from "./src/navigation/ProfileStackNavigation";
import HomeStackNavigator from "./src/navigation/HomeStackNavigator";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="HomeStack" component={HomeStackNavigator} />
        <Tab.Screen name="ChatStack" component={ChatListStackNavigator} />
        <Tab.Screen name="ProfileStack" component={ProfileStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
