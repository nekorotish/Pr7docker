import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {DarkTheme, DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {AccountScreen} from "./Account/AccountScreen";
import {TouchableOpacity, View, useColorScheme, Share, Alert} from "react-native";

import React from "react";
import {Entypo, EvilIcons, Ionicons, SimpleLineIcons} from "@expo/vector-icons";
import {AddScreen} from "./Add/AddScreen";
import {HomeNav} from "./Home/HomeNav";
import {StatusBar} from "expo-status-bar";
import {SearchNav} from "./Search/SearchNav";
import styled from "styled-components/native";
import {AccountNav} from "./Account/AccountNav";

const Tab = createBottomTabNavigator();

import {TabBarIcons} from '../components/MainStyles'
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthMe, selectIsAuth} from "../redux/slices/auth";
import {AddNav} from "./Add/AddNav";
import {useTranslation} from "react-i18next";
import * as SecureStore from "expo-secure-store";
import i18next from "../services/i18next";

export const TabNavigation = ({navigation}) => {
    const currentTheme = useColorScheme()
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
    const {t} = useTranslation();
    const {data} = useSelector(state => state.auth);

    React.useEffect(async () => {
        await dispatch(fetchAuthMe());
        // if (data !== null) {

            const lang = await SecureStore.getItemAsync(`language`)
            console.log(lang)
            console.log(lang)
            if (lang !== null) {
                i18next.changeLanguage(lang);
            }
        // }

    }, [])
    return (
        <NavigationContainer theme={currentTheme === "dark" ? DarkTheme : DefaultTheme}>
            <StatusBar style="auto"/>
            <Tab.Navigator
                initialRouteName='Home'
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        if (route.name === 'HomeNav') {
                            iconName = focused ? 'image' : 'image';
                        } else if (route.name === 'SearchNav') {
                            iconName = focused ? 'search' : 'search';
                        } else if (route.name === 'AddNav') {
                            iconName = focused ? 'circle-with-plus' : 'circle-with-plus';
                            return <Entypo name="squared-plus" size={size} color={color}/>
                        } else if (route.name === 'AccountNav') {
                            iconName = focused ? 'person-circle-outline' : 'person-circle-outline';
                        }
                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color}/>;
                    },
                    // currentTheme === "white"
                    tabBarActiveTintColor: currentTheme === "dark" ? 'white' : "black",/*'black'*/
                    tabBarInactiveTintColor: 'gray',
                    // tabBarStyle: {
                    //     backgroundColor: 'black'
                    // },
                })}
            >
                <Tab.Screen name="HomeNav" component={HomeNav}
                            options={{headerShown: false, tabBarLabel: `${t('Home')}`}}/>
                <Tab.Screen name="SearchNav" component={SearchNav}
                            options={{headerShown: false, title: `${t('Search')}`}}/>
                <Tab.Screen name="AddNav" component={AddNav} options={{headerShown: false, title: `${t('Add')}`}}/>
                <Tab.Screen name="AccountNav" component={AccountNav}
                            options={{headerShown: false, title: `${t('Account')}`}}/>

            </Tab.Navigator>
        </NavigationContainer>
    )
}
