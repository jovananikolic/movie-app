/* global fetch */

import React, {Component, Fragment} from 'react';
import './Search.css';

const api_key = 'e07b5f54';

class Search extends Component {

    state = {
        movies: [],
        searchValue: '',
        movieList: []
    }
    
    getMovies = () => {
        if(this.state.searchValue.length > 2){
            fetch(`http://www.omdbapi.com/?apikey=${api_key}&type=movie&s=${this.state.searchValue}`)
                .then(response => {
                    return response.json();
                })
                .then(data => this.renderMovies(data));
        } else {
            this.setState({
                movies: []
            });
        }
    }
    
    renderMovies = (data) => {
        if(data.Response === "True"){
            this.setState({
                movies: data.Search
            });
        } else {
            this.setState({
                movies: []
            });
        }
    }
    
    getSearchValue = (e) => {
        this.setState({
          searchValue: e.target.value
        }, () => {
            this.getMovies();
        });
    }
    
    watchList = (e) => {
        const movieId = e.target.closest("li").id;
        
        fetch(`http://www.omdbapi.com/?apikey=${api_key}&type=movie&i=${movieId}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            data.watchType = "toWatch";
    
            // TREBA SETOVATI STATE I UPOREDITI PODATKE IZ STATE-A SA FILMOM KOJI
            // HOCEMO DA DODAMO U FIREBASE, DA SE NE BI DOGODILO DUPLIRANJE FILMOVA
    
            fetch(`https://movie-app-373ab.firebaseio.com/movie.json`, {
                method: "POST",
                body: JSON.stringify(data)
            });
            
        });
    }
    
    // NE TREBA DA POSTOJI UOPSTE UL LISTA NA STRANICI AKO NIJE UKUCANO NI JEDNO SLOVO

    render(){
        return(
            <div className="search-wrapper">
                <input type="text" 
                       value={this.state.searchValue} 
                       onChange={this.getSearchValue} />
                <ul className="search-list">
                    {this.state.movies.map((movie, index) =>
                        <li key={index} id={movie.imdbID} className="list-item" onClick={this.watchList}>
                            <p>{movie.Title} ({movie.Year})</p>
                            <span>+</span>
                        </li>
                    )}
                </ul>
            </div>
        );
    }
};

export {Search};
