import React from 'react';
import './MovieCard.css';

const MovieCard = (props) => {
        const genre = props.movie.Genre;
        const genreArr = genre.split(" ");
        
        const genreFunc = () => {
            return genreArr.map((item, i) => {
                return (
                    <span key={i}>{item} </span>
                );
            });
        };
        
        
        return(
            <div className="movie-card" id={props.movie.id}>
                <div className="d-flex movie-details">
                    <h1 className="movie-rating">{props.movie.imdbRating}</h1>
                    <h1 className="movie-title">{props.movie.Title}</h1>
                    <div className="d-flex ml-auto">
                        
                        <span className="fa fa-eye eye" onClick={props.onListUpdate}></span>
                        <span className="fa fa-trash-o trash" onClick={props.onDelete}></span>
                    </div>
                </div>
                <div className="movie-genre">{genreFunc()}</div>
            </div>
        );
};

export {MovieCard};