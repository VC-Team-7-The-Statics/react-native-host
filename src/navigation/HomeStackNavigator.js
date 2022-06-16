import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import PaymentScreen from "../screens/PaymentScreen";

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      options={{ headerShown: false }}
      component={HomeScreen}
    />
    <Stack.Screen name="Payment" component={PaymentScreen} />
  </Stack.Navigator>
);

export default HomeStackNavigator;
