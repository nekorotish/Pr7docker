import {FlatList, RefreshControl, SafeAreaView, Text, TouchableOpacity, useColorScheme, View} from "react-native";
import Post from "./Post";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {fetchBannedPosts, fetchCategoryPost, fetchPosts, fetchUserBannedPosts} from "../redux/slices/posts";
import {fetchQas} from "../redux/slices/qa";
import PostQA from "./PostQA";
import {selectIsAuth} from "../redux/slices/auth";

export const QaPosts = ({navigation}) => {
    const currentTheme = useColorScheme()

    const dispatch = useDispatch();
    const {navigate} = useNavigation()
    const userData = useSelector((state) => state.auth.data);

    const {qas} = useSelector(state => state.qa);
    const [isLoading, setIsLoading] = useState(false);
    const isPostLoading = qas.status === 'loading'

    const fetchPostsSuperDuper = () => {
        setIsLoading(true);
        dispatch(fetchQas(userData._id))
        setIsLoading(false);
    }
    useEffect(fetchPostsSuperDuper, [])
    const isAuth = useSelector(selectIsAuth);

    if (!isAuth){
        navigation.goBack();
    }
    return (
        <SafeAreaView style={{flex:1}}>
            <Text>{qas.status}</Text>
            {

                qas.items !== [] && qas.status === 'loaded' ? (

                        <FlatList
                            refreshControl={<RefreshControl refreshing={isPostLoading}
                                                            onRefresh={fetchPostsSuperDuper}/>}
                            data={qas.items}
                            renderItem={({item: post}) => (
                                <TouchableOpacity
                                    onPress={() => navigate("QAMiniPosts", {
                                        q_id: post.q_id,
                                        q_text: post.q_text,
                                        a_text: post.a_text,
                                        created_at: post.created_at

                                    })}>
                                    <PostQA key={post.q_id} q_text={post.q_text}
                                          a_text={post.a_text} /*Creator={photos.user.fullName}*/
                                          created_at={post.created_at}/>
                                </TouchableOpacity>


                            )}
                        />
                ) : (
                    <Text>Нет вопросов </Text>
                )

            }

        </SafeAreaView>
    )
}
