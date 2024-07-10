import './Card.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faMeh, faThumbsDown } from '@fortawesome/free-regular-svg-icons' 
import React from 'react'

const imgWidth = 230
const imgHeight = 326

const Card = React.memo(({anime}) => {
    const title = anime.title.english ? anime.title.english : anime.title.romaji
    return (
        <div 
            className={`d-flex flex-row mb-3 card-border p-3 card`}
        >
            <div className='d-flex flex-row'>
                <div style={{"width": imgWidth}} className='d-flex flex-column me-3 text-nowrap'>
                    <span className='card-title'>
                        { title }
                    </span>
                    <img height={imgHeight} src={anime.coverImage.large} alt={`coverImage: ${title}`}/>
                </div>
                <div className='d-flex flex-column justify-content-center'>
                    <span>{anime.description}</span>
                </div>
            </div>

            <div className='d-flex flex-column flex-grow-1 justify-content-around ms-3'>
                <FontAwesomeIcon icon={faThumbsUp} />
                <FontAwesomeIcon icon={faMeh} />
                <FontAwesomeIcon icon={faThumbsDown} />
            </div>
        </div>
    )
})

export default Card