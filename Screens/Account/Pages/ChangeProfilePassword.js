import {Alert, Button, StyleSheet, Text, TextInput, useColorScheme, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {fetchChangePassword, fetchChangeProfileData, selectIsAuth} from "../../../redux/slices/auth";
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

export const ChangeProfilePassword = ({navigation}) => {
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
        setValue('_id', userData._id);

    }, []);

    const {register, setValue, handleSubmit, setError, control, reset, formState: {errors, isValid},} = useForm({
        defaultValues: {
            _id: '',
            passwordhash: '',
            passwordhash2: '',
        },

    });
    const onSubmit = async (values) => {
        console.log(values)
        if(values.passwordhash === values.passwordhash2){
            // console.log("good")
            const res = await dispatch(fetchChangePassword(values))
            console.log(res)
            console.log(res.meta.requestStatus)
            if(res.meta.requestStatus === 'fulfilled'){
                Alert.alert(t("Password was changed"))
            }
            else{
                Alert.alert(t("Error"))
            }
        }
        else{
            Alert.alert(t("Wrong Password Title"),t("Wrong Password Text"))
        }

        // dispatch(fetchChangeProfileData(values))
    }



    return(
        <SafeAreaView style={{flex:1}}>
            <ScrollView>
                <MainTitle>
                    {t('Profile password')}
                </MainTitle>
                <RegContainer>
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
                        name="passwordhash"
                        rules={{required: true ,minLength: 8,pattern: {
                            value: /^.*[a-zA-Zа-яА-Я]+.*$/,
                            message: 'Поле должно содержать хотя бы одну букву',
                        }}}
                    />
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
                        name="passwordhash2"
                        rules={{required: true ,minLength: 8,pattern: {
                                value: /^.*[a-zA-Zа-яА-Я]+.*$/,
                                message: 'Поле должно содержать хотя бы одну букву',
                            }}}
                    />
                    <View style={styles.button}>
                        <Button
                            disabled={!isValid}
                            color="black"
                            title={t('Change Profile password')}
                            onPress={handleSubmit(onSubmit)}
                        />
                    </View>
                </RegContainer>
            </ScrollView>
        </SafeAreaView>
    )
}