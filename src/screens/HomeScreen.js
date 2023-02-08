import React, {useState} from "react";
import {Text, StyleSheet, View, Button, TouchableOpacity} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const HomeScreen = (props) => {
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };
    const showMode = (currentMode) => {
        if (Platform.OS === 'android') {
            setShow(false);
            // for iOS, add a button that closes the picker
        }
        setMode(currentMode);
    };
    const showDatepicker = () => {
        showMode('date');
        setShow(true);
    };

    const showTimepicker = () => {
        showMode('time');
        setShow(true);
    };
    return (<View>
        <Text style={styles.text}>HomeScreen</Text>
        <Button title="Go to Components Demo" onPress={() => {props.navigation.navigate('Components')}}/>
        <TouchableOpacity onPress={() => props.navigation.navigate('List')}>
            <Text>Go to List Demo</Text>
        </TouchableOpacity>
            <View>
                <Button onPress={showDatepicker} title="Show date picker!" />
                <Button onPress={showTimepicker} title="Show time picker!" />
                <Text>selected: {date.toLocaleString()}</Text>
                <Text>{show.toString()}</Text>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        onChange={onChange}
                    />
                )}
            </View>
    </View>



    )
        ;
};

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
    },
});

export default HomeScreen;