import React from 'react';
import './Header.css';
import {Search} from '../Search/Search'

const Header = (props) => (
	<header>
            <div className="container">
                <div className="header-wrapper">
                    <h1>Movie Watchlist</h1>
                    <Search />
                </div>
            </div>
	</header>
);

export {Header};