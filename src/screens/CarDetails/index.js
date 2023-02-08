import { useNetInfo } from '@react-native-community/netinfo';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {Button, StatusBar, StyleSheet, View, Image,Text} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import * as DateUtil from '../../utils/DateUtil'
import Animated, {
    Extrapolate, interpolate, useAnimatedScrollHandler,
    useAnimatedStyle, useSharedValue
} from 'react-native-reanimated';
import theme from '../../styles/styles';
//TODO Get accessories ICONS and load them properly
/*
import { Accessory } from '../../components/Accessory';
*/
/*
import { BackButton } from '../../components/BackButton';
*/
import { ImageSlider } from '../../components/ImageSlider';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { getDatabase, ref, child, push, set } from "firebase/database";

import {
    About,
    Accessories, Brand, CarImages, Container, DateText, Description, Details, Footer, Header, Name, OfflineInfo, Period,
    Price, Rent
} from './styles';

import mockData from "../../../services/server.json"
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";




const getRentalInDays = (endDate, startDate) => {
    if(startDate&&endDate) {
        let difference = endDate.getTime() - startDate.getTime();
        let TotalDays = Math.ceil(difference / (1000 * 3600 * 24)) + 1;
        return TotalDays;
    }
    else {
        return null;
    }
}


export function CarDetails(props) {
    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const goback = () => {
        props.navigation.goBack();
    }
    let carKey = "";
let cars = mockData.cars;
    if(props.route.params){
        carKey = props.route.params.carKey;
    }
    let car = {};
    if(carKey){
        const [key, item] = Object.entries(cars).find(([id, item]) => item.id === carKey);
        car = item;
    }


    const netInfo = useNetInfo();
    const navigation = useNavigation();
    const route = useRoute();


    const scrollY = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler(event => {
        scrollY.value = event.contentOffset.y;
    });

    const headerStyleAnimation = useAnimatedStyle(() => {
        return {
            height: interpolate(
                scrollY.value,
                [0, 200],
                [200, 70],
                Extrapolate.CLAMP
            ),
        }
    });

    const sliderCarsStyleAnimation = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrollY.value,
                [0, 150],
                [1, 0],
                Extrapolate.CLAMP
            )
        }
    });

    function handleConfirmRental() {
        // Get booked days
        // Store Reservation
        const dates = DateUtil.getDates(startDate,endDate);

        const payload = {
            startDate:moment(startDate).format("DD/MM/YYYY"),
            endDate:moment(endDate).format("DD/MM/YYYY"),
            car:car,
            user_id:1
        }
        const db = getDatabase();

        push(ref(db, 'schedules_byuser'), payload).then((tx) => {
            goback();
        });



    }

    function handleBack() {
        navigation.goBack();
    }
    const addDays = (date, days) => {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    const showStartDatePicker = () => {
        setStartDatePickerVisibility(true);
    };
    const showEndtDatePicker = () => {
        setEndDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const onChange = (event, selectedDate) => {
        const currentDate = new Date(selectedDate);
        if(isStartDatePickerVisible){
            setStartDate(currentDate);
            setStartDatePickerVisibility(false);

        }else if (isEndDatePickerVisible){
            setEndDate(currentDate);
            setEndDatePickerVisibility(false);

        }
    };
    return (
        <Container>
            <StatusBar
                barStyle="dark-content"
                translucent
                backgroundColor="transparent"
            />

            <Animated.View
                style={[
                    headerStyleAnimation,
                    styles.header,
                    { backgroundColor: theme.colors.background_secondary }
                ]}
            >
                <Header>
{/*
                    <BackButton onPress={handleBack} />
*/}
                </Header>

                <Animated.View style={sliderCarsStyleAnimation}>
                    <CarImages>
                       <ImageSlider
                            imagesUrl={
                                !!car.photos ?
                                    car.photos : [car.thumbnail ]
                            }
                        />

                    </CarImages>
                </Animated.View>
            </Animated.View>

            <Animated.ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingTop: getStatusBarHeight() + 160,
                }}
                showsVerticalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            >
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>

                    <Rent>
                        <Period>{getRentalInDays(endDate,startDate)} Days</Period>
                        <Price>MYR {netInfo.isConnected === true && car.rent&&car.rent.price? car.rent.price* getRentalInDays(endDate,startDate) : '...'}</Price>
                    </Rent>
                </Details>

                {

                    car.accessories &&


                    <Accessories>
                        {
                            car.accessories.map(accessory => (
                                <View>
                                    <Text style={styles.acc_label}>{accessory.name}</Text>
                                </View>
                            ))
                        }
                    </Accessories>
                }

                <About>
                    {car.about}
                </About>

            </Animated.ScrollView>
            {(isStartDatePickerVisible||isEndDatePickerVisible)&&(<DateTimePicker
                testID="dateTimePicker"
                minimumDate={isEndDatePickerVisible?startDate:new Date()}
                value={startDate}
                onChange={onChange}
                negativeButton={{label: 'Cancel', textColor: 'red'}}
            />)}

            <DateText>Start Date: {startDate?startDate.toDateString():""}</DateText>
            <DateText>End Date: {endDate?endDate.toDateString():""}</DateText>


            <View style={{flexDirection:"row",marginLeft:20}}>
                <Button
                    style={styles.btn}
                    title="Set Start Date"
                    onPress={showStartDatePicker}
                    enabled={netInfo.isConnected === true}
                />
                <Button
                    style={styles.btn}
                    title="Set End Date"
                    onPress={showEndtDatePicker}
                    enabled={netInfo.isConnected === true}
                />
            </View>
            <Footer>
                <Button
                    title="Confirm"
                    onPress={handleConfirmRental}
                    enabled={netInfo.isConnected === true}
                />

                {
                    netInfo.isConnected === false &&
                    <OfflineInfo>
                        No internet Connection!
                    </OfflineInfo>
                }
            </Footer>
        </Container>
    );
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        overflow: 'hidden',
        zIndex: 1,
    },
    acc_label: {backgroundColor:'#e7e7e7'},
    btn:{width:50,backgroundColor:'rgba(52, 52, 52, 0.8)'}
})