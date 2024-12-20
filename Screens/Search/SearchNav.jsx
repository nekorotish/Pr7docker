import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {SearchScreen} from "./SearchScreen";
import {FullPost} from "../FullPost";
import {HomeScreen} from "../Home/HomeScreen";
import {AccountView} from "../Account/AccountView";
import {useColorScheme} from "react-native";
import {FullPostView} from "../FullPostView";
import {ReportPost} from "../ReportPost";
import {BanPost} from "../BanPost";
import {ChangePost} from "../Home/ChangePost";
import {useLayoutEffect} from "react";
import {useTranslation} from "react-i18next";

export const SearchNav = () => {
    const SearchStack = createNativeStackNavigator()
    const currentTheme = useColorScheme()
    const {t} = useTranslation();

    return(
        <SearchStack.Navigator>
            <SearchStack.Screen name="Search" component={SearchScreen} options={{
                // headerSearchBarOptions: {
                //     placeholder: "Search photos,collections, users"
                // },
                // headerShown: true,
                //
                title: `${t('Search')}`,

            }}/>
            <SearchStack.Screen name="Home" component={HomeScreen} initialParams={{ category: ' ' }} options={{ title: `${t('Home')}`}}/>
            <SearchStack.Screen name="FullPost" component={FullPost} options={{title: `${t('Photo')}`}}/>
            <SearchStack.Screen name="ReportPost" component={ReportPost} options={{title: `${t('Report Post')}`}}/>
            <SearchStack.Screen name="BanPost" component={BanPost} options={{title: `${t('Ban Post')}`}}/>
            <SearchStack.Screen name="ChangePost" component={ChangePost} options={{title: `${t('Photo')}`}}/>
            <SearchStack.Screen name="AccountView" component={AccountView} initialParams={{ user_id: ' ' }} options={{headerShown: true, title: `${t('Account')}`}}/>
            <SearchStack.Screen name="FullPostView" component={FullPostView} options={{title: `${t('Photo')}`}}/>

        </SearchStack.Navigator>
    )
}