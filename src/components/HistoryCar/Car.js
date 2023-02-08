import React from 'react';
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
import moment from "moment";




export function HistoryCar(props){
    const data = props.data;
    const car= data.car;
    let status = "";
    const endDate = moment(data.endDate, 'DD-MM-YYYY');
    const startDate = moment(data.startDate, 'DD-MM-YYYY');
    const  nowDate = moment.now();

    if(endDate>nowDate && startDate > nowDate){
        status= "Upcoming";
    }else if(nowDate>endDate&&startDate<nowDate){
        status= "Completed";
    }else {
        status= "inProgress";
    }

    return (car&&<Container >
            <Details>
                <Brand>{car.brand}</Brand>
                <Name>{car.name}</Name>

                <About>
                    <Rent>
                        <Location>{status}</Location>
                        <Price>{`MYR ${(car.rent&&car.rent.price)?car.rent.price:null}`}</Price>
                        <Location>{car.rent&&car.rent.period?car.rent.period:null}</Location>
                    </Rent>

                    <Type>
                    </Type>
                </About>
            </Details>

           <CarImage
                source={{ uri: car.thumbnail }}
            />
        </Container>
    );
}