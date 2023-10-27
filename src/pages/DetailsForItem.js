import React, {useEffect, useRef, useState} from "react";
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
import useLocalStorageState from 'use-local-storage-state'
import TrackList from "../components/Boxes/TrackList";
import Header, { LogoLink, NavLinks, NavLink as NavLinkBase } from "../components/headers/light";
import MusicAlbum from "../components/Models/AlbumModel";
import HelperFunctions, {returnOnlyHebrew} from "../helpers/HelperFunctions"
import {useParams} from "react-router-dom";
import * as url from "url";
const StyledHeader = styled(Header)`
  ${tw`justify-between`}
  ${LogoLink} {
    ${tw`mr-8 pb-0`}
  }
`;

const NavLink = tw(NavLinkBase)`
  sm:text-xl sm:mx-2
`;
const RightColumn = styled.div`
  background-image: url("https://www.fourstateshomepage.com/wp-content/uploads/sites/36/2023/03/Vinyl-Record-Player.jpg?w=900");
  ${tw`bg-green-500 bg-cover bg-center xl:ml-24 h-96 lg:h-auto lg:w-1/2 lg:flex-1`}
`;
const backgroundImageUrl= 'url("https://www.fourstateshomepage.com/wp-content/uploads/sites/36/2023/03/Vinyl-Record-Player.jpg?w=900")';

const PrimaryButton = tw(PrimaryButtonBase)`
  mt-auto 
  sm:text-lg
  rounded-none
  w-32 h-16 // Adjust the width and height for a square button
  
  py-2 px-4  // Adjust the padding to make it smaller
`;const port =3005;
function setAlbum(data){
    let album = {};
    album._id=data._id;
    album.Name=data.Name;
    album.Artist=data.Artist;
    album.Format=data.Format;
    album.Year=data.Year;
    album.TrackList=data.TrackList;
    album.uri=data.uri;
    return album;
}
const handleClickMoreDetails=(event)=>{
    const newTabUrl = event.target.dataset.link;

    if (newTabUrl) {
        // Open the URL in a new tab or window
        window.open(newTabUrl, "_blank");

        // You can add additional actions here
        // For example, you can perform a state update or any other logic you need.
    }
};
function DetailsForItem(){
    const {id}=useParams();
    const [musicObject,setMusicObject] = useState();



     useEffect(()=>{
         fetch(`http://localhost:${port}/api/asked/${id}`)
             .then((response) => {
                 if (response.status === 200) {
                     return response.json(); // This returns a Promise
                 } else {
                     console.log('Request failed with status ' + response.status);
                     throw new Error('Request failed with status ' + response.status);
                 }
             })
             .then((data) => {
                 console.log(data);
                 setMusicObject(data);

             })
             .catch((error) => {
                 console.log(error);
             });

         return ()=>{
             console.log('DetailsForItem unmount')
         }
     },[id]);



     if(!musicObject) {
         return <div>Loading...</div>
     }
    let navLinks = [
        <NavLinks key={1}>
            <NavLink href="/allCds">CDs</NavLink>
            <NavLink href="/allVinyls">Vinyls</NavLink>
            <NavLink href="#">AddCD</NavLink>
            <NavLink href="#">AddVinyl</NavLink>
            <NavLink href="#">Login</NavLink>
        </NavLinks>
    ];
    return (

        <AnimationRevealPage  >
            <StyledHeader links={navLinks} collapseBreakpointClass="sm" />

            <ImageForItem image={musicObject.Image}></ImageForItem>
            <Title name={musicObject.Name.split('=')[0]} artist={musicObject.Artist}
                   year={musicObject.Year} format={musicObject.Format} label={musicObject.label} country={musicObject.country}/>
            <TrackList TrackList={musicObject.TrackList}></TrackList>
            <PrimaryButton data-link={musicObject.uri} onClick={handleClickMoreDetails}>  More Details</PrimaryButton>

            <Footer />
        </AnimationRevealPage>
    );
}
export default DetailsForItem;
