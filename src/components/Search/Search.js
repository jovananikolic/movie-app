/* global fetch */

import React, {Component, Fragment} from 'react';
import './Search.css';

const api_key = 'e07b5f54';

class Search extends Component {

    state = {
        movies: [],
        searchValue: ''
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
            
            fetch(`https://movie-app-373ab.firebaseio.com/movie.json`, {
                method: "POST",
                body: JSON.stringify(data)
            });
        });
    }
    

    render(){
        return(
            <Fragment>
                <input type="text" 
                       value={this.state.searchValue} 
                       onChange={this.getSearchValue} />
                <ul className="search-wrapper">
                    {this.state.movies.map((movie, index) =>
                        <li key={index} id={movie.imdbID} className="list-item" onClick={this.watchList}>
                            <p>{movie.Title}</p>
                            <span>+</span>
                        </li>
                    )}
                </ul>
            </Fragment>
        );
    }
};

export {Search};
