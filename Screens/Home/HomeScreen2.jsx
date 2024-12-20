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


export const HomeScreen2 = ({route, navigation}) => {
    const currentTheme = useColorScheme()

    const dispatch = useDispatch();
    const {monochromatic_posts, tags} = useSelector(state => state.posts);
    const isPostLoading = monochromatic_posts.status === 'loading'
    const isTagsLoading = tags.status === 'loading'
    const [items, setItems] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const {navigate} = useNavigation()
    const {category} = route.params;
    console.log(category)

    const fetchPostsSuperDuper = () => {
        setIsLoading(true);
        dispatch(fetchCategoryPost(category))
            // .then(() => fetchTags())
            .finally(() => setIsLoading(false));
    }
    // const fetchPostsSuperDuper = () => {
    //     setIsLoading(true);
    //     dispatch(fetchPosts()).then(() => {
    //         const filteredPosts = posts.filter(photos => photos.category === category);
    //         setItems(...filteredPosts);
    //         console.log(items);
    //     }).finally(() => setIsLoading(false));
    // };


    React.useEffect(fetchPostsSuperDuper, [category]);
    if (isLoading) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',

            }}>
                <ActivityIndicator size="large"/>
                <Text style={{color: currentTheme === "dark" ? "#FFF": "#000" ,
                    marginTop: 15,
                }}>Загрузка...</Text>
            </View>
        )
    }
    return (
        <View>
            {/*<Text style={{color: currentTheme === "dark" ? "#FFF": "#000"}}>{monochromatic_posts.status}</Text>*/}
            {/*<Text>{category}</Text>*/}
            {/*<Text style={{color: currentTheme === "dark" ? "#000": "#FFF"}}>{tags.status}</Text>*/}
            <FlatList
                refreshControl={<RefreshControl refreshing={isPostLoading} onRefresh={fetchPostsSuperDuper}/>}
                data={monochromatic_posts.items}
                extraData={monochromatic_posts}
                renderItem={({item: post}) => (
                    <TouchableOpacity onPress={() => navigate("FullPost", {id: post._id, titleOf: post.title,user_id_get:post.user_id})}>
                        <Post key={post._id} img={post.imageUrl} Cardtitle={post.title} Creator={post.user.fullName}/>
                    </TouchableOpacity>

                )}
            />


        </View>
    );
}


