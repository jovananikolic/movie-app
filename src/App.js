import React, {Component, Fragment} from 'react';
import './App.css';

import {Header} from './components/Header/Header';
import {MovieCards} from './components/MovieCards/MovieCards';

class App extends Component {
    
    state = {
        movieDb: []
    }
    //initial fetch that gets the cards from firebase database
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
        });
    }
    
    //Removes the clicked card movie from base and from state
    onCardDelete = (e) => {
        const deletedMovie = e.target.closest(".movie-card").id;
        const movieData = [...this.state.movieDb];
        
        fetch(`https://movie-app-373ab.firebaseio.com/movie/${deletedMovie}.json`, {
            method: "DELETE"
        });

        const filtered = movieData.findIndex(item => {
            return item.id === deletedMovie;
        });

        const spliced = movieData.splice(filtered, 1);
        
        this.setState({
            movieDb: movieData
        });

    }
    
    //moves the clicked movie card to Watched section
    
    onListUpdate = (e) => {
        const updateMovie = e.target.closest(".movie-card").id;
        const movieData = [...this.state.movieDb];
        
        const filtered = movieData.findIndex(item => {
            return item.id === updateMovie;
        });
        
        movieData[filtered].watchType = "watched";
        
        this.setState({
            movieDb: movieData
        });
        
        fetch(`https://movie-app-373ab.firebaseio.com/movie/${updateMovie}.json`, {
            method: "DELETE"
        })
        .then(data => {
            fetch(`https://movie-app-373ab.firebaseio.com/movie.json`, {
                method: "POST",
                body: JSON.stringify(movieData[filtered])
            });
        });
    }
    
    componentDidMount() {
        this.getMovieData();
    }
    changeParentstate = (newState) => {
        this.setState({
            movieDb: newState
        });
    }
    
    // makes the card move up by one place
    moveUp = (e) => {
//        const movieId = e.target.closest(".movie-card").id;
//        
//        let newState = [...this.state.movieDb];
//        const findedIndex = newState.findIndex(item=>{
//            return item.id === movieId;
//        });
//        
//       let lastIndex = newState[findedIndex - 1];
//       newState[findedIndex - 1] = newState[findedIndex];
//       newState[findedIndex] = lastIndex;
//       
//       this.setState({
//           moviesDb: newState
//       })
        console.log("ees")
        
    }
    
    //sort cards by rating  
//    sortByRating = () => {
//        const  newArr = [...this.state.movieDb];
//        
//        console.log(newArr)
//        
//    }
    render(){
        return (
            <Fragment>
              <Header getMovies={this.getMovieData} moviesData={this.state.movieDb} changeState={this.changeParentstate} />
              {this.state.movieDb && this.state.movieDb.length ? 
              <MovieCards type="toWatch" 
                          passData={this.state.movieDb}
                          cardDelete={this.onCardDelete}
                          onListUpdate={this.onListUpdate}
                          label="Watch List"
                          onMoveUp={this.moveUp}/> : null}
              {this.state.movieDb && this.state.movieDb.length ?
              <MovieCards type="watched"
                          passData={this.state.movieDb}
                          cardDelete={this.onCardDelete}
                          label="Watched"
                          onMoveUp={this.moveUp}
                          /> : null }
            </Fragment>
        );
    }
};

export default App;
