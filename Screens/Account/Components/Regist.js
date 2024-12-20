import {Alert, Button, StyleSheet, Text, TextInput, useColorScheme, View} from "react-native";
import styled from "styled-components/native";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchRegister, selectIsAuth} from "../../../redux/slices/auth";
import {Controller, useForm} from "react-hook-form";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
import i18next from "../../../services/i18next";
import {useTranslation} from "react-i18next";

const RegContainer = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 30%;
    background-color: #D0CECE;
    width: 80%;
    border-radius: 15px; /* add border radius */

`
const TextInputStyled = styled.TextInput`
    font-size: 18px;
    border-width: 1px;
    border-radius: 4px;
    border-color: gray;
    justify-content: start;
    width: 150px;
    height: 30px;
    padding: 5px;
`
export const Regist = ({navigation}) => {
    const currentTheme = useColorScheme()
    const [emailText, onChangeEmailText] = useState()
    const [nicknameText, onChangenicknameText] = useState()
    const [passwordText, onChangepasswordText] = useState()
    const [repeatPasswordText, onChangerepeatPasswordText] = useState()
    const {t} = useTranslation();
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const {register, setValue, handleSubmit, setError, control, reset, formState: {errors, isValid},} = useForm({
        defaultValues: {

            fullName: 'nick',
            email: 'kest@best.ru',
            password: '112123',
            // avatarUrl: 'https://images.unsplash.com/photo-1624337851647-9eddc80d19f6?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            // password2: '112123',
        }
    })

    const styles = StyleSheet.create({
        label: {
            color: currentTheme === "dark" ? 'white' : 'black',
            marginTop: 20,
            marginLeft: 10,
            fontWeight: "bold",
            alignSelf: "flex-start"


        },
        button: {
            marginTop: 40,
            height: 40,
            backgroundColor: 'rgba(242,242,242,0.79)',
            borderRadius: 4,
        },
        button2: {
            marginTop: 10,

            // backgroundColor: 'rgba(242,242,242,0.79)',
            borderRadius: 4,
            marginBottom: 10,
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
            color: currentTheme === "dark" ? 'white' : 'black',
            height: 40,
            width: '100%',
            padding: 10,
            borderRadius: 4,

        },
        err: {
            color:'red',
            marginTop:5
        },
    });
    const onChange = arg => {
        return {
            value: arg.nativeEvent.text,
        };
    };

    const onSubmit = async (values) => {
        // console.log("?????????????????????????????")
        // console.log(values)
        // console.log("?????????????????????????????")
        const data = await dispatch(fetchRegister(values));
        console.log(data)
        // console.log(`data ${data.payload} ${data.type}`)
        if (!data.payload) {
            console.log("No payload user no reg")
            Alert.alert(t('UserExists'))
        }
        // else{
        //     await SecureStore.setItemAsync('token',data.payload.token);
        // }
        // if(data.payload.token){
        //     await SecureStore.setItemAsync('token',data.payload.token);
        // }
        if (/*'token' in */data.payload.token) {
            await SecureStore.setItemAsync('token', data.payload.token);
            // console.log(data.payload.token)
            // console.log("?????????????????????????????")
        }
        // console.log(`data ${data}`)
        // console.log("?????????????????????????????")

    }
    // console.log('errors', errors);
    // console.log('isAuth', isAuth);
    if (isAuth) {
        navigation.navigate("Account")
    }
    // const changelng = lng => {
    //     i18next.changeLanguage(lng);
    // }


    return (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <RegContainer>
                <Text style={{marginTop: 10, fontSize: 24, color: currentTheme === "dark" ? 'white' : 'black'}}>
                    {t('regTitle')}
                </Text>

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
                    rules={{required: true,minLength: 2,maxLength:8,pattern: {
                        value: /^.*[a-zA-Zа-яА-Я]+.*$/
                    },}}
                />
                {errors.fullName && <Text style={styles.err}>{t('FirstnameIsReq')}</Text>}

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
                {errors.email && <Text style={styles.err}>{t('EmailIsReq')}</Text>}
                <Text style={styles.label}>{t('Password')}</Text>
                <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            placeholder={t('Password')}
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                        />
                    )}
                    name="password"
                    rules={{required: true, minLength: 8}}
                />
                {errors.password && <Text style={styles.err}>{t('PasswordIsReq')}</Text>}

                <View style={styles.button}>
                    <Button
                        disabled={!isValid}
                        color="black"
                        title={t('regButton')}
                        onPress={handleSubmit(onSubmit)}
                    />
                </View>
                <View style={styles.button2}>
                    <Button color={currentTheme === "dark" ? 'white' : 'black'} title={t('authButton')}
                            onPress={() => navigation.navigate("Login")}/>
                    {/*<Button color={currentTheme === "dark" ? 'white' : 'black'} title={"en"}*/}
                    {/*        onPress={() => changelng("en")}/>*/}
                    {/*<Button color={currentTheme === "dark" ? 'white' : 'black'} title={"rus"}*/}
                    {/*        onPress={() => changelng("rus")}/>*/}
                </View>
            </RegContainer>
        </View>
    )
}
