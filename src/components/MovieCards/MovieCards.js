import React, {Component, Fragment} from 'react';
import './MovieCards.css';

class MovieCards extends Component {
    
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
            
            console.log(this.state.movieDb);
        });
    }
    
    componentDidMount() {
        this.getMovieData();
    }
    
    render(){
        return(
                <div>Hello</div>
        );
    }
};

export {MovieCards};