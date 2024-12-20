import {Button, TouchableOpacity, useColorScheme, View,Text} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import {IconInfo} from "../../components/iconInfo";
import {FullPost} from "../FullPost";
import {TopTabsGroup} from "../Home/HomeNav";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {AddScreen} from "./AddScreen";
import React from "react";
import {CreatePost} from "./CreatePost";
import {BanPosts} from "./BanPosts";
import Post from "../../components/Post";
import {MiniPost} from "../../components/MiniPost";
import {BanPost} from "../BanPost";
import {QaPosts} from "../../components/QaPost";
import {QAMiniPost} from "../../components/QAMiniPost";
import {QCreate} from "./QCreate";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

const AddStack = createNativeStackNavigator();

export const AddNav = ({navigation}) => {
    const currentTheme = useColorScheme()
    const userData = useSelector((state) => state.auth.data);
    const {t} = useTranslation();

    return (

        <AddStack.Navigator>
            <AddStack.Screen name="Add" component={AddScreen} options={{headerShown: false, title: `${t('Add')}`}}/>
            <AddStack.Screen name="CreatePost" component={CreatePost} options={{title: `${t('Create Post')}`}}/>
            <AddStack.Screen name="BanPosts" component={BanPosts} options={{title: `${t('Banned Posts')}`}}/>
            <AddStack.Screen name="MiniPosts" component={MiniPost} options={{title: `${t('Banned Post')}`}}/>
            <AddStack.Screen name="QAPosts" component={QaPosts} options={{title: `${t('Q&A')}`,
                headerRight: () => (
                    <View>
                        {
                            userData !== null && userData.user_role_id === 2 ? (
                                <TouchableOpacity >
                                    <Button title={t('Create')} onPress={() => { navigation.navigate('QCreate') }} color={currentTheme === "dark" ? 'white':"black"}
                                    />
                                </TouchableOpacity>
                            ) : (
                                <>
                                </>
                            )
                        }
                    </View>
                )
            }}/>
            <AddStack.Screen name="QAMiniPosts" component={QAMiniPost} options={{title: `${t('Q&A Post')}`}}/>
            <AddStack.Screen name="QCreate" component={QCreate} options={{title: `${t('Q&A Create')}`}}/>

        </AddStack.Navigator>

    )
}