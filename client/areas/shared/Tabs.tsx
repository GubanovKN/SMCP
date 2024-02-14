import HomeScreen from "./HomeScreen";
import SettingsScreen from "./SettingsScreen";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createMaterialBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="stations"
      shifting={true}
      activeColor="red"
      activeIndicatorStyle={{ backgroundColor: "transparent" }}
      barStyle={{
        backgroundColor: "white",
        borderTopColor: "red",
        borderTopWidth: 1,
      }}
    >
      <Tab.Screen
        name="stations"
        component={HomeScreen}
        options={{
          tabBarLabel: "Станции",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="fuel-cell" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="transactions"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Зарядки",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="battery-charging-high"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="statistic"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Статистика",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Профиль",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Tabs;
