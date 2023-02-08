import {View, FlatList} from "react-native";
import {child, get, getDatabase, ref} from "firebase/database";



import React, {useState} from "react";
import {HistoryCar} from "./HistoryCar/Car";


const HistoryCarList = (props) => {


    const [carList, setCarList] = useState([]);


    const dbRef = ref(getDatabase());
    get(child(dbRef, `schedules_byuser`)).then((snapshot) => {
        if (snapshot.exists()) {
            const array = [];
            const obj = snapshot.val();
            Object.keys(obj).forEach((key) => {
                array.push(obj[key]);
            });
            setCarList(array);

        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });


    const CarList = carList;

    return (<View>
            {<FlatList
                data={CarList}
                keyExtractor={(item, index) => item.id}
                renderItem={(item) => {
                    return (
                        <HistoryCar data={item.item}/>
                    )
                }
                }/>}
        </View>
    )

}

export default HistoryCarList