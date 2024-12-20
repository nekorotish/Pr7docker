import {Button, Text, useColorScheme} from "react-native";
import {AccountPhotos} from "../Pages/AccountPhotos";
import {AccountLikes} from "../Pages/AccountLikes";
import {AccountCollections} from "../Pages/AccountCollections";
import styled from "styled-components/native";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../../redux/slices/auth";
import * as SecureStore from "expo-secure-store";
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

export const ToggleSwitch = () => {
    const {data} = useSelector(state => state.auth);
    const [userLogIn, setUserLogIn] = useState(false)
    useEffect(() => {
        if (data !== null){
            setUserLogIn(true)
        }
    },[data])
    const {t} = useTranslation();

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

    const OnClickLogout = async () => {
        dispatch(logout());
        await SecureStore.deleteItemAsync('token')
    }

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
            <ExitButton>
                <Button color="red" title={t('Logout')} onPress={() => OnClickLogout()}/>
            </ExitButton>

            {
                changeThemes === "Photos" ?
                    <AccountPhotos reg={userLogIn}/> : changeThemes === "Likes" ?
                        <AccountLikes/> : changeThemes === "Collections" ? <AccountCollections/> :
                            <Text>Ошибка</Text>
            }

        </>)
}