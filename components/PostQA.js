import {Text, useColorScheme} from "react-native";
import styled from "styled-components/native";
import axios from "../axios";
import {useSelector} from "react-redux";
import moment from "moment";
import {useTranslation} from "react-i18next";

const Card = styled.View`

    
    
    flex-direction: row;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-radius: 6px; /* add border radius */
    margin-left: 5px; /* add padding to the left */
    margin-right: 5px; /* add padding to the right */
    background-color: #d0cece;
    margin-bottom: 5px;
    border-bottom-color: rgba(0, 0, 0, 0.1);
    position: relative;
    height: 70px;
`
//flex-direction: row;
//border-bottom-width: 1px;
//
//background-color: #d0cece;
//border-bottom-color: rgba(0, 0, 0, 0.1);
//border-bottom-style: solid;
//position: relative;
//height: 70px;
const CardImage = styled.Image`
  width: 100%;
  
`
const CardTitle = styled.Text`
  font-weight: 700;
  font-size: 18px;

`
const PostDetails = styled.View`
    margin-left: 5px;
    flex-direction: column;
    margin-top: 6px;


`
const PhotoCreator = styled.Text`
  font-size: 14px;
  margin-top: 2px;
  color: rgba(0, 0, 0, 0.4);
`

const PostQA= ({q_text, a_text, created_at}) => {
    const formattedTime = moment(created_at).format('YYYY-MM-DD HH:mm');
    const {qas} = useSelector(state => state.qa);
    const {t} = useTranslation();

    const truncateTitle = (str) => {
        if(qas.status === 'loaded'){
            if (str.length >= 35 ) {
                return str.substring(0, 35) + '...';
            }
            return str
        }

    }
    const currentTheme = useColorScheme()
    return (
        <Card>
            <PostDetails>
                <CardTitle style={{color: "#000000"}}>
                    {truncateTitle(q_text)}
                </CardTitle>
                <Text style={{color: "#000000"}}>
                    {
                        a_text === null ? (
                            <Text>{t('No answer')}</Text>
                        ) : (
                            <Text>
                            {truncateTitle(a_text)}</Text>
                        )
                    }

                </Text>
                <Text style={{color: "#000000"}}>
                    {formattedTime}
                </Text>
            </PostDetails>

        </Card>
    )
}
export default PostQA