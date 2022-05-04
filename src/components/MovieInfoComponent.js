import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API_KEY } from '../App';

const Container = styled.div`
    display:flex;
    flex-direction:row;
    padding:20px 30px;
    justify-content:center;
    border-bottom:1px solid lightgray;
`;
const CoverImage = styled.img`
    object-fit:cover;
    height:352px;
`;
const InfoColumn = styled.div`
    display:flex;
    flex-direction:column;
    margin:20px;
`;
const MovieName = styled.span`
    font-size:18px;
    font-weight:600;
    color:black;
    margin:15px 0;
    white-space:nowrap;
    text-overflow:ellipsis;
    text-transform:capitalize;
    overflow:hidden;
`;
const MovieInfo = styled.span`
    font-size:16px;
    font-weight:500;
    color:black;
    overflow:hidden;
    margin:4px 0px;
    text-overflow:ellipsis;
    text-transform:capitalize;
    & span{
        // opacity:0.7;
        color:blue;
    }
`;
const Close = styled.span`
    font-size:16px;
    font-weight:600;
    color:black;
    background:lightgray;
    height:fit-content;
    padding:8px;
    border-radius:50%;
    cursor:pointer;
    opacity:0.8;
`;

export default function MovieInfoComponent(props) {
    const [movieInfo, setMovieInfo] = useState();
    useEffect(() => {
        axios
            .get(`https://www.omdbapi.com/?i=${props.selectedMovie}&apikey=${API_KEY}`)
            .then((response) => { setMovieInfo(response.data) })
    }, [props.selectedMovie])
    return (
        <Container>
            {movieInfo ? <>
                <CoverImage src={movieInfo?.Poster} />
                <InfoColumn>
                    <MovieName>{movieInfo?.Type}: {movieInfo?.Title}</MovieName>
                    <MovieInfo>Year:<span>{movieInfo?.Year}</span></MovieInfo>
                    <MovieInfo>Language:<span>{movieInfo?.Language}</span></MovieInfo>
                    <MovieInfo>Rated:<span>{movieInfo?.Rated}</span></MovieInfo>
                    <MovieInfo>Released:<span>{movieInfo?.Released}</span></MovieInfo>
                    <MovieInfo>Runtime:<span>{movieInfo?.Runtime}</span></MovieInfo>
                    <MovieInfo>Genre:<span>{movieInfo?.Genre}</span></MovieInfo>
                    <MovieInfo>Director:<span>{movieInfo?.Director}</span></MovieInfo>
                    <MovieInfo>Actors:<span>{movieInfo?.Actors}</span></MovieInfo>
                    <MovieInfo>Plot:<span>{movieInfo?.Plot}</span></MovieInfo>
                </InfoColumn>
                <Close onClick={() => props.onMovieSelect()}>X</Close>
            </> : <h3>Loading...</h3>}

        </Container>
    )
}
