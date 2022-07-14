import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';

const Splashscreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Root');
        }, 3000); //eslint-disable-next-line
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image
                style={{
                    width: 250,
                    height: 150,
                    marginBottom: 15,
                }}
                source={require('../assets/logo.png')}
            />
            <Text style={{ color: 'gray', fontStyle: 'italic', fontSize: 12 }}>
                a creative idea by
            </Text>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14 }}>
                Ustadzah Nur Hayati
            </Text>
            <Text style={{ color: 'gray', fontStyle: 'italic', fontSize: 12 }}>
                (founder of Griya An-Nur)
            </Text>
        </View>
    );
};

export default Splashscreen;
