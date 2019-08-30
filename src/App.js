import React, {Component, Fragment} from 'react';
import './App.css';

import {Header} from './components/Header/Header';
import {MovieCards} from './components/MovieCards/MovieCards';

class App extends Component {
    
//    state = {
//        searchList: false
//    }
//    
//    onSearchList = () => {
//        this.setState({
//            searchList: true
//        });
//    }
    
    render(){
        return (
            <Fragment>
              <Header />
              <MovieCards />
            </Fragment>
        );
    }
};

export default App;
