import {
    SafeAreaView,
    ScrollView,
    Text,
    useColorScheme,
    View
} from "react-native";
import React, {useEffect, useState} from "react";
import styled from "styled-components/native";
import {AccountSkeleton} from "./AccountSkeleton";
import {CircleImage} from "./Components/CircleImage";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserDataSuperDuper} from "../../redux/slices/posts";
import {ToggleView} from "./Components/ToggleView";


export const AccountView = ({route}) => {
    const {user_data_get} = useSelector((state) => state.posts.get_user);
    const {user_id} = route.params;
    const dispatch = useDispatch();
    const [isLoadingData, setIsLoadingData] = useState(false)
    const currentTheme = useColorScheme()

    const TextName = styled.Text`
        margin-left: 15px;
        margin-top: 15px;
        color: ${currentTheme === "dark" ? 'white' : 'black'};
    `
    useEffect(() => {
        setIsLoadingData(true)
        dispatch(fetchUserDataSuperDuper(user_id))
        setIsLoadingData(false)

    }, [])


    return (
        <SafeAreaView>
            <ScrollView>
                {

                    isLoadingData === true ? (
                        <>

                            <View style={{backgroundColor: "#808080", height: 200}}>
                                <AccountSkeleton style={{marginLeft: 15, marginTop: 15}}/>
                            </View>
                            <ToggleView user_id={user_id}/>
                        </>


                    ) : (
                        user_data_get !== null ? (
                            <>

                                <View style={{backgroundColor: "#808080", height: 200}}>
                                    <CircleImage img={user_data_get.avatarurl}/>

                                    <TextName>{user_data_get.fullname}</TextName>
                                </View>
                                <ToggleView user_id={user_id}/>
                            </>


                        ) : (
                            <>
                                <Text>
                                    Ошибка получения данных
                                </Text>
                            </>
                        )
                    )
                }


            </ScrollView>

        </SafeAreaView>
    )
}