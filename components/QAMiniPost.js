import {
    Button,
    RefreshControl,
    StyleSheet,
    Text,
    TextInput,
    useColorScheme,
    View,
    ScrollView,
    SafeAreaView
} from "react-native";
import styled from "styled-components/native";
import axios from "../axios";
import {useDispatch, useSelector} from "react-redux";
import React, {useCallback, useEffect, useState} from "react";
import {fetchOnePost, fetchUnBanPost, fetchUpdateBannedPost, fetchUserDataSuperDuper} from "../redux/slices/posts";
import {Controller, useForm} from "react-hook-form";
import Constants from "expo-constants";
import moment from "moment/moment";
import {fetchDeleteQa, fetchQa, fetchUpdateQa} from "../redux/slices/qa";
import {selectIsAuth} from "../redux/slices/auth";
import {useTranslation} from "react-i18next";

const Card = styled.View`

    flex-direction: row;
    border-bottom-width: 1px;
    background-color: #d0cece;
    border-bottom-color: rgba(0, 0, 0, 0.1);
    border-bottom-style: solid;
    position: relative;
    height: 70px;
`
const CardImage = styled.Image`
    width: 100%;

`
const CardTitle = styled.Text`
    font-weight: 700;
    font-size: 18px;

`

const PostDetails = styled.View`
    flex-direction: column;
    position: absolute;
    bottom: 0;
    left: 0;


`
const PhotoCreator = styled.Text`
    font-size: 14px;
    margin-top: 2px;
    color: rgba(0, 0, 0, 0.4);
`

export const QAMiniPost = ({route, navigation}) => {
    const {q_id} = route.params;
    const currentTheme = useColorScheme()
    const userData = useSelector((state) => state.auth.data);
    const [isLoading, setIsLoading] = useState(false);
    const {qa} = useSelector(state => state.qa)
    const {t} = useTranslation();

    const CarddetInfo = styled.Text`
        font-size: 14px;
        margin-top: 5px;
        margin-left: 5px;



    `
    // console.log(api_url)
    // console.log(img)
    const styles2 = StyleSheet.create({
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
            width: '100%',

            padding: 10,
            borderRadius: 4,

        },
    });
    useEffect(async () => {
        setIsLoading(true)
        const data = await dispatch(fetchQa(q_id))
        setValue('a_text', data.payload.a_text);
        setValue('q_id', data.payload.q_id);

        // console.log(qa)
        setIsLoading(false)
    }, [])
    const onRefresh = useCallback(async () => {
        setIsLoading(true);
        const data = await dispatch(fetchQa(q_id))
        setValue('a_text', data.payload.a_text);
        setValue('q_id', data.payload.q_id);
        // console.log(qa)
        setIsLoading(false)

    }, []);
    const dispatch = useDispatch();
    const formattedTime = moment(qa.items.created_at).format('YYYY-MM-DD HH:mm');

    const DeleteQAPost = () => {
        dispatch(fetchDeleteQa(q_id))
        navigation.navigate("Add")
    }
    const onSubmit = (values) => {
        console.log(values)
        dispatch(fetchUpdateQa(values))
        navigation.navigate("QAPosts")
    }
    let dataid;
    if (typeof userData === 'object' && userData !== null) {
        dataid = userData._id;
    } else {
        dataid = 0;
    }
    const {register, setValue, handleSubmit, setError, control, reset, formState: {errors, isValid},} = useForm({
        defaultValues: {

            a_text: qa.items.a_text,
            q_id: qa.items.q_id,
            qa_id: dataid

            // avatarUrl: 'https://images.unsplash.com/photo-1624337851647-9eddc80d19f6?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            // password2: '112123',
        }
    })
    const isAuth = useSelector(selectIsAuth);

    if (!isAuth) {
        navigation.goBack();
    }
    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={onRefresh}/>
            }>
                <Card>


                    <PostDetails>
                        <CardTitle style={{color: "#000000"}}>

                            {qa.items.q_text}
                        </CardTitle>
                        <Text style={{color: "#000000"}}>
                            {formattedTime}
                        </Text>
                    </PostDetails>


                </Card>

                <CarddetInfo>
                    <Text style={{fontWeight: "bold", color: currentTheme === "dark" ? 'white' : 'black'}}>
                        {t('Manager answer')}
                    </Text>

                    {
                        qa.items.a_text === null ? (
                            <Text style={{color: currentTheme === "dark" ? 'white' : 'black'}}>{t('No answer')}</Text>
                        ) : (
                            <Text style={{color: currentTheme === "dark" ? 'white' : 'black'}}>{qa.items.a_text}</Text>
                        )
                    }

                </CarddetInfo>

                {
                    userData !== null ? (


                        userData.user_role_id === 3 ? (
                            <>
                                <View style={styles.view}>
                                    <View style={styles.button}>
                                        <Button title={t('Change answer')} color="black" disabled={!isValid}
                                                onPress={handleSubmit(onSubmit)}/>
                                    </View>
                                    <View style={styles.button} onTouchEndCapture={() => DeleteQAPost()}>
                                        <Button title={t('Delete Q')} color="red"/>
                                    </View>
                                </View>
                                <View style={{marginRight: 15, marginLeft: 15}}>
                                    <Text style={styles2.label}>{t('Answer for question')}</Text>
                                    <Controller
                                        control={control}
                                        render={({field: {onChange, onBlur, value}}) => (
                                            <TextInput
                                                placeholder={t('Answer for question')}
                                                style={styles2.input}
                                                onBlur={onBlur}
                                                onChangeText={value => onChange(value)}
                                                value={value}
                                            />
                                        )}
                                        name="a_text"
                                        rules={{required: true}}
                                    />
                                </View>
                            </>
                        ) : (
                            <>
                            </>
                        )
                    ) : (
                        <></>
                    )
                }
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    button: {
        marginTop: 15,
        color: 'white',
        height: 40,
        backgroundColor: '#d0cece',
        borderRadius: 4,
        width: '47%',
    },
    ban_button: {
        marginTop: 15,
        color: 'white',
        height: 40,
        backgroundColor: '#d0cece',
        borderRadius: 4,
        width: 353,
    },
    view: {
        marginLeft: 15,
        marginRight: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    data: {
        flexDirection: 'row',
        justifyContent: "flex-start",

    },
    item: {
        marginTop: 15,
        marginLeft: 15,
    },
    separator: {
        height: 1,
        backgroundColor: 'gray',
        marginVertical: 10,
    },
    tagsContainer: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    tag: {
        backgroundColor: '#d0cece',
        borderRadius: 4,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginHorizontal: 5,
    }
});
