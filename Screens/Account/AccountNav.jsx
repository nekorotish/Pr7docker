import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Settings} from "./Pages/Settings";
import {TouchableOpacity, useColorScheme, View, Text, Share, Alert, Button} from "react-native";
import {EvilIcons, Ionicons, SimpleLineIcons} from "@expo/vector-icons";
import React from "react";
import {AccountScreen} from "./AccountScreen";
import {TabBarIcons} from '../../components/MainStyles'
import {IconInfo} from "../../components/iconInfo";
import {Login} from "./Components/Login";
import {FullPost} from "../FullPost";
import {AccountView} from "./AccountView";
import {FullPostView} from "../FullPostView";
import {BanPost} from "../BanPost";
import {ChangePost} from "../Home/ChangePost";
import {ReportPost} from "../ReportPost";
import {RecoverPassword} from "./Components/RecoverPassword";
import {useTranslation} from "react-i18next";
import {ChangeProfileData} from "./Pages/ChangeProfileData";
import {ChangeProfilePassword} from "./Pages/ChangeProfilePassword";

const AccountStack = createNativeStackNavigator();


export const AccountNav = ({navigation}) => {
    const currentTheme = useColorScheme()
    const {t} = useTranslation();

    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    "React_Share top bam",
                url: "https://reactnative.dev/docs/share"
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {

                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    };
    return (
        <AccountStack.Navigator>
            <AccountStack.Screen name="Account" component={AccountScreen} options={{
                headerShown: true, title: `${t('Account')}`,
                headerRight: () => (
                    <View>
                        <TouchableOpacity>
                            <TabBarIcons>


                                <Ionicons name="settings-outline" style={{
                                    marginRight: 10,
                                }} size={24} color={currentTheme === "dark" ? 'white' : "black"} onPress={() => {
                                    navigation.navigate('Settings')
                                }}/>

                                <EvilIcons name="share-apple" size={30}
                                           color={currentTheme === "dark" ? 'white' : "black"} onPress={onShare}/>
                            </TabBarIcons>
                        </TouchableOpacity>

                    </View>

                ),
                // headerLeft: () => (
                //     <View>
                //         <SimpleLineIcons name="graph" size={24} color={currentTheme === "dark" ? 'white' : "black"}/>
                //     </View>
                // ),


            }}/>
            <AccountStack.Screen name="Settings" component={Settings} options={{
                title: `${t('Settings')}`,
                // headerRight: () => (
                //
                //     <TouchableOpacity>
                //         <Button color={currentTheme === "dark" ? 'white' : "black"}
                //                 title="Done" onPress={() => navigation.navigate('Account')}/>
                //     </TouchableOpacity>
                // )
            }}/>
            <AccountStack.Screen name="Login" component={Login} options={{
                title: `${t('Authtorization')}`,
            }}/>
            <AccountStack.Screen name="RecoverPass" component={RecoverPassword} options={{
                title: `${t('Recover Password')}`,
            }}/>
            <AccountStack.Screen name="FullPost" component={FullPost} options={{title: `${t('Photo')}`}}/>
            <AccountStack.Screen name="BanPost" component={BanPost} options={{title: `${t('Banned Post')}`}}/>
            <AccountStack.Screen name="ChangePost" component={ChangePost} options={{title: `${t('Photo')}`}}/>
            <AccountStack.Screen name="ReportPost" component={ReportPost} options={{title: `${t('Report Post')}`}}/>
            <AccountStack.Screen name="FullPostView" component={FullPostView} options={{title: `${t('Photo')}`}}/>
            <AccountStack.Screen name="ChangeProfileData" component={ChangeProfileData} options={{title: `${t('Profile data')}`}}/>
            <AccountStack.Screen name="ChangeProfilePassword" component={ChangeProfilePassword} options={{title: `${t('Profile password')}`}}/>
            <AccountStack.Screen name="AccountView" component={AccountView} initialParams={{ user_id: ' ' }} options={{headerShown: true, title: `${t('Account')}`}}/>
        </AccountStack.Navigator>

    )
}