import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import {
    Container,
    Details,
    Brand,
    Name,
    About,
    Rent,
    Location,
    Price,
    Type,
    CarImage
} from './styles';




export function Car(props){
    const data = props.data.item;
    const MotorIcon = getAccessoryIcon(data.fuel_type);
    return (
        <Container >
            <Details>
                <Brand>{data.brand}</Brand>
                <Name>{data.name}</Name>

                <About>
                    <Rent>
                        <Location>{data.location?data.location.city:""}</Location>
                        <Price>{`MYR ${(data.rent&&data.rent.price)?data.rent.price:null}`}</Price>
                        <Location>{data.rent&&data.rent.period?data.rent.period:null}</Location>
                    </Rent>

                    <Type>
                    </Type>
                </About>
            </Details>

           <CarImage
                source={{ uri: data.thumbnail }}
            />
        </Container>
    );
}