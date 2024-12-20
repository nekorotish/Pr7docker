import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {IconInfo} from "../../components/iconInfo";
import {HomeScreen} from "./HomeScreen";
import {Button, TouchableOpacity, useColorScheme, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import {FullPost} from "../FullPost";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {ChangePost} from "./ChangePost";
import {HomeScreen2} from "./HomeScreen2";
import {AccountScreen} from "../Account/AccountScreen";
import {AccountView} from "../Account/AccountView";
import {FullPostView} from "../FullPostView";
import {ReportPost} from "../ReportPost";
import {BanPost} from "../BanPost";
import {useTranslation} from "react-i18next";

const HomeStack = createNativeStackNavigator();
const HomeTopTabs = createMaterialTopTabNavigator();

// export const TopTabsGroup = () => {
//     return(
//         <HomeTopTabs.Navigator screenOptions={{
//             tabBarScrollEnabled: true,
//
//             tabBarLabelStyle: {
//                 textTransform: "capitalize",
//                 fontSize: 13,
//                 textAlign: "center",
//                 fontWeight: "bold",
//
//             },
//             tabBarStyle: {
//                 // width: "auto"
//                 // borderRadius:15
//
//             },
//             tabBarContentContainerStyle: {
//                 // maxHeight:35,
//                 // marginTop: -10,
//                 // marginBottom: 18,
//
//             },
//             tabBarIndicatorStyle: {
//                 borderRadius: 5,
//             }
//
//         }}>
//             <HomeTopTabs.Screen name="Editorial" component={HomeScreen}  initialParams={{ category: 'Editorial' }} />
//             <HomeTopTabs.Screen name="wallpapers" component={HomeScreen} initialParams={{ category: 'wallpapers' }} />
//             <HomeTopTabs.Screen name="monochromatic" component={HomeScreen2} initialParams={{ category: 'monochromatic' }} />
//             <HomeTopTabs.Screen name="3D Renders" component={HomeScreen} initialParams={{ category: '3D Renders' }} />
//             <HomeTopTabs.Screen name="Nature" component={HomeScreen} initialParams={{ category: 'Nature' }} />
//
//         </HomeTopTabs.Navigator>
//     )
// }

export const HomeNav = ({navigation}) => {
    const currentTheme = useColorScheme()
    const {t} = useTranslation();

    return (

        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={HomeScreen} initialParams={{ category: 'Home' }} options={{
                title: `${t('Home')}`,

                headerRight: () => (
                    <View>
                        <TouchableOpacity>
                            <MaterialIcons name="info-outline" size={24} color={currentTheme === "dark" ? 'white':"black"} onPress={() => {
                                navigation.navigate('IconInfo')
                            }}/>
                        </TouchableOpacity>
                    </View>

                )
            }}/>
            <HomeStack.Screen name="IconInfo" component={IconInfo} options={{
                title: `${t('Info')}`, presentation: "modal",
                headerRight: () => (

                    <TouchableOpacity>
                        <Button color={currentTheme === "dark" ? 'white' : "black"}
                                title={t('Done')} onPress={() => navigation.goBack()} />
                    </TouchableOpacity>
                )
            }}/>
            <HomeStack.Screen name="FullPost" component={FullPost} options={{title: `${t('Photo')}`}}/>
            <HomeStack.Screen name="ReportPost" component={ReportPost} options={{title: `${t('Report Post')}`}}/>
            <HomeStack.Screen name="BanPost" component={BanPost} options={{title: `${t('Ban Post')}`}}/>
            <HomeStack.Screen name="FullPostView" component={FullPostView} options={{title: `${t('Photo')}`}}/>
            <HomeStack.Screen name="ChangePost" component={ChangePost} options={{title: `${t('Photo')}`}}/>
            <HomeStack.Screen name="AccountView" component={AccountView} initialParams={{ user_id: ' ' }} options={{headerShown: true, title: `${t('Account')}`}}/>
        </HomeStack.Navigator>

    )
}
