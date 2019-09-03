import React from 'react';
import './Header.css';
import {Search} from '../Search/Search'

const Header = (props) => (
	<header>
            <div className="container">
                <div className="header-wrapper">
                    <h1>Movie Watchlist</h1>
                    <Search moviesData={props.moviesData} renderState={props.getMovies} changeState={props.changeState}/>
                </div>
            </div>
	</header>
);

export {Header};