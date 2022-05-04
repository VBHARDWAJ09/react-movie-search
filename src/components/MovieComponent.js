import React from 'react'
import styled from 'styled-components'

const MovieContainer = styled.div`
    display:flex;
    flex-direction:column;
    padding:10px;
    width:280px;
    box-shadow:0 3px 10px 0 #aaa;
    cursor:pointer;
`;

const CoverImage = styled.img`
    height:362px;
    object-fit:cover;
`;
const MovieName = styled.span`
    font-size:18px;
    font-weight:600;
    color:black;
    margin:15px 0;
    white-space:nowrap;
    text-overflow:ellipsis;
    overflow:hidden;
`;
const InfoColumn = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
`;
const MovieInfo = styled.div`
    font-size:16px;
    font-weight:500;
    color:black;
    text-transform:capitalize;
`;

export default function MovieComponent(props) {
  return (
    <MovieContainer onClick={()=>props.onMovieSelect(props.movie.imdbID)}>
        <CoverImage src={props.movie.Poster}/>
        <MovieName>{props.movie.Title}</MovieName>
        <InfoColumn>
            <MovieInfo>Year:    {props.movie.Year}</MovieInfo>
            <MovieInfo>Type:    {props.movie.Type}</MovieInfo>
        </InfoColumn>
    </MovieContainer>
  )
}
