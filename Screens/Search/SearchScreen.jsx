import {
    ActivityIndicator, FlatList,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    useColorScheme,
    View
} from "react-native";
import {SearchBar} from "react-native-screens";
import SearchBarNativeComponent from "react-native-screens/src/fabric/SearchBarNativeComponent";
import React, {useCallback, useEffect, useLayoutEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {CategoryPost} from "./CategoryPost";
import styled from "styled-components/native";
import {SearchPicturesSkeleton} from "./SearchPicturesSkeleton";
import {useDispatch, useSelector} from "react-redux";
import {fetchOnePost, fetchPostsDiscover, fetchUserDataSuperDuper} from "../../redux/slices/posts";
import Post from "../../components/Post";
import {useTranslation} from "react-i18next";

export const SearchScreen = () => {
    const {postsDiscover} = useSelector(state => state.posts);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const {navigate} = useNavigation()
    const {t} = useTranslation();

    const fetchPostsSuperDuper = () => {
        setIsLoading(true);
        dispatch(fetchPostsDiscover())
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
                }}>`${t('Downloading')}`...</Text>
            </View>
        )
    }
    const data = [{
        id: 1,
        name: "Cars",
        name_transl: `${t('Cars')}`,
        imageUrl: "uploads/down/jorgen-hendriksen-lX2YG5w4_gs-unsplash.jpg",
    }, {
        id: 2,
        name: "Wallpapers",
        name_transl: `${t('Wallpapers')}`,
        imageUrl: "uploads/down/brian-0CkKk5ttn3I-unsplash.jpg",
    }, {
        id: 3,
        name: "Monochromatic",
        name_transl: `${t('Monochromatic')}`,
        imageUrl: "uploads/down/jack-gardner-arjiIKicU-0-unsplash.jpg",
    }, {
        id: 4,
        name: "3D Renders",
        name_transl: `${t('3D Renders')}`,
        imageUrl: "uploads/down/alex-shuper-XRr_cRETpnc-unsplash.jpg",
    }, {
        id: 5,
        name: "Nature",
        name_transl: `${t('Nature')}`,
        imageUrl: "uploads/down/roksolana-zasiadko-65exw40ulRc-unsplash.jpg",
    }, {
        id: 6,
        name: "Minimalism",
        name_transl: `${t('Minimalism')}`,
        imageUrl: "uploads/down/lena-polishko-QjnjCLTM4eU-unsplash.jpg",
    }, {
        id: 7,
        name: "Textures & Patterns",
        name_transl: `${t('Textures & Patterns')}`,
        imageUrl: "uploads/down/bro-takes-photos-P0RrSzEEMB8-unsplash.jpg",
    }, {
        id: 8,
        name: "Street Photography",
        name_transl: `${t('Street Photography')}`,
        imageUrl: "uploads/down/02573211-C3B3-43AB-AF05-359EA6D7DF3A.jpg",
    }];
    const {search, setSearch} = useState("")
    const navigation = useNavigation()
    const currentTheme = useColorScheme()
    const halfLength = Math.ceil(data.length / 2); // Разделение данных на две группы

    const firstHalf = data.slice(0, halfLength); // Первая половина данных
    const secondHalf = data.slice(halfLength); // Вторая половина данных



    return (
        <ScrollView style={{flex: 1}}>
            <SafeAreaView>

                <Text style={{
                    justifyContent: "center",
                    textAlign: "left",
                    marginLeft: 15,
                    fontSize: 18,
                    fontWeight: "bold",
                    marginTop: 5,
                    color: currentTheme === "dark" ? 'white' : 'black',

                }}>
                    {t('Browse by Category')}
                </Text>

                <ScrollView horizontal={true}>
                    <View style={{flexDirection: "column"}}>

                        <View style={{flexDirection: 'row'}}>
                            {firstHalf.map((item) => (
                                <TouchableOpacity key={item.id}
                                                  onPress={() => navigation.navigate("Home", {category: item.name})}>
                                    <CategoryPost key={item.id} imageUrl={item.imageUrl} name={item.name_transl}/>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <View style={{flexDirection: 'row', marginTop: -20}}>
                            {secondHalf.map((item) => (
                                <TouchableOpacity key={item.id}
                                                  onPress={() => navigation.navigate("Home", {category: item.name})}>
                                    <CategoryPost key={item.id} imageUrl={item.imageUrl} name={item.name_transl}/>
                                </TouchableOpacity>

                            ))}
                        </View>
                    </View>


                </ScrollView>

                <Text style={{
                    justifyContent: "center",
                    textAlign: "left",
                    marginLeft: 15,
                    fontSize: 18,
                    fontWeight: "bold",
                    marginTop: 15,
                    color: currentTheme === "dark" ? 'white' : "black"

                }}>{t('Discover')}</Text>
                {
                    postsDiscover.items === [] ? (

                        <SearchPicturesSkeleton/>
                    ): (
                        <FlatList style={{marginTop: 15}}
                            data={postsDiscover.items}
                            extraData={postsDiscover}
                            renderItem={({item: post}) => (
                                <TouchableOpacity
                                    onPress={() => navigate("FullPost", {id: post._id,user_id_get: post.user_id})}>
                                    <Post key={post._id} img={post.imageUrl}
                                          Cardtitle={post.title} /*Creator={photos.user.fullName}*/ Creator={post.text}/>
                                </TouchableOpacity>

                            )}
                        />
                    )
                }
            </SafeAreaView>
        </ScrollView>
    );
}
