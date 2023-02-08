import React from 'react';
import theme from '../../styles/styles'
import {
    Container,
    Name
} from './styles';


export function Accessory({name, icon, ...rest}) {
    console.log(name);
    console.log(icon);

    return (
        <Container {...rest}>
            <icon
                width={32}
                height={32}
                fill={theme.colors.header}
            />
            <Name>{name}</Name>
        </Container>
    );
}