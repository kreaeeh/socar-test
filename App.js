import { createStackNavigator } from '@react-navigation/stack';
import ComponentsScreen from "./src/screens/ComponentsScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import bottomTabBarIconSelecter from "./src/utils/bottom-tab-bar-icon-selecter";
import CarsScreen from "./src/screens/CarsScreen";
import {CarDetails} from "./src/screens/CarDetails";



const CarStack = createStackNavigator();
function CarStackScreen() {
    return (
        <CarStack.Navigator screenOptions={() => ({
            headerShown: false,
        })}>
            <CarStack.Screen name="CarsList" component={CarsScreen}  />
            <CarStack.Screen name="CarDetails" component={CarDetails} />
        </CarStack.Navigator>
    );
}
const Tab = createBottomTabNavigator();
const App = () => {
    return (
            <NavigationContainer>
            <Tab.Navigator screenOptions={({ route }) => bottomTabBarIconSelecter(route)}>

                <Tab.Screen name="Home" component={ComponentsScreen}  options={{tabBarShowLabel: false,}}/>
                <Tab.Screen name="Cars" component={CarStackScreen} options={{tabBarShowLabel: false,}}/>
                <Tab.Screen name="Profile" component={ComponentsScreen} options={{tabBarShowLabel: false,}}/>
                <Tab.Screen name="Settings" component={ComponentsScreen} options={{tabBarShowLabel: false,}}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}


export default App;