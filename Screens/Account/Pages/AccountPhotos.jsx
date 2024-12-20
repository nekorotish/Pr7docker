import {View, Text, useColorScheme, RefreshControl, TouchableOpacity, FlatList, VirtualizedList} from "react-native";
import {AccountPhotosSkeleton} from "../AccountPhotosSkeleton";
import styled from "styled-components/native";
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuth} from "../../../redux/slices/auth";
import React, {useEffect} from "react";
import {fetchUserPost} from "../../../redux/slices/posts";
import Post from "../../../components/Post";
import {useNavigation} from "@react-navigation/native";
import {useTranslation} from "react-i18next";

export const AccountPhotos = () => {
    const currentTheme = useColorScheme()
    const {data, status} = useSelector(state => state.auth);
    const {user_posts} = useSelector(state => state.posts);
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const navigation = useNavigation()
    const {t} = useTranslation();

    const MainTitle = styled.Text`
        margin-left: 15px;
        flex-direction: row;
        align-items: center;
        font-size: 20px;
        font-weight: bold;
        color: ${currentTheme === "dark" ? 'white' : 'black'};

    `;
    useEffect(() => {
        dispatch(fetchUserPost(data._id))
        // console.log("//////////////////////")
        // console.log(data)
        // console.log("//////////////////////")
    }, [])
    const getItem = (data, index) => {
        return data[index];
    };
    return (
        <View>
            <MainTitle>
                {t('Photos')}
            </MainTitle>
            {
                isAuth === true && user_posts.status === 'loaded' ? (


                    user_posts.items.length !== 0 ? (
                        <VirtualizedList
                            style={{marginTop: 15}}
                            data={user_posts.items}
                            getItemCount={() => user_posts.items.length}
                            getItem={getItem}
                            renderItem={({item: post}) => (
                                //             navigation.navigate('HomeNav', {
                                //     screen: 'FullPost',
                                //     params: {id: photos._id, likedList: photos.likedBy}
                                // })}
                                <TouchableOpacity onPress={() => navigation.navigate("FullPost", {
                                    id: post._id,
                                    likedList: post.likedBy,
                                    user_id_get: post.user_id
                                })}>
                                    <Post key={post._id} img={post.imageUrl} Cardtitle={post.title}
                                        /*Creator={photos.user.fullName}*/ Creator={post.text}/>
                                </TouchableOpacity>)}
                            keyExtractor={(item) => item._id}
                        />
                    ) : (
                        <Text style={{marginLeft: 15, fontSize: 16, marginTop: 8}}>Вы не cоздавали посты</Text>

                    )

                ) : (
                    <AccountPhotosSkeleton style={{
                        marginTop: 15
                    }}/>
                )
            }

        </View>
    )
}