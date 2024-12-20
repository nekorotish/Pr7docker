import {View, Text, SafeAreaView, useColorScheme, TextInput, Button, StyleSheet, Alert} from "react-native";
import React from "react";
import styled from "styled-components/native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";
import {fetchRegister, selectIsAuth} from "../../redux/slices/auth";
import {Controller, useForm} from "react-hook-form";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
import {useTranslation} from "react-i18next";

const ImageCont = styled.View`
    align-self: center;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    flex: 1;
`
export const AddScreen = ({navigation}) => {
    const currentTheme = useColorScheme()
    const userData = useSelector((state) => state.auth.data);
    const {t} = useTranslation();

    const AddCard = styled.View`

        flex-direction: row;
        margin-left: 15px;
        margin-right: 15px;
        border-radius: 5px;
        height: 140px;
        margin-top: 15px;
        border-width: 3px;
        border-color: ${currentTheme === "dark" ? 'grey' : 'grey'};
        border-style: dashed;
    `
    const MainTitle = styled.Text`
        margin-left: 15px;
        flex-direction: row;
        align-items: center;
        font-size: 20px;
        font-weight: bold;
        color: ${currentTheme === "dark" ? 'white' : 'black'};

    `;
    const GoAdd = ( ) =>{
        if(userData !== null){
        navigation.navigate("CreatePost")
        }
        else{
            Alert.alert(t("You are not regist"))
        }
    }

    return (
        <SafeAreaView>
            <View onTouchEndCapture={() => GoAdd()}>


                <MainTitle>
                    {t('Contribute to Unsplash')}
                </MainTitle>
                <AddCard>
                    <ImageCont>
                        <MaterialCommunityIcons name="image-plus" size={24}
                                                color={currentTheme === "dark" ? 'white' : "black"}/>
                        <Text style={{
                            color: currentTheme === "dark" ? 'white' : "black"
                        }}>
                            {t('Upload your photo')}
                        </Text>
                    </ImageCont>

                </AddCard>

            </View>
            {
                userData !== null ? (
                    <View style={styles.view}>
                        <View style={styles.button} onTouchEndCapture={() => navigation.navigate("BanPosts")}>
                            <Button title={t("Banned Posts")} color="black"/>
                        </View>
                    </View>
                ) : (
                    <>
                    </>
                )
            }
            {
                userData !== null && userData.user_role_id !== 1  ? (
                    <View style={styles.view}>
                        <View style={styles.button} onTouchEndCapture={() => navigation.navigate("QAPosts")}>
                            <Button title={t("Q&A")} color="black"/>
                        </View>
                    </View>
                ) : (
                    <>
                    </>
                )
            }


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop: 15,
        marginRight: 15,
        color: 'white',
        height: 40,
        backgroundColor: '#d0cece',
        borderRadius: 4,
        flex: 1
    },
    view: {
        marginLeft: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});