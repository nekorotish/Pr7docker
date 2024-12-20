import {useDispatch, useSelector} from "react-redux";
import {Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View} from "react-native";
import styled from "styled-components/native";
import React from "react";
import {Controller, useForm} from "react-hook-form";
import Constants from "expo-constants";
import axios from "../axios";
import {useTranslation} from "react-i18next";
const RegContainer = styled.View`
    flex-direction: column;
    align-items: start;
    margin-left: 15px;
`
export const ReportPost = ({route,navigation}) => {
    const userData = useSelector((state) => state.auth.data);
    const dispatch = useDispatch();
    const currentTheme = useColorScheme()
    const {id} = route.params;
    const {t} = useTranslation();

    const MainTitle = styled.Text`
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
            width: 363,
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
            width: 363,
            padding: 10,
            borderRadius: 4,
        },
    });


    const {register, setValue, handleSubmit, setError, control, reset, formState: {errors, isValid},} = useForm({
        defaultValues: {

            reportText: '',
            // avatarUrl: 'https://images.unsplash.com/photo-1624337851647-9eddc80d19f6?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            // password2: '112123',
        },

    })
    const onSubmit = async (values) => {
        if (values.reportText === null) {
            alert(`${t('Add text for report field')}`)
        }
        else{
            const fields = {
                reason: values.reportText,
                userId: userData._id
            }
            // console.log(values.reportText)
            // console.log(userData._id)
            // console.log(fields)
            // console.log("////////////////////\n");

            const dataPost = await axios.post(`/postgresql/posts/report/${id}`, fields)
            console.log(dataPost)
            // console.log("////////////////////\n");
            navigation.goBack();


        }

    }

    return (
        <SafeAreaView>
            <ScrollView>
                <RegContainer>
                    <Text style={styles.label}>{t('Write the result of the rule violation report.')}</Text>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="reportText"
                        rules={{required: true,minLength: 8,pattern: {
                                value: /^.*[a-zA-Zа-яА-Я]+.*$/,
                                message: 'Поле должно содержать хотя бы одну букву',
                            }}}
                    />
                    <View style={styles.button}>
                        <Button
                            disabled={!isValid}
                            color="black"
                            title={t('Send Report')}
                            onPress={handleSubmit(onSubmit)}
                        />
                    </View>
                </RegContainer>
            </ScrollView>
        </SafeAreaView>
    )
}
