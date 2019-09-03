import React from 'react';
import './MovieCards.css';

import {MovieCard} from '../MovieCard/MovieCard';

const MovieCards = (props) => {
    
    const renderCards = () => {
        return props.passData.map((item, i) => {
            if (item.watchType === props.type) {
                return(
                    <MovieCard movie={item} key={i} onDelete={props.cardDelete} onListUpdate={props.onListUpdate} onMoveUp={props.onMoveUp} />
                );
            }
        });
    };
    
    return(
        <div className="cards-wrapper">
            <h1>{props.label}</h1>
            {renderCards()}
        </div>
    );
};

export {MovieCards};