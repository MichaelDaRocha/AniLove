import './Card.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faMeh, faThumbsDown } from '@fortawesome/free-regular-svg-icons' 
import React from 'react'

const imgWidth = 230
const imgHeight = 326

const Card = React.memo(({anime, like, neutral, dislike}) => {
    console.log('card render')
    const title = anime.title.english ? anime.title.english : anime.title.romaji
    return (
        <div 
            className='d-flex flex-row mb-3 card-border p-3 card'
        >
            <div className='d-flex flex-row flex-grow-1'>
                <div style={{"width": imgWidth}} className='d-flex flex-column me-3 text-nowrap'>
                    <span className='card-title'>
                        { title }
                    </span>
                    <img height={imgHeight} src={anime.coverImage.large} alt={`coverImage: ${title}`}/>
                </div>
                <div className='d-flex flex-column justify-content-end'>
                    <div className='card-span'  style={{"height": imgHeight}}>
                        <span className='d-flex align-items-center'>
                            {anime.description}
                        </span>
                    </div>
                </div>
            </div>

            <div className='d-flex flex-column justify-content-around ms-3 card-rating'>
                <FontAwesomeIcon icon={faThumbsUp} className={`${anime._state === 'like' ? 'like' : ''}`} onClick={() => like(anime)}/>
                <FontAwesomeIcon icon={faMeh} className={`${anime._state === 'neutral' ? 'neutral' : ''}`} onClick={() => neutral(anime)} />
                <FontAwesomeIcon icon={faThumbsDown} className={`${anime._state === 'dislike' ? 'dislike' : ''}`} onClick={() => dislike(anime)} />
            </div>
        </div>
    )
})

export default Card