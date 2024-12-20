import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import {useSelector} from "react-redux";

export const CircleImage = ({img}) => {
    const {api_url} = useSelector(state => state.posts)

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{ uri: `${api_url}/${img}` }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginLeft: 15,
        marginTop: 15,
        width: 125,
        height: 125,
        borderRadius: 60,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
