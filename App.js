import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "./src/screens/HomeScreen";
import ChatListStackNavigator from "./src/navigation/StackNavigation";
import ProfileStackNavigator from "./src/navigation/ProfileStackNavigation";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="ChatStack" component={ChatListStackNavigator} />
        <Tab.Screen name="ProfileStack" component={ProfileStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
