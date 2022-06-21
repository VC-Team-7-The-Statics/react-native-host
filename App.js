import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Foundation } from "@expo/vector-icons";

import HomeScreen from "./src/screens/HomeScreen";
import ChatListStackNavigator from "./src/navigation/ChatListtackNavigation";
import ProfileStackNavigator from "./src/navigation/ProfileStackNavigation";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{ headerShown: false, tabBarShowLabel: false }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Foundation
                name="home"
                size={24}
                style={{ color: focused ? "#47a4ff" : "#d7d7d7" }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="ChatStack"
          component={ChatListStackNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <Foundation
                name="comment"
                size={24}
                style={{ color: focused ? "#47a4ff" : "#d7d7d7" }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="ProfileStack"
          component={ProfileStackNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <Foundation
                name="torso"
                size={24}
                style={{ color: focused ? "#47a4ff" : "#d7d7d7" }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
