import {FlatList, RefreshControl, Text, TouchableOpacity, useColorScheme, View} from "react-native";
import Post from "../../components/Post";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {fetchBannedPosts, fetchCategoryPost, fetchPosts, fetchUserBannedPosts} from "../../redux/slices/posts";
import {selectIsAuth} from "../../redux/slices/auth";

export const BanPosts = ({navigation}) => {
    const currentTheme = useColorScheme()

    const dispatch = useDispatch();
    const {navigate} = useNavigation()
    const userData = useSelector((state) => state.auth.data);

    const {banned_posts} = useSelector(state => state.posts);
    const {user_banned_posts} = useSelector(state => state.posts);
    const [isLoading, setIsLoading] = useState(false);
    const [isPostLoading, setIsPostLoading] = useState(false);

    const fetchPostsSuperDuper = () => {
        setIsPostLoading(true);
        if (userData.user_role_id === 1) {

            dispatch(fetchBannedPosts())
        } else {

            dispatch(fetchUserBannedPosts(userData._id))
        }

        setIsPostLoading(false);
    }
    useEffect(fetchPostsSuperDuper, [])
    const isAuth = useSelector(selectIsAuth);

    if (!isAuth){
        navigation.goBack();
    }
    return (
        <View>
            {/*<Text>{banned_posts.status}</Text>*/}
            {/*<Text>{user_banned_posts.status}</Text>*/}
            {

                banned_posts.items !== [] && userData !== null || user_banned_posts.items !== [] && userData !== null ? (

                    userData.user_role_id === 1 ? (

                        <FlatList
                            refreshControl={<RefreshControl refreshing={isPostLoading}
                                                            onRefresh={fetchPostsSuperDuper}/>}
                            data={banned_posts.items}
                            renderItem={({item: post}) => (
                                <TouchableOpacity
                                    onPress={() => navigate("MiniPosts", {
                                        id: post._id,
                                        imageUrl: post.imageUrl,
                                        user_id_get: post.user_id,
                                        title: post.title,
                                        text: post.text,
                                        banned: post.banned,
                                        admin_id: post.admin_id,
                                        reasonofban: post.reasonofban

                                    })}>
                                    <Post key={post._id} img={post.imageUrl}
                                          Cardtitle={post.title} /*Creator={photos.user.fullName}*/
                                          Creator={post.text}/>
                                </TouchableOpacity>


                            )}
                        />
                    ) : (
                        <FlatList
                            refreshControl={<RefreshControl refreshing={isPostLoading}
                                                            onRefresh={fetchPostsSuperDuper}/>}
                            data={user_banned_posts.items}
                            renderItem={({item: post}) => (
                                <TouchableOpacity
                                    onPress={() => navigate("MiniPosts", {
                                        id: post._id,
                                        imageUrl: post.imageUrl,
                                        user_id_get: post.user_id,
                                        title: post.title,
                                        text: post.text,
                                        banned: post.banned,
                                        admin_id: post.admin_id,
                                        reasonofban: post.reasonofban

                                    })}>
                                    <Post key={post._id} img={post.imageUrl}
                                          Cardtitle={post.title}
                                          Creator={post.text}/>
                                </TouchableOpacity>
                            )}
                        />
                    )
                ) : (
                    <Text>Нет забаненных записей</Text>
                )

            }

        </View>
    )
}
