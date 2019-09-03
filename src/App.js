import React, {Component, Fragment} from 'react';
import './App.css';

import {Header} from './components/Header/Header';
import {MovieCards} from './components/MovieCards/MovieCards';

class App extends Component {
    
    state = {
        movieDb: []
    }
    
    getMovieData = () => {
        fetch(`https://movie-app-373ab.firebaseio.com/movie.json`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            
            const movies = [];
            
            for (let movie in data) {
                data[movie].id = movie;
                movies.push(data[movie]);
            }
            
            this.setState({
               movieDb: movies
            });
            
            console.log("Movie was clicked", movies);
        });
    }
    
    onCardDelete = (e) => {
        const deletedMovie = e.target.closest(".movie-card").id;
        
        fetch(`https://movie-app-373ab.firebaseio.com/movie/${deletedMovie}.json`, {
            method: "DELETE"
        })
        .then(response => {
            this.getMovieData();
        });
    }
    
//    onListUpdate = (e) => {
//        const updateMovie = e.target.closest(".movie-card").id;
//        
//        fetch(`https://movie-app-373ab.firebaseio.com/movie/${updateMovie}.json`)
//        .then(response => {
//            return response.json();
//        })
//        .then(data => {
//            data.watchType = "watched";
//    
//            this.getMovieData();
//            
//            fetch(`https://movie-app-373ab.firebaseio.com/movie.json`, {
//                method: "POST",
//                body: JSON.stringify(data)
//            })
//            .then(response => {
//                this.getMovieData(); 
//            })
//            .then(data => {
//                fetch(`https://movie-app-373ab.firebaseio.com/movie/${updateMovie}.json`, {
//                    method: "DELETE",
//                    body: JSON.stringify(data)
//                })
//                .then(this.getMovieData());
//            });
//        });
//        
//        
//    }
    
    componentDidMount() {
        this.getMovieData();
    }
    
    render(){
        return (
            <Fragment>
              <Header getMovies={this.getMovieData} moviesData={this.state.movieDb} />
              {this.state.movieDb && this.state.movieDb.length ? 
              <MovieCards type="toWatch" 
                          passData={this.state.movieDb}
                          cardDelete={this.onCardDelete}
                          onListUpdate={this.onListUpdate}
                          label="Watch List" /> : null}
              {this.state.movieDb && this.state.movieDb.length ?
              <MovieCards type="watched"
                          passData={this.state.movieDb}
                          cardDelete={this.onCardDelete}
                          label="Watched" /> : null }
            </Fragment>
        );
    }
};

export default App;
