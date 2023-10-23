import React, {useEffect, useState} from "react";
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import {SectionHeading} from "components/misc/Headings";
import {PrimaryButton as PrimaryButtonBase} from "components/misc/Buttons";
import {ReactComponent as ChevronLeftIcon} from "feather-icons/dist/icons/chevron-left.svg";
import {ReactComponent as ChevronRightIcon} from "feather-icons/dist/icons/chevron-right.svg";
import {Container} from "../components/misc/Layouts";
import AnimationRevealPage from "../helpers/AnimationRevealPage";
import Hero from "../components/hero/FullWidthWithImage";
import Footer from "../components/footers/MiniCenteredFooter";
import Title from "../components/Boxes/Title";
import ImageForItem from "../components/Boxes/ImageForItem";

import TrackList from "../components/Boxes/TrackList";
import {NavLink, useParams} from "react-router-dom";
import Header, { LogoLink, NavLinks, NavLink as NavLinkBase } from "../components/headers/light.js";

const port =3005;
function DetailsForItem(){
    const {id}=useParams();
    const [card,setCard]=useState({});
    console.log(id);
    // useEffect(()=>{
    //     console.log('Component rendering...');
    //
    // },[id]);
   fetch(`http://localhost:${port}/api/asked/${id}`, {
        method: "GET"
    })
        .then((response) => {
            console.log(response);
            if (response.status === 200) {
                return response.json(); // This returns a Promise
            } else {
                console.log('Request failed with status ' + response.status);
                throw new Error('Request failed with status ' + response.status);

            }
        })
        .then((data) => {
            console.log(data);
            setCard(data); // Call setCards with the data after it has been fully processed
        })
        .catch((error) => {
            console.log(error);
        });
    console.log(card);
    console.log(card[id].Year);
    return (
        <AnimationRevealPage>
            {/*<NavLinks key={1}>*/}
            {/*    <NavLink href="#">CDs</NavLink>*/}
            {/*    <NavLink href="#">Vinyls</NavLink>*/}
            {/*    <NavLink href="#">AddCD</NavLink>*/}
            {/*    <NavLink href="#">AddVinyl</NavLink>*/}
            {/*    <NavLink href="#">Login</NavLink>*/}
            {/*</NavLinks>*/}
            <Title name={card[id].Name} artist={card[id].Artist}
                   year={card[id].Year} format={card[id].Format}/>
            <ImageForItem image={card[id].Image}></ImageForItem>
            <TrackList TrackList={card[id].TrackList}></TrackList>
            <Footer />
        </AnimationRevealPage>
    );
}
export default DetailsForItem;