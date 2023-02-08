import React, { useRef, useState } from 'react';
import { FlatList, ViewToken } from 'react-native';
import {
    CarImage, CarImageWrapper, Container,
    ImageIndexes
} from './styles';







export function ImageSlider({ imagesUrl }) {
 console.log(imagesUrl);

    return (
        <Container>


            <FlatList
                data={imagesUrl}
                keyExtractor={(item,index) => index.toString()}
                renderItem={({ item }) => (
                    <CarImageWrapper>
                        <CarImage
                            source={{
                                uri: item
                            }}
                            resizeMode="contain"
                        />
                    </CarImageWrapper>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </Container>
    );
}