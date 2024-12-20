import {View, Text, Button, StyleSheet, TextInput, Alert, useColorScheme} from "react-native";
import styled from "styled-components/native";
import {useState} from "react";
import {useForm, Controller} from "react-hook-form";
import Constants from 'expo-constants';
import {fetchAuth, fetchRecoverPassword, selectIsAuth} from "../../../redux/slices/auth";
import {useDispatch, useSelector} from "react-redux";
import * as SecureStore from "expo-secure-store";
import {useTranslation} from "react-i18next";


const RegContainer = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 30%;
    background-color: #D0CECE;
    width: 80%;
    border-radius: 15px;
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
export const RecoverPassword = ({navigation}) => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const currentTheme = useColorScheme()
    const {t} = useTranslation();

    const {register, setValue, handleSubmit, setError, control, reset, formState: {errors, isValid},} = useForm({
        defaultValues: {
            email: 'test@test.ru',
            password: '112123',
        },
    })
    const styles = StyleSheet.create({
        label: {
            color: currentTheme === "dark" ? 'white' : 'black',
            marginTop: 20,
            marginLeft: 10,
            fontWeight:"bold",
            alignSelf:"flex-start"
        },
        button: {
            marginTop: 40,
            height: 40,
            backgroundColor: 'rgba(242,242,242,0.79)',
            borderRadius: 4,
            marginBottom:10
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
        console.log(values)
        // console.log("?????????????????????????????")
        const data = await dispatch(fetchRecoverPassword(values));
        console.log(data.payload.message)
        if (!data.payload) {
            // console.log("No payload user no reg")
            Alert.alert("Неверный пароль или почта")
        }
        if (data.payload){
            Alert.alert(data.payload.message)
        }

    }
    if (isAuth) {
        navigation.navigate("Account")
    }


    const [emailText, onChangeEmailText] = useState()
    const [passwordText, onChangepasswordText] = useState()


    return (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>

            <RegContainer>
                <Text style={{marginTop:10,fontSize: 24, color: currentTheme === "dark" ? 'white' : 'black'}}>
                    {t('Recover Password')}
                </Text>
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
                    rules={{required: true}}
                />
                {errors.password && <Text style={styles.err}>{t('PasswordIsReq')}</Text>}
                <View style={styles.button}>
                    <Button

                        color="black"
                        title={t('RecPassButton')}
                        onPress={handleSubmit(onSubmit)}
                    />
                </View>
            </RegContainer>
        </View>
    )
}


