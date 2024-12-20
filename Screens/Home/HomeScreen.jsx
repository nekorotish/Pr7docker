import {StatusBar} from 'expo-status-bar';
import {
    ActivityIndicator,
    Alert, Button,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity, useColorScheme,
    View
} from 'react-native';
import styled from "styled-components/native"
import Post from "../../components/Post";
import React, {useEffect, useState} from "react";
import axios from "../../axios";
import {FullPost} from "../FullPost";
import {TabNavigation} from "../TabNavigation";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategoryPost, fetchPosts, fetchTags} from "../../redux/slices/posts";
import {useTranslation} from "react-i18next";
import * as SecureStore from "expo-secure-store";


export const HomeScreen = ({route,navigation}) => {
    const currentTheme = useColorScheme()

    const dispatch = useDispatch();
    const {posts, tags} = useSelector(state => state.posts);
    const {monochromatic_posts} = useSelector(state => state.posts);
    const isPostLoading = posts.status === 'loading'
    const isTagsLoading = tags.status === 'loading'
    const [items, setItems] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const {navigate} = useNavigation()
    const {category} = route.params;

    // console.log(category)
    const {t} = useTranslation();

    const fetchPostsSuperDuper = async () => {
        setIsLoading(true);

        if (category === 'Home') {
            dispatch(fetchPosts())

        } else {
            dispatch(fetchCategoryPost(category))
            navigation.setOptions({
                title: `${t(category)}`,
            });

        }

        setIsLoading(false);
    }


    React.useEffect(fetchPostsSuperDuper, []);
    if (isLoading) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',

            }}>
                <ActivityIndicator size="large"/>
                <Text style={{
                    color: currentTheme === "dark" ? "#FFF" : "#000",
                    marginTop: 15,
                }}>Загрузка...</Text>
            </View>
        )
    }
    return (
        <View>
            {/*<Text style={{color: currentTheme === "dark" ? "#FFF" : "#000"}}>{posts.status}</Text>*/}
            {/*<Text>{category}</Text>*/}

            {/*<Text style={{color: currentTheme === "dark" ? "#000": "#FFF"}}>{tags.status}</Text>*/}
            {
                category !== 'Home' ? (

                    monochromatic_posts.items === [] ? (
                        <Text>Категория пустая</Text>
                    ) : (
                        <FlatList
                            refreshControl={<RefreshControl refreshing={isPostLoading}
                                                            onRefresh={fetchPostsSuperDuper}/>}
                            data={monochromatic_posts.items}
                            extraData={posts}
                            renderItem={({item: post}) => (
                                <TouchableOpacity
                                    onPress={() => navigate("FullPost", {id: post._id, likedList: post.likedBy,user_id_get: post.user_id})}>
                                    <Post key={post._id} img={post.imageUrl}
                                          Cardtitle={post.title} /*Creator={photos.user.fullName}*/ Creator={post.text}/>
                                </TouchableOpacity>

                            )}
                        />
                    )
                ) : (
                    <FlatList
                        refreshControl={<RefreshControl refreshing={isPostLoading} onRefresh={fetchPostsSuperDuper}/>}
                        data={posts.items}
                        extraData={posts}
                        renderItem={({item: post}) => (
                            <TouchableOpacity
                                onPress={() => navigate("FullPost", {id: post._id, likedList: post.likedBy,user_id_get: post.user_id})}>
                                <Post key={post._id} img={post.imageUrl}
                                      Cardtitle={post.title} /*Creator={photos.user.fullName}*/
                                      Creator={post.text}/>
                            </TouchableOpacity>

                        )}
                    />

                )
            }


        </View>
    );
}


