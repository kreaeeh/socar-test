import {View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity, Button} from "react-native";
import {Car} from "./Car/Car";
import CarListData from "../../services/server.json"
import {child, get, getDatabase, ref} from "firebase/database";
import { getFirestore } from "firebase/firestore";
import app from '../../firebaseConfig';

const db = getFirestore(app);



import React, {useState} from "react";
import {CarDetails} from "../screens/CarDetails";







const CarsListingScreen = (props) => {

    const [carList, setCarList] = useState([]);

    const dbRef = ref(getDatabase());
    get(child(dbRef, `cars`)).then((snapshot) => {
        if (snapshot.exists()) {
            setCarList(snapshot.val());
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });








    const CarList = carList;
    return(<View>
            <FlatList
                data={CarList}
                keyExtractor={(item, index) => item.id}
                renderItem={(item)=>{
                    return(
                        <TouchableOpacity onPress={() => {
                                props.navigation.navigate('CarDetails', {
                                    carKey: `${item.item.id}`})}}>
                            <Car data={item}/>
                        </TouchableOpacity>
                    )
                }
                }/>
    </View>
            )

}

export default CarsListingScreen