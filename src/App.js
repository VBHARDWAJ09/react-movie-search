import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import MovieComponent from './components/MovieComponent';
import MovieInfoComponent from './components/MovieInfoComponent';

const Container = styled.div`
  display:flex;
  flex-direction:column;  
`;
const Header = styled.div`
  display:flex;
  flex-direction:row;
  background-color:black;
  color:white;
  padding:10px;
  font-size:25px;
  align-items:center;
  font-weight:bold;
  box-shadow:0 3px 6px 0 #555;
  justify-content:space-between;
`;
const AppName=styled.div`
  display:flex;
  flex-direction:row;
  align-items:center;
`;
const MovieImage = styled.img`
  width:48px;
  height:48px;
  margin:15px;
`;

const SearchBox = styled.div`
  display:flex;
  flex-direction:row;
  padding:10px 10px;
  background-color:white;
  border-radius:6px;
  margin-left:20px;
  width:50%;
  align-items:center;
`;
const SearchIcon = styled.img`
  width32px;
  height:32px;
`;
const SearchInput = styled.input`
  color:black;
  font-size:16px;
  font-weight:bold;
  margin-left:15px;
  outline:none;
  border:none;
`;

const MovieListContainer = styled.div`
  display:flex;
  flex-direction:row;
  flex-wrap:wrap;
  padding:30px 0px;
  gap:20px;
  justify-content:space-evenly;
`;
const PlaceHolder = styled.img`
  width:120px;
  height:120px;
  margin:150px;
  opacity:60%;

`;

export const API_KEY = `3140012f`;


function App() {
  const [searchQuery,updateSearchQuery] = useState()
  const [timeOutId,updateTimeOutId] = useState();
  const [movieList,updateMovieList] = useState([]);
  const [selectedMovie,onMovieSelect] = useState();

  const fetchData =async(searchString)=>{
    const response = await axios.get(`https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`)
    console.log(response);
    updateMovieList(response.data.Search);
  }

  const onTextChange =(event)=>{
    clearTimeout(timeOutId)
    updateSearchQuery(event.target.value);
    const timeout = setTimeout(()=>fetchData(event.target.value),500);
    updateTimeOutId(timeout);
  }

  return (<div>
    <Header>
    <AppName>
    <MovieImage src='/movie-icon.svg'/>
      React Movie App</AppName>
    <SearchBox>
    <SearchIcon src='/search-icon.svg'></SearchIcon>
    <SearchInput placeholder='Search Movie here' value={searchQuery} onChange={onTextChange}></SearchInput>
    </SearchBox>
    </Header>
    {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}></MovieInfoComponent>}
    <MovieListContainer>
      {movieList?.length ?movieList.map((movie,index)=><MovieComponent key={index} movie ={movie} onMovieSelect={onMovieSelect}/>):<PlaceHolder src='/movie-icon.svg'></PlaceHolder>}
      {/* <MovieComponent></MovieComponent> */}
    </MovieListContainer>
    </div>
  );
}

export default App;
