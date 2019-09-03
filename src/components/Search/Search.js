/* global fetch */

import React, {Component} from 'react';
import './Search.css';

const api_key = 'e07b5f54';

class Search extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            movies: [],
            searchValue: '',
            movieDb: props.moviesData
        };
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
                    
            const moviesArr = [...this.props.moviesData];

            if (moviesArr.some(item => item.imdbID === data.imdbID)) {
                console.log("Postoji");
            } else {
                fetch(`https://movie-app-373ab.firebaseio.com/movie.json`, {
                    method: "POST",
                    body: JSON.stringify(data)
                })
                .then(response => {
                    response.json().then(r => {
                        data.id = r.name;
                        moviesArr.push(data);
                        this.setState({
                            movieDb: moviesArr
                        });

                        this.props.changeState(moviesArr);
                    });
                });
                
            }
    
            
        });
        
        this.resetInput();
    }
    
    resetInput = () => {
        const inputValue = document.getElementById('search-input');
        
        inputValue.value = "";
        
        this.setState({
          searchValue: ""
        });
    }
    
    
    
    // NE TREBA DA POSTOJI UOPSTE UL LISTA NA STRANICI AKO NIJE UKUCANO NI JEDNO SLOVO

    render(){
        return(
            <div className="search-wrapper">
                <input type="text" 
                       value={this.state.searchValue} 
                       onChange={this.getSearchValue}
                       id="search-input" />
                { this.state.searchValue.length > 2 ? 
                <ul className="search-list">
                    {this.state.movies.map((movie, index) =>
                        <li key={index} id={movie.imdbID} className="list-item" onClick={this.watchList}>
                            <p>{movie.Title} ({movie.Year})</p>
                            <span>+</span>
                        </li>
                    )}
                </ul> : null }
            </div>
        );
    }
};

export {Search};
