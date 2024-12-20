import {
    Alert,
    SafeAreaView,
    Text,
    useColorScheme,
    View,
    Image,
    TextInput,
    Button,
    StyleSheet,
    ScrollView
} from "react-native";
import axios from '../../axios'
import styled from "styled-components/native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import React, {useEffect, useState} from "react";
import * as ImagePicker from 'expo-image-picker';
import {Controller, useForm} from "react-hook-form";
import Constants from "expo-constants";
import {useDispatch, useSelector} from "react-redux";
import {fetchRegister, selectIsAuth} from "../../redux/slices/auth";
import * as SecureStore from "expo-secure-store";
import {SelectList} from "react-native-dropdown-select-list";
import {useTranslation} from "react-i18next";
import {ActivityIndicator} from "react-native-web";


const RegContainer = styled.View`
    flex-direction: column;
    align-items: start;
    margin-left: 15px;
    margin-right: 15px;
`
const ImageCont = styled.View`
    border: red;
    height: 252px;
    border-style: dashed;
`
const PostImage = styled.Image`
    border-radius: 2px;
    width: 100%;
    height: 250px;
    margin-bottom: 10px;
`;
export const ChangePost = ({route, navigation}) => {
    const currentTheme = useColorScheme()
    const userData = useSelector((state) => state.auth.data);
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [imageChange, setImageChange] = useState(null);
    const [title1, setTitle] = useState('');
    const [text1, setText] = useState('');
    const [tags1, setTags] = useState('');
    const [loading, setLoading] = useState(false);

    const {id} = route.params;
    const isEditing = (id);
    const {api_url} = useSelector(state => state.posts)
    const {t} = useTranslation();


    const AddCard = styled.View`

        flex-direction: row;
        margin-left: 15px;
        margin-right: 15px;
        border-radius: 5px;
        height: 140px;
        margin-top: 15px;
        border-width: 3px;
        border-color: ${currentTheme === "dark" ? 'grey' : 'grey'};
        border-style: dashed;
    `
    const MainTitle = styled.Text`
        margin-left: 15px;
        flex-direction: row;
        align-items: center;
        font-size: 20px;
        font-weight: bold;
        color: ${currentTheme === "dark" ? 'white' : 'black'};

    `;
    const styles = StyleSheet.create({
        label: {
            color: currentTheme === "dark" ? 'white' : 'black',
            marginLeft: 0,
            marginTop: 15,
            marginBottom: -10
        },
        button: {
            marginTop: 40,
            height: 40,
            backgroundColor: '#d2d2d2',
            borderRadius: 4,
            width: '100%',
        },
        container: {
            flex: 1,
            justifyContent: 'center',
            paddingTop: Constants.statusBarHeight,
            padding: 8,
            backgroundColor: '#0e101c',
        },
        input: {
            borderBottomWidth: 1,
            borderBottomColor: currentTheme === "dark" ? 'white' : 'black',
            borderBottomStyle: 'solid',
            height: 40,
            width: '100%',
            padding: 10,
            borderRadius: 4,
            color: currentTheme === "dark" ? 'white' : 'black',
        },
    });

    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status === 'granted');
        })();
    }, []);
    useEffect(() => {
        if (id) {
            console.log(id)
            axios.get(`/postgresql/posts/${id}`).then(({data}) => {
                console.log(data)
                // setTitle(data.title)
                // setText(data.text)
                setImageChange(data.imageurl)
                // setTags(data.tags.join(','))

                console.log(data)
                console.log(data.shutterspeed)
                console.log(data.dimensions)
                setValue('dimensions', data.dimensions);

                setValue('title', data.title);
                setValue('text', data.text);
                setValue('category', data.category);
                setValue('cameracompany', data.cameracompany);
                setValue('model', data.model);
                setValue('shutterspeed', data.shutterspeed);
                setValue('aperture', data.aperture);
                setValue('focallength', data.focallength);
                setValue('isocam', data.isocam);
                setValue('tags', data.tags.join(','));

            })
                .catch(err => {
                    console.log(err)
                });
        }
    }, [])
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {

            const big_im = result.assets

            console.log(result)
            console.log(big_im)
            const originalname = big_im[0].uri.substring(big_im[0].uri.lastIndexOf("/") + 1);
            big_im[0].originalname = `${originalname}`
            setImage(big_im);
        }
    };
    if (hasGalleryPermission === false) {
        Alert.alert(`${t('NoAccessToImg')}`);

    }
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const data = [
        {key: '1', transl: 'Cars', value: `${t('Cars')}`},
        {key: '2', transl: 'Wallpapers', value: `${t('Wallpapers')}`},
        {key: '3', transl: 'Monochromatic', value: `${t('Monochromatic')}`},
        {key: '4', transl: '3D Renders', value: `${t('3D Renders')}`},
        {key: '5', transl: 'Nature', value: `${t('Nature')}`},
        {key: '6', transl: 'Minimalism', value: `${t('Minimalism')}`},
        {key: '7', transl: 'Textures & Patterns', value: `${t('Textures & Patterns')}`},
        {key: '8', transl: 'Street Photography', value: `${t('Street Photography')}`},
    ]
    const {register, setValue, handleSubmit, setError, control, reset, formState: {errors, isValid},} = useForm({
        defaultValues: {

            title: '',
            text: '',
            tags: '',
            category: '',
            cameracompany: '',
            model: '',
            shutterspeed: '',
            aperture: '',
            focallength: '',
            isocam: '',
            dimensions: '',
            // avatarUrl: 'https://images.unsplash.com/photo-1624337851647-9eddc80d19f6?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            // password2: '112123',
        },

    })

    const onChange = arg => {
        return {
            value: arg.nativeEvent.text,
        };
    };


    const onSubmit = async (values) => {
        // console.log(image)
        // setLoading(true);
        //
        if (image === null && imageChange === null) {
            alert(`${t('selectPicture')}`)
        }
        // console.log(values.category)
        // // console.log(values)
        // console.log(data[values.category - 1])

        // values.tags = values.tags.split(',');
        values.tags = values.tags.trim().replace(/\s*,\s*/g, ',').replace(/^\,|\,$/g, '').replace(/,+/g, ',');
        values.tags = values.tags.trim().split(/\s*,\s*/).filter(Boolean);

        try {
            if (image === null) {


                //один запрос считывание изменения поста без изменения картинки
                console.log("Считывание изменения данных поста без изменения картинки")
                const fields = {
                    title: values.title,
                    text: values.text,
                    tags: values.tags,
                    category: data[values.category - 1].transl,
                    imageUrl: imageChange,
                    cameracompany: values.cameracompany,
                    model: values.model,
                    shutterspeed: values.shutterspeed,
                    aperture: values.aperture,
                    focallength: values.focallength,
                    isocam: values.isocam,
                    dimensions: values.dimensions,

                }
                console.log("////////////////////\n");

                console.log(fields)
                const dataPost = await axios.patch(`/postgresql/posts/${id}`, fields)
                console.log(dataPost)
                console.log("////////////////////\n");
                // setLoading(false);

            }

            if(image !== null){

                // запрос если поменяли картинку
                console.log("Изменение картинки поста")
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

                const responseData = await response.json();
                console.log("////////////////////\n");
                console.log(responseData);
                console.log("////////////////////\n");
                const fields = {
                    title: values.title,
                    text: values.text,
                    tags: values.tags,
                    category: data[values.category - 1].transl,
                    imageUrl: responseData.compressedUrl,
                    cameracompany: values.cameracompany,
                    model: values.model,
                    shutterspeed: values.shutterspeed,
                    aperture: values.aperture,
                    focallength: values.focallength,
                    isocam: values.isocam,
                    dimensions: values.dimensions,

                }
                console.log("////////////////////\n");

                console.log(fields)
                const dataPost = await axios.patch(`/postgresql/posts/${id}`, fields)
                console.log(dataPost)
                console.log("////////////////////\n");
                // setLoading(false);

            }

        } catch (err) {
            console.log(err)
        }


    }
    console.log('errors', errors);
    console.log('isAuth', isAuth);
    if (!isAuth){
        navigation.goBack("Home");
    }
    // if (loading) {
    //     return (
    //         <View style={{
    //             flex: 1,
    //             justifyContent: 'center',
    //             alignItems: 'center',
    //
    //         }}>
    //             <ActivityIndicator size="large"/>
    //             <Text style={{
    //                 color: currentTheme === "dark" ? "#FFF" : "#000",
    //                 marginTop: 15,
    //             }}>{t("CreatingPost")}</Text>
    //         </View>
    //     )
    // }

    return (
        <SafeAreaView>
            <ScrollView>


                {

                        image === null ? (

                                <ImageCont onTouchEndCapture={() => pickImage()}>
                                    <PostImage source={{uri: `${api_url}/${imageChange}`}}/>
                                </ImageCont>


                        ) : (
                            <PostImage source={{uri: image[0].uri}}/>


                    )
                }

                <MainTitle>
                    {t('Description')}
                </MainTitle>
                <RegContainer>
                    <Text style={styles.label}>{t('Title')}</Text>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                placeholder={t('Title')}
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="title"
                        rules={{required: true , minLength: 2,pattern: {
                                value: /^.*[a-zA-Zа-яА-Я]+.*$/}}}
                    />
                    <Text style={styles.label}>{t('Text')}</Text>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                placeholder={t('Text')}
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="text"
                        rules={{required: true , minLength: 2,pattern: {
                                value: /^.*[a-zA-Zа-яА-Я]+.*$/}}}
                    />
                    <Text style={styles.label}>{t('Tags')}</Text>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                placeholder={t('tag1tag2')}
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="tags"
                        rules={{required: true, minLength: 2,pattern: {
                                value: /^(?!\s*$)\S+(?:,\s*\S+)*$/}}}
                    />
                    <Text style={styles.label}>{t('Category')}</Text>
                    <View style={{width:'100%',marginTop:15}}>


                        <Controller
                            control={control}
                            render={({field: {onChange, onBlur, value}}) => (
                                <SelectList
                                    placeholder={t('Select category')}
                                    setSelected={value => onChange(value)}
                                    data={data.map(item => ({...item, value: t(item.transl)}))}
                                    search={false}
                                    dropdownTextStyles={{color:currentTheme === "dark" ? "#FFF" : "#000"}}
                                    inputStyles={{color:currentTheme === "dark" ? "#FFF" : "#000"}}
                                    boxStyles={{borderRadius:4,marginRight:15,width:"100%"}}
                                    value={value}
                                    save="key"
                                />
                            )}
                            name="category"
                            rules={{required: true}}
                        />
                    </View>
                    <Text style={styles.label}>{t('Camera Company')}</Text>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                placeholder={t('Camera Company')}
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="cameracompany"
                        rules={{required: true , minLength: 2,pattern: {
                                value: /^.*[a-zA-Zа-яА-Я]+.*$/}}}
                    />
                    <Text style={styles.label}>{t('Model of Camera')}</Text>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                placeholder={t('Model')}
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="model"
                        rules={{required: true , minLength: 2,pattern: {
                                value: /^.*[a-zA-Zа-яА-Я]+.*$/}}}
                    />
                    <Text style={styles.label}>{t('ShutterSpeed')}</Text>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                placeholder={t('ShutterSpeed')}
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="shutterspeed"
                        rules={{required: true , minLength: 2,pattern: {
                                value: /^\d+\/\d+$/}}}
                    />
                    <Text style={styles.label}>{t('Aperture')}</Text>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                placeholder={t('Aperture')}
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="aperture"
                        rules={{required: true , minLength: 2,pattern: {
                                value: /^.*[a-zA-Zа-яА-Я]+.*$/}}}
                    />
                    <Text style={styles.label}>{t('FocalLength')}</Text>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                placeholder={t('FocalLength')}
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="focallength"
                        rules={{required: true , minLength: 2,pattern: {
                                value: /^.*[a-zA-Zа-яА-Я]+.*$/}}}
                    />
                    <Text style={styles.label}>{t('ISO')}</Text>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                placeholder={t('ISO')}
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="isocam"
                        rules={{required: true , minLength: 2,pattern: {
                                value: /^\d+$/}}}
                    />
                    <Text style={styles.label}>{t('Dimensions')}</Text>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                placeholder={t('Dimensions')}
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="dimensions"
                        rules={{required: true , minLength: 2,pattern: {
                                value: /^\d+\s*x\s*\d+$/}}}
                    />
                    <View style={styles.button}>
                        <Button
                            disabled={!isValid}
                            color="black"
                            title={t('Save changes')}
                            onPress={handleSubmit(onSubmit)}
                        />
                    </View>
                </RegContainer>
            </ScrollView>
        </SafeAreaView>


    )


}

