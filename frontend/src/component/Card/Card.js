
const Card = props => {
    
    return <img height='150px' width='100px' key={props.count} src={props.anime.coverImage.medium}></img>
}

export default Card