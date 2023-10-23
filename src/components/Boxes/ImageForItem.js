import React, {useEffect, useState} from "react";
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";

const CardImage = styled.div(props => [
    `background-image: url("${props.imageSrc}");`,
    tw`w-full max-w-64 sm:h-64 bg-cover bg-left rounded sm:rounded-none sm:rounded-tl-4xl aspect-square`
]);
function imageForItem(props){
    return <div>
         <CardImage imageSrc={props.image}>
         </CardImage>
    </div>;
}
export default imageForItem;