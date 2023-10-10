import './anime-list.css'

import { useEffect, useRef, useState } from "react"

import { useDispatch, useSelector } from 'react-redux'
import { addMany, removeById, selectById, selectImgsL } from "../../redux/slices/malSlice"
import { addLike, addDislike } from '../../redux/slices/animeProfileSlice'

import DraggableAnime from "../draggable-anime/draggable-anime"
import MyAnimeList from "../../services/mal"

import { collide } from '../block/block'

const AnimeList = props => {
  const dispatch = new useDispatch()
  const client = useRef(new MyAnimeList())



  const [id, setId] = useState({id: null, like: null})
  const selectAnime = useSelector(state => selectById(state, id['id']))



  useEffect(() => {
    client.current.loadThisSeasonAnime(data => dispatch(addMany(data)))
  }, [])
  useEffect(() => {
    if(selectAnime){
      dispatch(removeById(id['id']))

      if(id['like']){
        dispatch(addLike(selectAnime))
      }
      else{
        dispatch(addDislike(selectAnime))
      }
    }
  }, [id])



  const triggerStop = (poi, id) => {
    if(collide(props.like, poi)){
      setId({
        id: id,
        like: true
      })
    }
    else if(collide(props.dislike, poi)){
      setId({
        id: id,
        like: false
      })
    }
  }



  const imgs = useSelector(selectImgsL).map(imgsL => (
      <DraggableAnime
        src={imgsL.src}
        alt={imgsL.alt}
        key={imgsL.id}
        id={imgsL.id}
        triggerStop={triggerStop}
      />
  ))



  return <div className="anime-list black-border hide-scroll"> {imgs} </div>
}

export default AnimeList