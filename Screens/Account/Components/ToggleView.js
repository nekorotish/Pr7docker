import {Button, ScrollView, Text, TouchableOpacity, useColorScheme, View, VirtualizedList} from "react-native";
import {AccountPhotos} from "../Pages/AccountPhotos";
import {AccountLikes} from "../Pages/AccountLikes";
import {AccountCollections} from "../Pages/AccountCollections";
import styled from "styled-components/native";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../../redux/slices/auth";
import * as SecureStore from "expo-secure-store";
import {
    fetchUserDataSuperDuper,
    fetchUserLikePosts, fetchUserLikePostsForView,
    fetchUserPost,
    fetchUserPostsForAccountView
} from "../../../redux/slices/posts";
import Post from "../../../components/Post";
import {AccountPhotosSkeleton} from "../AccountPhotosSkeleton";
import {useNavigation} from "@react-navigation/native";
import {AccountCollectionsSkeleton} from "../AccountCollectionsSkeleton";
import {useTranslation} from "react-i18next";

const Container = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-right: 10%;
    margin-left: 10%;
`;
const ExitButton = styled.View`
    margin-top: 15px;
`

export const ToggleView = ({user_id}) => {
    const {user_data_get} = useSelector((state) => state.posts.get_user);
    const [userLogIn, setUserLogIn] = useState(false)
    const [isLoadingData, setIsLoadingData] = useState(false)
    const {get_user_posts_for_view} = useSelector(state => state.posts);
    const {get_user_likes_posts_for_view} = useSelector(state => state.posts);
    const navigation = useNavigation()
    const {t} = useTranslation();

    useEffect(() => {
        setIsLoadingData(true)
        dispatch(fetchUserDataSuperDuper(user_id))
        dispatch(fetchUserPostsForAccountView(user_id))
        dispatch(fetchUserLikePostsForView(user_id))

        setIsLoadingData(false)
    }, [])

    const dispatch = useDispatch();
    const currentTheme = useColorScheme()
    const [changeThemes, setChangeThemes] = useState("Photos")

    const Chan = styled.View`
        
        margin-top: 5px;
        //background: rgba(205, 221, 239, 0.81);
        border-bottom-width: 2px;
        border-bottom-color: grey;
        border-bottom-style: solid;
    `
    const MainTitle = styled.Text`
        margin-left: 15px;
        margin-top: 15px;
        flex-direction: row;
        align-items: center;
        font-size: 20px;
        font-weight: bold;
        color: ${currentTheme === "dark" ? 'white' : 'black'};

    `;
    const getItem = (data, index) => {
        return data[index];
    };


    return (
        <>
            <Container>
                <Chan>
                    <Button color={currentTheme === "dark" ? 'white' : "black"} title={t('Photos')}
                            onPress={() => setChangeThemes("Photos")}/>
                </Chan>
                <Chan>
                    <Button color={currentTheme === "dark" ? 'white' : "black"} title={t('Likes')}
                            onPress={() => setChangeThemes("Likes")}/>
                </Chan>
                <Chan>
                    <Button color={currentTheme === "dark" ? 'white' : "black"} title={t('Collections')}
                            onPress={() => setChangeThemes("Collections")}/>
                </Chan>

            </Container>


            {
                changeThemes === "Photos" ? (
                        <View>
                            <MainTitle>
                                {t('Photos')}
                            </MainTitle>
                            {isLoadingData === false ? (
                                <>
                                    {get_user_posts_for_view.items.length !== 0 ? (
                                        <VirtualizedList
                                            style={{ marginTop: 15 }}
                                            data={get_user_posts_for_view.items}
                                            getItemCount={() => get_user_posts_for_view.items.length}
                                            getItem={getItem}
                                            renderItem={({ item: post }) => (
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        navigation.navigate("FullPostView", {
                                                            id: post._id,
                                                            likedList: post.likedBy,
                                                            user_id_get:post.user_id
                                                        })
                                                    }
                                                >
                                                    <Post
                                                        key={post._id}
                                                        img={post.imageUrl}
                                                        Cardtitle={post.title}
                                                        Creator={post.text}
                                                    />
                                                </TouchableOpacity>
                                            )}
                                            keyExtractor={(item) => item._id}
                                        />
                                    ) : (
                                        <>
                                            <Text style={{ marginLeft: 15, fontSize: 16, marginTop: 8 }}>
                                                Вы не создавали посты
                                            </Text>
                                        </>
                                    )}
                                </>
                            ) : (
                                <AccountPhotosSkeleton style={{ marginTop: 15 }} />
                            )}

                        </View>
                    )
                    : changeThemes === "Likes" ?
                        (<View>
                            <MainTitle>
                                {t('Likes')}
                            </MainTitle>

                            {

                                get_user_likes_posts_for_view.items.length === 0 ? (
                                    <>
                                        <Text style={{marginLeft:15, fontSize: 16,marginTop:8}}>Вы не лайкали посты</Text>
                                    </>
                                ) : (

                                    <VirtualizedList
                                        style={{marginTop: 15}}
                                        data={get_user_likes_posts_for_view.items}
                                        getItemCount={() => get_user_likes_posts_for_view.items.length}
                                        getItem={getItem}
                                        renderItem={({item: post}) => (
                                            <TouchableOpacity onPress={() => navigation.navigate("FullPostView", {
                                                id: post._id,
                                                likedList: post.likedBy,
                                                user_id_get:post.user_id
                                            })}>
                                                <Post key={post._id} img={post.imageUrl} Cardtitle={post.title}
                                                    /*Creator={photos.user.fullName}*/ Creator={post.text}/>
                                            </TouchableOpacity>)}
                                        keyExtractor={(item) => item._id}
                                    />
                                )

                            }

                        </View>) : changeThemes === "Collections" ? (<View>
                                <ScrollView>


                                    <MainTitle>
                                        {t('Collections')}
                                    </MainTitle>
                                    <AccountCollectionsSkeleton style={{
                                        marginLeft: 5,
                                        marginTop: 15,

                                    }}/>
                                    <AccountCollectionsSkeleton style={{
                                        marginLeft: 5,
                                        marginTop: 15,

                                    }}/>

                                </ScrollView>
                            </View>) :
                            <MainTitle>
                                Error
                            </MainTitle>
            }

        </>)
}