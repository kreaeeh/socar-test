import Ionicons from "react-native-vector-icons/Ionicons";

const bottomTabBarIconSelecter = (route) => {
    return ({
        tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
                iconName = focused
                    ? 'home-outline'
                    : 'home-outline';
            } else if (route.name === 'Cars') {
                iconName = focused ? 'car-sport' : 'car-sport-outline';
            }else if(route.name === 'Profile'){
                iconName = focused ? 'person-outline' : 'person-outline';
            }else if(route.name === 'Settings'){
                iconName = focused ? 'settings-outline' : 'settings-outline';

            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
    });
}

export default bottomTabBarIconSelecter;