import {
    Button,
    RefreshControl,
    StyleSheet,
    Text,
    TextInput,
    SafeAreaView,
    ScrollView,
    useColorScheme,
    View
} from "react-native";
import styled from "styled-components/native";
import axios from "../axios";
import {useDispatch, useSelector} from "react-redux";
import React, {useCallback, useEffect, useState} from "react";
import {
    fetchBannedPostDetail,
    fetchOnePost,
    fetchUnBanPost,
    fetchUpdateBannedPost,
    fetchUserDataSuperDuper
} from "../redux/slices/posts";
import {Controller, useForm} from "react-hook-form";
import Constants from "expo-constants";
import {selectIsAuth} from "../redux/slices/auth";
import {useTranslation} from "react-i18next";

const Card = styled.View`

    flex-direction: row;
    border-bottom-width: 1px;
    border-bottom-color: rgba(0, 0, 0, 0.1);
    border-bottom-style: solid;
    position: relative;
    height: 300px;
`
const CardImage = styled.Image`
    width: 100%;

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

export const MiniPost = ({route, navigation}) => {
    const {id} = route.params;
    const {api_url} = useSelector(state => state.posts)
    const {banned_post_detail} = useSelector(state => state.posts)
    const [isLoading, setIsLoading] = useState(false);
    const currentTheme = useColorScheme()
    const userData = useSelector((state) => state.auth.data);
    const {t} = useTranslation();

    const CardTitle = styled.Text`
        font-weight: 700;
        font-size: 18px;
        color: ${currentTheme === "dark" ? 'white' : 'black'};
    `
    const CarddetInfo = styled.Text`
        font-size: 14px;
        margin-top: 5px;
        margin-left: 5px;
        color: ${currentTheme === "dark" ? 'white' : 'black'};
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
    const dispatch = useDispatch();

    const UnbanPost = () => {
        dispatch(fetchUnBanPost(id))
        navigation.navigate("Add")
    }
    const onSubmit = (values) => {
        console.log(values)
        dispatch(fetchUpdateBannedPost(values))
        navigation.navigate("BanPosts")
    }

    useEffect(async () => {
        const data = await dispatch(fetchBannedPostDetail(id))
        console.log(data.payload)
        setValue('reasonofban', data.payload.reasonofban);

    }, [])
    const onRefresh = useCallback(async () => {
        setIsLoading(true);
        // setTimeout(() => {
        const data = await dispatch(fetchBannedPostDetail(id))
        setValue('reasonofban', data.payload.reasonofban);

        setIsLoading(false);
        // }, 2000);
    }, []);
    // useEffect(() => {
    //     setValue('reasonofban', reasonofban);
    // },[])

    const {register, setValue, handleSubmit, setError, control, reset, formState: {errors, isValid},} = useForm({
        defaultValues: {

            reasonofban: banned_post_detail.items.reasonofban,
            admin_id: banned_post_detail.items.admin_id,
            id: banned_post_detail.items._id,

            // avatarUrl: 'https://images.unsplash.com/photo-1624337851647-9eddc80d19f6?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            // password2: '112123',
        }
    })

    const isAuth = useSelector(selectIsAuth);

    if (!isAuth) {
        navigation.goBack();
    }
    return (
        <SafeAreaView style={{flex:1}}>
            <ScrollView refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={onRefresh}/>
            }>
                <Card>

                    {

                        <CardImage source={{uri: `${api_url}/${banned_post_detail.items.imageurl}`}}/>
                    }
                    <PostDetails>
                        <CardTitle style={{color: "#FFF"}}>

                            {banned_post_detail.items.title}
                        </CardTitle>
                        <Text style={{color: "#FFF"}}>
                            {banned_post_detail.items.text}
                        </Text>
                    </PostDetails>


                </Card>
                {
                    userData !== null ? (
                        userData.user_role_id === 1 ? (
                            <CarddetInfo>
                                <Text style={{fontWeight: "bold"}} color={currentTheme === "dark" ? 'white' : 'black'}>
                                    {t("adminId")}
                                </Text>
                                {banned_post_detail.items.admin_id}
                            </CarddetInfo>
                        ) : (
                            <></>
                        )
                    ) : (
                        <>
                        </>
                    )
                }

                <CarddetInfo>
                    <Text style={{fontWeight: "bold"}}>
                        {t("reasonofbanText")}
                    </Text>
                    {banned_post_detail.items.reasonofban}


                </CarddetInfo>
                {
                    userData !== null ? (

                        userData.user_role_id === 1 ? (
                            <>
                                <CarddetInfo>
                                    <Text style={{fontWeight: "bold"}}>
                                        {t("userId")}
                                    </Text>

                                    {banned_post_detail.items.user_id}
                                </CarddetInfo>
                                <View style={styles.view}>

                                    {/*navigation.navigate("CreatePost",{id: id})*/}
                                    {/*<View style={styles.button} onTouchEndCapture={() => navigation.navigate('AddNav',{screen: 'CreatePost', params:{id: id} })}>*/}
                                    <View style={styles.button}>
                                        <Button title={t("Edit")} color="black" disabled={!isValid}
                                                onPress={handleSubmit(onSubmit)}/>
                                    </View>
                                    <View style={styles.button} onTouchEndCapture={() => UnbanPost()}>
                                        <Button title={t("Unban photos")} color="red"/>
                                    </View>
                                </View>
                                <View style={{marginLeft: 15, marginRight: 15}}>
                                    <Text style={styles2.label}>{t("Reason of ban")}</Text>
                                    <Controller
                                        control={control}
                                        render={({field: {onChange, onBlur, value}}) => (
                                            <TextInput
                                                placeholder={t("Reason of ban")}
                                                style={styles2.input}
                                                onBlur={onBlur}
                                                onChangeText={value => onChange(value)}
                                                value={value}
                                            />
                                        )}
                                        name="reasonofban"
                                        rules={{required: true, minLength: 8,pattern: {
                                                value: /^.*[a-zA-Zа-яА-Я]+.*$/}}}
                                    />
                                </View>
                            </>
                        ) : (
                            <>
                            </>
                        )
                    ) : (
                        <>
                        </>
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
        width: '100%',
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
