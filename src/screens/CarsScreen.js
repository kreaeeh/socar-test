import {StyleSheet} from "react-native";
import CarsListingScreen from '../components/CarsListing'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import HistoryCarList from "../components/HistoryCarList";
const Tab = createMaterialTopTabNavigator();


const CarsScreen = (props) => {

    return<Tab.Navigator>
        <Tab.Screen name="Car" component={CarsListingScreen} />
        <Tab.Screen name="Booked" component={HistoryCarList} />
    </Tab.Navigator>
}

const styles = StyleSheet.create({});

export default CarsScreen;