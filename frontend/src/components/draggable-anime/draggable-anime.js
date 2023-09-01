import React from 'react'
import Draggable from 'react-draggable'

import './draggable-anime.css'

const DraggableAnime = props => {
    

    return (
        <Draggable
            axis='x'
            key={props.id}
        >
            <img
                className='pulse-hover anime-div'
                src={props.src}
                alt={props.alt}
                key={props.id}
                draggable='false'
            />
        </Draggable>
    )
}

export default DraggableAnime