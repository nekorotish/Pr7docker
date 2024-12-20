import {View, Text, Button, Image, useColorScheme} from "react-native";
import React from "react";
import i18next from "../services/i18next";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

export const IconInfo = ({navigation}) => {
    const {t} = useTranslation();
    const currentTheme = useColorScheme()
    const {api_url} = useSelector(state => state.posts)

    const changelng = lng => {
        i18next.changeLanguage(lng);
    }
    return (
        <View>
            <View style={{
                backgroundColor: "#F2F2F2",
                margin: 15,
                borderRadius: 12,
                display: "flex",
                alignItems: 'center'
            }}>
                <Image style={{marginTop: 8, width: 50, height: 50}}
                       source={{url: `${api_url}/uploads/down/unsplash_logo_icon_206651.png`}}/>
                <Text style={{fontSize: 21, marginTop: 5}}>
                    Unsplash
                </Text>
                <Text style={{marginBottom: 4, fontSize: 12, color: "#A6A4A7"}}>
                    v2024.01
                </Text>
            </View>
            <View style={{
                margin: 15,
                borderRadius: 12,
                display: "flex",
                alignItems: 'center'
            }}>
                <Text style={{fontSize:21,color: currentTheme === "dark" ? 'white' : 'black'}}>
                    Unsplash - большая библиотека фотографий от фотографов
                </Text>
            </View>

        </View>
    )
}