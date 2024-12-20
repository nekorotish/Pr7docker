import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
    useColorScheme,
    Button,
    Alert,
    ActivityIndicator,
    Image, StyleSheet
} from "react-native";
import styled from "styled-components/native";
import {FontAwesome} from "@expo/vector-icons";
import {useTranslation} from "react-i18next";
import {Controller, useForm} from "react-hook-form";
import {SelectList} from "react-native-dropdown-select-list";
import React, {useState} from "react";
import i18next from "../../../services/i18next";
import * as SecureStore from "expo-secure-store";
import {useDispatch, useSelector} from "react-redux";
import {CircleImage} from "../Components/CircleImage";
import * as ImagePicker from "expo-image-picker";
import {fetchChangeProfileImg} from "../../../redux/slices/auth";

export const Settings = ({navigation}) => {
    const currentTheme = useColorScheme()
    const {t} = useTranslation();
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [imageIsJussed, setImageIsJussed] = useState(null);
    const {api_url} = useSelector(state => state.posts)
    const dispatch = useDispatch()
    const [loading, setloading] = useState(false);
    const UserCard = styled.View`
        background-color: ${currentTheme === "dark" ? 'grey' : 'grey'};
        flex-direction: column;
        display: flex;
        margin-left: 15px;
        margin-right: 15px;
        border-radius: 8px;
        height: 180px;
        margin-top: 45px;
        border-width: 3px;
        border-color: ${currentTheme === "dark" ? 'grey' : 'grey'};
        border-style: dashed;
        justify-content: center;
        justify-items: center;
    `
    const EditProfileList = styled.View`
        margin-top: 30px;
        margin-left: 15px;
        margin-right: 15px;
        background-color: ${currentTheme === "dark" ? 'grey' : 'grey'};
        border-width: 3px;
        border-color: ${currentTheme === "dark" ? 'grey' : 'grey'};
        border-radius: 8px;

    `
    const EditProfileText = styled.Text`
        margin-top: 5px;
        margin-left: 10px;
        font-size: 18px;
        color: ${currentTheme === "dark" ? "#FFF" : "#000"};
        margin-bottom: 5px;



    `
    const EditProfileView = styled.View`
        border-bottom-right-radius: 1px;
        border-bottom-left-radius: 1px;

        //border-bottom-style: solid;
        //border-bottom-color: black;
        //border-bottom-width: 2px;
    `
    const {data} = useSelector(state => state.auth);
    const changelng = async lng => {
        i18next.changeLanguage(lng);
        await SecureStore.setItemAsync(`language`, lng);
        // console.log(`language_${data._id}`)
        // const lang = await SecureStore.getItemAsync(`language_${data._id}`)
        // console.log(`language_${data._id}`)
        // console.log(lang)
    }
    const ChangeImage = async () => {
        if(imageIsJussed){

        setloading(true);
        // Alert.alert(1);

        const formData = new FormData();

        formData.append('image', {
            uri: image[0].uri,
            name: image[0].originalname,
            type: 'image/jpeg'
        });
        const userToken = await SecureStore.getItemAsync('token');
        // console.log(userToken)
        const response = await fetch(`${api_url}/upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'multipart/form-data'
            },
            body: formData
        });
        // Alert.alert(2);
        // console.log("sending fuick sdfsdfsd")
        const responseData = await response.json();
        // console.log(">?>?>?>?>>?>?>?>?>?>?>")
        // console.log(responseData)
        // console.log(">?>?>?>?>>?>?>?>?>?>?>")
        const datasend = {
            email: data.email,
            avatar_url: responseData.compressedUrl
        }
        // Alert.alert(3);
        //
        // console.log(">?>?>?>?>>?>?>?>?>?>?>")
        // console.log(datasend)
        // console.log(">?>?>?>?>>?>?>?>?>?>?>")

        const res = await dispatch(fetchChangeProfileImg(datasend))
        // console.log(res)
        setloading(false);
        // Alert.alert(4);
        }
        else{
            Alert.alert(t("ImageNotJused"),t("ChooseImageInCircle"))
        }
    }

    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {

            const big_im = result.assets

            // console.log(result)
            // console.log(big_im)
            const originalname = big_im[0].uri.substring(big_im[0].uri.lastIndexOf("/") + 1);
            big_im[0].originalname = `${originalname}`
            setImage(big_im);
            setImageIsJussed(true);

        }
        else{
            setImageIsJussed(false);
        }
        // console.log(image[0].uri)

    };
    if (loading) {
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
                }}>{t("Updating avatar image")}</Text>
            </View>
        )
    }
    const PostImage = styled.Image`
    border-radius: 2px;
    width: 100%;
    height: 250px;
    margin-bottom: 10px;
`;
    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView>


                <View>
                    {
                        data !== null ? (
                            <>
                                <UserCard>
                                    {/*{*/}
                                    {/*    data !== null ? (*/}
                                    <View onTouchEndCapture={() => pickImage()} style={{
                                        marginLeft: '28%'
                                    }}>
                                        {
                                            image !== null ? (
                                                // <CircleImage img={image[0].uri}/>
                                                // <PostImage source={{uri: image[0].uri}}/>
                                                <View style={styles.container}>
                                                    <Image
                                                        style={styles.image}
                                                        source={{ uri: image[0].uri }}
                                                    />
                                                </View>

                                            ) : (
                                                <CircleImage img={data.avatarUrl}/>
                                            )
                                        }
                                    </View>

                                    {/*    ) : (*/}
                                    {/*        <FontAwesome style={{*/}
                                    {/*            marginLeft: 145*/}
                                    {/*        }} name={currentTheme === "dark" ? 'user-circle-o' : "user-circle"} size={70}*/}
                                    {/*                     color="black"/>*/}
                                    {/*    )*/}
                                    {/*}*/}


                                    <Button color={currentTheme === "dark" ? "#FFF" : "#000"}
                                            title={t("Change Profile Photo")} style={{
                                        marginTop: 5,
                                        marginLeft: 110,
                                    }} onPress={() => ChangeImage()}/>
                                </UserCard>
                                <EditProfileList>
                                    <EditProfileView>

                                        <EditProfileText onPress={() => navigation.navigate("ChangeProfileData")} style={{
                                            marginTop: 5,
                                            marginLeft: 10,

                                        }}>
                                            {t("Edit Profile")}

                                        </EditProfileText>

                                        <EditProfileText onPress={() => navigation.navigate("ChangeProfilePassword")} >
                                            {t("Change Password")}
                                        </EditProfileText>

                                        <EditProfileText>
                                            {t("Select language")}
                                        </EditProfileText>
                                        <Button color={currentTheme === "dark" ? 'white' : 'black'} title={"en"}
                                                onPress={() => changelng("en")}/>
                                        <Button color={currentTheme === "dark" ? 'white' : 'black'} title={"rus"}
                                                onPress={() => changelng("rus")}/>

                                    </EditProfileView>
                                </EditProfileList>
                            </>
                        ) : (
                            <>
                                <EditProfileList>
                                    <EditProfileView>
                                        <EditProfileText>
                                            {t("Select language")}
                                        </EditProfileText>
                                        <Button color={currentTheme === "dark" ? 'white' : 'black'} title={"en"}
                                                onPress={() => changelng("en")}/>
                                        <Button color={currentTheme === "dark" ? 'white' : 'black'} title={"rus"}
                                                onPress={() => changelng("rus")}/>
                                    </EditProfileView>
                                </EditProfileList>
                            </>
                        )
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 15,
        marginTop: 15,
        width: 125,
        height: 125,
        borderRadius: 60,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
