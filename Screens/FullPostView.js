import {
    ActivityIndicator,
    Alert,
    Button,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Platform, RefreshControl

} from "react-native";
import styled from "styled-components/native"
import React, {useCallback, useEffect, useState} from "react";
import axios from "../axios";
import {Loading} from "../components/Loading";
import {AntDesign, Feather, Ionicons} from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";

import * as FileSystem from 'expo-file-system';
import {shareAsync} from 'expo-sharing';
import {
    fetchDisLikePost,
    fetchLikePost,
    fetchOnePost,
    fetchRemovePost,
    fetchUserData,
    fetchUserDataSuperDuper
} from "../redux/slices/posts";
import {useTranslation} from "react-i18next";
import i18next from "../services/i18next";

const PostImage = styled.Image`
    border-radius: 10px;
    width: 100%;
    height: 250px;
    margin-bottom: 20px;
`;
const formatDate = (rawDate) => {
    const dateObject = new Date(rawDate);
    const options = {day: 'numeric', month: 'long', year: 'numeric'};
    if (i18next.language === 'en') {

        return dateObject.toLocaleDateString('en-US', options);
    }
    else{
        return dateObject.toLocaleDateString('ru-RU', options);

    }};


export const FullPostView = ({route, navigation}) => {
    const dispatch = useDispatch();
    const {id, likedList, user_id_get} = route.params;
    const [name, setName] = useState('like2');
    const [isLoading, setIsLoading] = useState(false);
    const userData = useSelector((state) => state.auth.data);
    const {items, status} = useSelector((state) => state.posts.one_posts);
    const {user_data_get} = useSelector((state) => state.posts.get_user);
    // const {one_posts_tags} = useSelector((state) => state.posts.one_posts.items.tags);
    const {api_url} = useSelector(state => state.posts)
    const formattedDate = formatDate(items.createdAt);
    // console.log(user_id_get)
    const {t} = useTranslation();

    // console.log(id)
    // console.log(titleOf)
    const currentTheme = useColorScheme()

    const PostText = styled.Text`
        font-size: 18px;
        line-height: 24px;
        color: ${currentTheme === "dark" ? 'white' : 'black'};


    `;
    const MiniText = styled.Text`
        font-size: 14px;

        color: ${currentTheme === "dark" ? 'white' : 'black'};


    `;
    const MiniTitle = styled.Text`
        font-size: 12px;
        margin-top: 8px;
        color: ${currentTheme === "dark" ? `white` : `black`};


    `;
    React.useEffect(async () => {
        // console.log("loading")
        // console.log(id)
        // dispatch(fetchUserDataSuperDuper(user_id_get))

        // dispatch(fetchUserDataSuperDuper(user_id_get))
        const post_data = await dispatch(fetchOnePost(id))
        if (post_data.payload.likedby && post_data.payload.likedby.includes(userData._id)) {
            setName('like1')
        }

    }, []);
    const onRefresh = useCallback(async () => {
        setIsLoading(true);
        setTimeout(async () => {
            dispatch(fetchUserDataSuperDuper(user_id_get))
            const post_data = await dispatch(fetchOnePost(id))
            if (post_data.payload.likedby && post_data.payload.likedby.includes(userData._id)) {
                setName('like1')
            }
        }, 2000);
    }, []);
    if (status === 'loading') {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Loading/>
            </View>
        );
    }
    // console.log("łl1ll1l1l1l1ll1l1l1ll1l1l1l1l1l1ll1l1l1l1l1ll1lłl1l1l1l1l1l1l")
    // console.log(data)


    const downloadFromAPI = async () => {
        const filename = `${items.title}.jpeg`;
        const filenameWithoutDown = items.imageUrl.replace(/\/down\//, '/');
        // console.log(`${api_url}/${filenameWithoutDown}`)

        const result = await FileSystem.downloadAsync(
            `${api_url}/${filenameWithoutDown}`,
            FileSystem.documentDirectory + filename,
            {
                headers: {
                    "MyHeader": "MyValue"
                }
            }
        );
        // console.log(result)
        await shareAsync(result.uri);

    }
    const DeletePost = () => {
        Alert.alert(
            `${t('DeletePostTitle')}`,
            `${t('Are you sure you want to delete this photos?')}`,
            [
                {
                    text: `${t('Cancel')}`,
                    style: 'cancel',
                },
                {
                    text: `${t('Delete')}`,
                    onPress: handleDeletePost,
                },
            ],
            {cancelable: false}
        );

    }
    const handleDeletePost = () => {
        dispatch(fetchRemovePost(id))
        navigation.navigate('Home')
    }
    const ChangeMethod = () => {
        if (userData !== null) {
            if (name === "like1") {
                setName('like2')
                // console.log("##################")
                // console.log(one_posts)
                // console.log(userData._id)
                // console.log("##################")
                dispatch(fetchDisLikePost({id: items._id, userid: userData._id}));
            } else {
                setName('like1')
                dispatch(fetchLikePost({id: items._id, userid: userData._id}));
            }
        }
        else{
            Alert.alert(`${t('CantLikePost')}`)
        }

    }

    // console.log("##################")
    // //
    // console.log(`lllslslssllslsllslsllsllslsllslslslsllslsllslsllslslsllslsllslls${itemsData}`)
    // console.log("##################")
    return (
        <SafeAreaView>
            <ScrollView refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={onRefresh}/>
            }>
                <View style={{padding: 20}}>
                    {
                        // console.log(one_posts.title)
                    }
                    {/*<PostImage source={{uri: one_posts.imageUrl}}/>*/}

                    {/*<PostImage source={{uri: `http://localhost:4444/${one_posts.imageUrl}` }}/>*/}
                    {
                        // one_posts.imageUrl.startsWith('http') ? (
                        //     <PostImage source={{uri: one_posts.imageUrl}}/>
                        //
                        // ) : (
                        <PostImage source={{uri: `${api_url}/${items.imageUrl}`}}/>
                        // )
                    }
                    <View style={styles.view}>
                        <PostText>{items.title}</PostText>
                        <PostText>{t('Views')}: {items.viewsCount}</PostText>
                    </View>
                    {
                        // Подправил items.user
                        userData !== null && items.user_id === userData._id ? (
                            <View style={styles.view}>

                                {/*navigation.navigate("CreatePost",{id: id})*/}
                                {/*<View style={styles.button} onTouchEndCapture={() => navigation.navigate('AddNav',{screen: 'CreatePost', params:{id: id} })}>*/}
                                <View style={styles.button}
                                      onTouchEndCapture={() => navigation.navigate('ChangePost', {id: id})}>
                                    <Button title={t('Edit')} color="black"/>
                                </View>
                                <View style={styles.button} onTouchEndCapture={() => DeletePost()}>
                                    <Button title={t('Delete')} color="red"/>
                                </View>
                            </View>
                        ) : (
                            <></>
                        )
                    }
                    {
                        userData !== null ? (



                            userData.user_role_id === 1 && user_data_get._id !== userData._id ? (

                                <View style={styles.view}>
                                    <View style={styles.ban_button}
                                          onTouchEndCapture={() => navigation.navigate('BanPost', {id: id})}>
                                        <Button title={t('Ban Post')} color="red"/>
                                    </View>
                                </View>


                            ) : userData.user_role_id === 2 && user_data_get._id !== userData._id  ? (
                                <View style={styles.view}>
                                    <View style={styles.ban_button}
                                          onTouchEndCapture={() => navigation.navigate('ReportPost', {id: id})}>
                                        <Button title={t('Report Post')} color="red"/>
                                    </View>
                                </View>
                            ):(
                                <>
                                </>
                            )
                        ) : (
                            <>
                            </>
                        )
                    }


                    <View style={styles.data}>
                        <AntDesign style={{marginTop: 15}} name={name} size={36}
                                   color={currentTheme === "dark" ? 'white' : "black"} onPress={() => ChangeMethod()}/>
                        <Ionicons onPress={() => downloadFromAPI()} style={styles.item} name="download-outline"
                                  size={36}
                                  color={currentTheme === "dark" ? 'white' : "black"}/>
                        <Feather style={styles.item} name="plus" size={36}
                                 color={currentTheme === "dark" ? 'white' : "black"}/>

                    </View>
                    <MiniText style={{marginTop:5}}
                              color={currentTheme === "dark" ? 'white' : "black"}>{t('Likes')}: {items.likeCount}</MiniText>
                    {/*<View onTouchEndCapture={() => navigation.navigate("Account", {user_id: user_data_get._id})} style={{flexDirection: 'row', justifyContent: "flex-start",marginTop:5}}>*/}
                    {/*    <Feather name="user" size={24} color="black"/>*/}
                    {/*    <MiniText style={{marginTop: 5, marginLeft: 5}} color={currentTheme === "dark" ? 'white' : "black"}>{user_data_get.fullname}</MiniText>*/}
                    {/*    <MiniText style={{marginTop: 5, marginLeft: 5}} color={currentTheme === "dark" ? 'white' : "black"}>{user_data_get._id}</MiniText>*/}
                    {/*</View>*/}
                    <View style={styles.separator}></View>
                    <PostText>{t('Details')}</PostText>
                    <MiniText color={currentTheme === "dark" ? 'white' : "black"}>{items.text}</MiniText>
                    <View style={styles.tagsContainer}>
                        {items.tags.map((tag, index) => (
                            <View key={index} style={styles.tag}>
                                <Text>{tag}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={styles.separator}></View>
                    <View style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                        {/* Left half */}
                        <View style={{flex: 1, marginRight: 10}}>
                            <PostText>{t('Camera')}</PostText>
                            <MiniTitle color={currentTheme === 'dark' ? 'white' : 'black'}>{t('Camera Company')}</MiniTitle>
                            <MiniText style={{marginTop: 3}}
                                      color={currentTheme === 'dark' ? 'white' : 'black'}>{items.CameraCompany}</MiniText>
                            {/* Add more content for the left half as needed */}

                            <MiniTitle color={currentTheme === 'dark' ? 'white' : 'black'}>{t('Model')}</MiniTitle>
                            <MiniText style={{marginTop: 3}}
                                      color={currentTheme === 'dark' ? 'white' : 'black'}>{items.Model}</MiniText>
                            <MiniTitle color={currentTheme === 'dark' ? 'white' : 'black'}>{t('ShutterSpeed')}</MiniTitle>
                            <MiniText style={{marginTop: 3}}
                                      color={currentTheme === 'dark' ? 'white' : 'black'}>{items.ShutterSpeed}</MiniText>
                            <MiniTitle color={currentTheme === 'dark' ? 'white' : 'black'}>{t('Aperture')}</MiniTitle>
                            <MiniText style={{marginTop: 3}}
                                      color={currentTheme === 'dark' ? 'white' : 'black'}>{items.Aperture}</MiniText>

                        </View>

                        {/* Common content */}
                        <View style={{marginLeft: 'auto', marginTop: 25}}>
                            <MiniTitle color={currentTheme === 'dark' ? 'white' : 'black'}>{t('FocalLength')}</MiniTitle>
                            <MiniText style={{marginTop: 3}}
                                      color={currentTheme === 'dark' ? 'white' : 'black'}>{items.FocalLength}</MiniText>
                            <MiniTitle color={currentTheme === 'dark' ? 'white' : 'black'}>{t('Dimensions')}</MiniTitle>
                            <MiniText style={{marginTop: 3}}
                                      color={currentTheme === 'dark' ? 'white' : 'black'}>{items.Dimensions}</MiniText>
                            <MiniTitle color={currentTheme === 'dark' ? 'white' : 'black'}>{t('ISO')}</MiniTitle>
                            <MiniText style={{marginTop: 3}}
                                      color={currentTheme === 'dark' ? 'white' : 'black'}>{items.ISO}</MiniText>

                            {/* Add more common content as needed */}

                            <MiniTitle color={currentTheme === 'dark' ? 'white' : 'black'}>{t('Published')}</MiniTitle>
                            <MiniText style={{marginTop: 3}}
                                      color={currentTheme === 'dark' ? 'white' : 'black'}>{formattedDate}</MiniText>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    button: {
        marginTop: 15,
        color: 'white',
        height: 40,
        backgroundColor: '#d0cece',
        borderRadius: 4,
        width: 165,
    },
    ban_button:{
        marginTop: 15,
        color: 'white',
        height: 40,
        backgroundColor: '#d0cece',
        borderRadius: 4,
        width: 353,
    },
    view: {
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
