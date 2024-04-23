import './Card.css'

import { useSelector } from 'react-redux'
import { selectDarkMode } from '../../redux/slices/darkModeSlice'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faMeh, faThumbsDown } from '@fortawesome/free-regular-svg-icons' 

const imgWidth = 230
const imgHeight = 326

const Card = props => {
    const isDarkMode = useSelector(selectDarkMode)


    return (
        <div 
            key={props.count} 
            className={`d-flex flex-row gap-5 card-border p-3 ${isDarkMode ? 'card-dark' : 'card-light'}`}
        >
            <div className='d-flex flex-row'>
                <div style={{"width": imgWidth}} className='d-flex flex-column me-3 text-nowrap'>
                    <span className='card-title'>
                        {props.anime.title.english ? props.anime.title.english : props.anime.title.romaji}
                    </span>
                    <img height={imgHeight} src={props.anime.coverImage.large}/>
                </div>
                <div className='d-flex flex-column justify-content-center'>
                    <text>{props.anime.description}</text>
                </div>
            </div>

            <div className='d-flex flex-column flex-grow-1 justify-content-around ms-3'>
                <FontAwesomeIcon icon={faThumbsUp} />
                <FontAwesomeIcon icon={faMeh} />
                <FontAwesomeIcon icon={faThumbsDown} />
            </div>
        </div>
    )
}

export default Card