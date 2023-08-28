import React from "react";
import { useEffect,useState } from "react";
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard.jsx';
import Footer from './Footer.jsx';


const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey='+API_KEY;


// we want to fetch data as soon as this component loads , so we will use  "useEffect" hook
const App = () => {

  const [movies , setMovies] = useState([]);
  const [searchTerm , setSearchTerm] = useState('');



  const searchMovies =  async (title) => {

    if (title.length === 0){
      return;
    }

    let result = '';
    for (let i = 0; i < title.length; i++) {
      const currentChar = title[i];
      const nextChar = title[i + 1];
      if (/[a-zA-Z]/.test(currentChar) && /\d/.test(nextChar)) {
        result += currentChar + ' '; // Insert a space after the alphabet character
      } else {
        result += currentChar; // Keep other characters as they are
      }
    }
    let c = API_URL+'&s='+result;
    console.log(c);
    const response = await fetch(`${API_URL}&s=${result}`);
    const data  = await response.json();
    if (data.Response ==='True') {
      setMovies(data.Search);
    }
    else {
      return alert("Enter correct name");
    }
  }


  useEffect(()=>{
    searchMovies('superman');

  },[]);


  return (
    <div className="app">
      <h1>FILM SHILM</h1>

      <div className="search">
        <input placeholder="Search for movies" value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}></input>
        
        <img src={SearchIcon} alt="search"
        onClick={() => searchMovies(searchTerm)}></img>
      </div>

      {
        movies.length > 0 
        ? (
          <div div className="container">
            {
              movies.map((movie) => (<MovieCard movie={movie} />))
            }
              
          </div>
        ):(
          <div className="empty">
            <h2>
              No movies found
            </h2>
          </div> 
        )
      }
      <Footer />
    

      
    </div>
  );
}

export default App;