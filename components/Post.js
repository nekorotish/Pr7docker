import {Text, useColorScheme} from "react-native";
import styled from "styled-components/native";
import axios from "../axios";
import {useSelector} from "react-redux";

const Card = styled.View`

    flex-direction: row;
    border-bottom-width: 1px;
    border-bottom-color: rgba(0, 0, 0, 0.1);
    border-bottom-style: solid;
    position: relative;
    height: 300px;
`
const CardImage = styled.Image`
  width: 100%;
  
`
const CardTitle = styled.Text`
  font-weight: 700;
  font-size: 18px;

`
const PostDetails = styled.View`
    flex-direction: column;
    position: absolute;
    bottom: 0;
    left: 0;


`
const PhotoCreator = styled.Text`
  font-size: 14px;
  margin-top: 2px;
  color: rgba(0, 0, 0, 0.4);
`
const truncateTitle = (str) => {
    if (str.length >= 50) {
        return str.substring(0, 50) + '...';
    }
    return str
}
const Post = ({img, Cardtitle, Creator}) => {
    const {api_url} = useSelector(state => state.posts)
    const currentTheme = useColorScheme()
    // console.log(api_url)
    // console.log(img)
    return (
        <Card>

            {/*<CardImage source={{uri: `http://localhost:4444/${img}`}}/>*/}
            {
                // img.startsWith('http') ? (
                //     <CardImage source={{uri: img}}/>
                //
                // ) : (
                    <CardImage source={{uri: `${api_url}/${img}`}}/>
                // )
            }



            <PostDetails>
                <CardTitle style={{color: "#FFF"}}>

                    {truncateTitle(Cardtitle)}
                </CardTitle>
                <Text style={{color: "#FFF"}}>
                    {/*{api_url}*/}
                    {/*{img}*/}
                    {Creator}
                </Text>
            </PostDetails>

        </Card>
    )
}
export default Post