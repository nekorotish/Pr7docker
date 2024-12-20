import {
    Alert,
    Button, Image,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    useColorScheme,
    View
} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import styled from "styled-components/native";
import {AccountSkeleton} from "./AccountSkeleton";
import {Regist} from "./Components/Regist";
import {ToggleSwitch} from "./Components/ToggleSwitch";
import {CircleImage} from "./Components/CircleImage";
import {useDispatch, useSelector} from "react-redux";
import {Login} from "./Components/Login";
import {Loading} from "../../components/Loading";
import {fetchOnePost, fetchUserDataSuperDuper} from "../../redux/slices/posts";
import {fetchAuthMe} from "../../redux/slices/auth";


export const AccountScreen = ({navigation}) => {
    const {data,status} = useSelector(state => state.auth);

    const [userLogIn, setUserLogIn] = useState(false)
    // const isLoadingAccount = status === 'loading'
    const [isLoading, setIsLoading] = useState(false);

    const [isLoadingData, setIsLoadingData] = useState(false)
    const currentTheme = useColorScheme()
    const TextName = styled.Text`
      margin-left: 15px;
      margin-top: 15px;
      color: ${currentTheme === "dark" ? 'white' : 'black'};
`
    const dispatch = useDispatch();

    useEffect(() => {
        if (data !== null){
            setUserLogIn(true)
        }
        else{
            setUserLogIn(false)
        }
    },[data])

    const onRefresh = useCallback(async () => {
        setIsLoading(true);
        setTimeout(async () => {
            dispatch(fetchAuthMe())

            setIsLoading(false);
        }, 2000);
    }, []);
    if (status === 'loading') {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Loading/>
            </View>
        );
    }

    return (
        <SafeAreaView >
            <ScrollView refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={onRefresh}/>
            }>
                {

                    isLoadingData === true ? (
                        <>

                            <View style={{backgroundColor: "#808080", height: 200}}>
                                <AccountSkeleton style={{marginLeft: 15, marginTop: 15}}/>
                            </View>
                            <ToggleSwitch />
                        </>


                    ) : (
                        userLogIn === true && data !== null ? (
                            <>

                                <View style={{backgroundColor: "#808080", height: 200}}>
                                    <CircleImage img={data.avatarUrl}/>

                                    <TextName>{data.fullName}</TextName>
                                </View>
                                <ToggleSwitch/>
                            </>


                        ) : (
                            <Regist navigation={navigation}/>
                        )
                    )
                }


            </ScrollView>

        </SafeAreaView>
    )
}