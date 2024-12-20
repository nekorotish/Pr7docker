import {Alert, Button, StyleSheet, Text, TextInput, useColorScheme, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {fetchChangeProfileData, selectIsAuth} from "../../../redux/slices/auth";
import {Controller, useForm} from "react-hook-form";
import {SafeAreaView, ScrollView} from "react-native";
import styled from "styled-components/native";
import {useTranslation} from "react-i18next";
import Constants from "expo-constants";

const RegContainer = styled.View`
    flex-direction: column;
    align-items: start;
    margin-left: 15px;
    margin-right: 15px;
`

export const ChangeProfileData = ({navigation}) => {
    const currentTheme = useColorScheme()
    const userData = useSelector((state) => state.auth.data);
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const MainTitle = styled.Text`
        margin-top: 15px;
        margin-left: 15px;
        flex-direction: row;
        align-items: center;
        font-size: 20px;
        font-weight: bold;
        color: ${currentTheme === "dark" ? 'white' : 'black'};

    `;

    const styles = StyleSheet.create({
        label: {
            color: currentTheme === "dark" ? 'white' : 'black',
            marginLeft: 0,
            marginTop: 15,
            marginBottom: -10
        },
        button: {
            marginTop: 40,
            height: 40,
            backgroundColor: '#d2d2d2',
            borderRadius: 4,
            width: '100%',
        },
        container: {
            flex: 1,
            justifyContent: 'center',
            paddingTop: Constants.statusBarHeight,
            padding: 8,
            backgroundColor: '#0e101c',
        },
        input: {
            borderBottomWidth: 1,
            borderBottomColor: currentTheme === "dark" ? 'white' : 'black',
            borderBottomStyle: 'solid',
            height: 40,
            width: '100%',
            padding: 10,
            borderRadius: 4,
            color: currentTheme === "dark" ? 'white' : 'black',
        },
    });

    useEffect(() => {

        setValue('email', userData.email);
        setValue('fullName', userData.fullName);
        setValue('_id', userData._id);

    }, []);

    const {register, setValue, handleSubmit, setError, control, reset, formState: {errors, isValid},} = useForm({
        defaultValues: {
            _id: '',
            email: '',
            fullName: '',
        },

    });
    const onSubmit = async (values) => {
        if(values.fullName === ' '){
            Alert.alert("Please enter a valid fullName");
        }
        else {
            console.log(values)
            const res = await dispatch(fetchChangeProfileData(values))
            // console.log(res.error.message)
            // console.log(res)
            if(res.error.message){
                console.log(1)
                // Alert.alert("Данные были изменены")
                Alert.alert(t('EmailSwitchErr'))

            }
        }



    }



    return(
        <SafeAreaView style={{flex:1}}>
            <ScrollView>
                <MainTitle>
                    {t('Profile data')}
                </MainTitle>
                <RegContainer>
                    <Text style={styles.label}>{t('Email')}</Text>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                placeholder={t('Email')}
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="email"
                        rules={{required: true, pattern: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/}}
                    />
                    <Text style={styles.label}>{t('Firstname')}</Text>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                placeholder={t('Firstname')}
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="fullName"
                        rules={{required: true,minLength: 2,pattern: {
                                value: /^.*[a-zA-Zа-яА-Я]+.*$/,
                                message: 'Поле должно содержать хотя бы одну букву',
                            },}}
                    />
                    <View style={styles.button}>
                        <Button
                            disabled={!isValid}
                            color="black"
                            title={t('Change Profile Data')}
                            onPress={handleSubmit(onSubmit)}
                        />
                    </View>
                </RegContainer>
            </ScrollView>
        </SafeAreaView>
    )
}