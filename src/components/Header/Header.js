import React from 'react';
import './Header.css';
import {Search} from '../Search/Search'

const Header = () => (
	<header>
		<h1>Movie Watchlist</h1>
		<Search />
	</header>
);

export {Header};