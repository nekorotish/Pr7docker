import {View, Text, Image} from "react-native";
import styled from "styled-components/native";
import {useSelector} from "react-redux";
import {StyleSheet} from "react-native";

const CategoryCard = styled.View`
    flex-direction: column;
    margin-top: 10px;
    background: rgba(205, 221, 239, 0);
    //border-bottom-width: 1px;
    //border-bottom-color: rgba(0, 0, 0, 0.1);
    //border-bottom-style: solid;
    //border-radius: 8px;
    width: 125px;
    height: 150px;
    margin-left: 15px;
`
const CategoryCardImage = styled.Image`
    width: 125px;
    height: 125px;
    border-radius: 8px;

`
const CategoryCardText = styled.Text`
    margin-top: -72.5px;
    text-align: center;
    color: white;
`
const CategoryCardTextMinus = styled.Text`
    margin-top: -35.5px;
    text-align: center;
    color: white;
`

export const CategoryPost = ({name, imageUrl}) => {
    const {api_url} = useSelector(state => state.posts)
    let nameParts = [name];
    if (name.length > 13) {
        const words = name.split(' ');
        const midIndex = Math.floor(words.length / 2);
        const firstPart = words.slice(0, midIndex).join(' ');
        const secondPart = words.slice(midIndex).join(' ');
        nameParts = [firstPart, secondPart];
    }
    return (
        <CategoryCard>
            <CategoryCardImage source={{uri: `${api_url}/${imageUrl}`}}/>
            {
                name.length > 13 ? (
                    <>

                        <CategoryCardText>{nameParts[1]}</CategoryCardText>
                        <CategoryCardTextMinus>{nameParts[0]}</CategoryCardTextMinus>
                    </>
                ) : (
                    <CategoryCardText>{name}</CategoryCardText>

                )
            }

        </CategoryCard>
    );
}
