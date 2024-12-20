import {Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {Controller, useForm} from "react-hook-form";
import React from "react";
import Constants from "expo-constants";
import styled from "styled-components/native";
import {fetchCreateQa} from "../../redux/slices/qa";
import {selectIsAuth} from "../../redux/slices/auth";
import {useTranslation} from "react-i18next";

const RegContainer = styled.View`
    flex-direction: column;
    align-items: start;
    margin-left: 15px;
    margin-right: 15px;
`
const ImageCont = styled.View`
    border: red;
    height: 252px;
    border-style: dashed;
`
const PostImage = styled.Image`
    border-radius: 2px;
    width: 100%;
    height: 250px;
    margin-bottom: 10px;
`;
export const QCreate = ({route, navigation}) => {
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const currentTheme = useColorScheme()
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
            color: currentTheme === "dark" ? 'white' : 'black',

            height: 40,
            width: '100%',
            padding: 10,
            borderRadius: 4,
        },
    });
    const userData = useSelector((state) => state.auth.data);
    let dataid;
    if(typeof userData === 'object' && userData !== null){
        dataid = userData._id;
    }else{
        dataid = 0;
    }
    const {register, setValue, handleSubmit, setError, control, reset, formState: {errors, isValid},} = useForm({
        defaultValues: {
            user_id: dataid,
            q_text:'',

        },

    })
    const onSubmit = async (values) => {
        console.log(values)
        dispatch(fetchCreateQa(values))
        navigation.navigate("QAPosts")
    }
    const isAuth = useSelector(selectIsAuth);

    if (!isAuth){
        navigation.goBack();
    }
    return (
        <SafeAreaView>
            <ScrollView>
                <RegContainer>
                    <Text style={styles.label}>{t('Text of question')}</Text>
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
                        name="q_text"
                        rules={{required: true,minLength: 8,pattern: {
                                value: /^.*[a-zA-Zа-яА-Я]+.*$/,
                                message: 'Поле должно содержать хотя бы одну букву',
                            }}}
                    />
                    <View style={styles.button}>
                        <Button
                            disabled={!isValid}
                            color="black"
                            title={t('Create Q')}
                            onPress={handleSubmit(onSubmit)}
                        />
                    </View>
                </RegContainer>
            </ScrollView>
        </SafeAreaView>
    )
}

