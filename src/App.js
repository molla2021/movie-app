import { useState, useEffect } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import FilmList from './components/FilmList';
import { FilmListHeading } from './components/FilmListHeading';
import { SearchBox } from './components/SearchBox';
import AddFavorites from './components/AddFavorites';
import RemoveFavorites from './components/RemoveFavorites';

const App =() => {
  const [films, setFilms] = useState([]);
  const [favoriteFilms, setFavoriteFilms] = useState([]);

  //making the searching dynamic
  const [searchFilm, setSearchFilm] = useState('');

  const getFilmRequest = async (searchFilm) => {
    //make request to the api
    const url = `http://www.omdbapi.com/?s=${searchFilm}&apikey=921dc2da`;

    const response = await fetch(url);
    //convert the response to json
    const responseJson = await response.json();
    
    //to replace hardcoded data with api data
    if(responseJson.Search) {
      setFilms(responseJson.Search);
    }
  };
  //calling the getfilmrequest
  //it is called when the page load
  useEffect(() => {
    getFilmRequest(searchFilm);
      
    }, [searchFilm]);

    // get data from local storage
  useEffect(() => {
    const filmFavorites = JSON.parse(
      localStorage.getItem('your-favorites')
    );
    
    if(filmFavorites) {
      setFavoriteFilms(filmFavorites);
    }
    
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('your-favorites', JSON.stringify(items))
  }

  const addFavoriteFilm = (film) => {
  const newFavoriteList = [...favoriteFilms, film];
      setFavoriteFilms(newFavoriteList);
      saveToLocalStorage(newFavoriteList);//saved
     
    };
    const removeFavoriteFilm = (film) => {
      const newFavoriteList = favoriteFilms.filter(
        (favoriteFilm) => favoriteFilm.imdbID !== film.imdbID);
        setFavoriteFilms(newFavoriteList);
        saveToLocalStorage(newFavoriteList);//removed
      
    };
  return (
    <div className="App container-fluid film-css">
      <div className="row d-flex align-items-center mb-4">
        <FilmListHeading heading="Movies Search App "/>
        <SearchBox 
          searchFilm = {searchFilm} 
          setSearchFilm = {setSearchFilm}/>
      </div>
      <div className='row'>
      <FilmList films = {films}  
        favoritesChosen={addFavoriteFilm} 
        favorites = {AddFavorites} />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <FilmListHeading heading="Your Favorites"/>
      </div>
      <div className='row'>
      <FilmList 
        films= {favoriteFilms} 
          favoritesChosen={removeFavoriteFilm}
          favorites = {RemoveFavorites}/>
      </div>
      
    </div>
  );
}

export default App;
