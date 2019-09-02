import React from 'react';
import './MovieCard.css';

const MovieCard = (props) => {
        const genre = props.movie.Genre;
        const genreArr = genre.split(" ");
        
        const genreFunc = () => {
            return genreArr.map(item => {
                return (
                    <span>{item} </span>
                );
            });
        };
        
        return(
            <div className="movie-card" id={props.movie.id}>
                <div className="d-flex">
                    <h1>{props.movie.imdbRating}</h1>
                    <h1>{props.movie.Title}</h1>
                    <span onClick={props.onDelete}>DELETE</span>
                    <span onClick={props.onListUpdate}>OKO</span>
                </div>
                <div>{genreFunc()}</div>
            </div>
        );
};

export {MovieCard};