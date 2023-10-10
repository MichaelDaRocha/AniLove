import React, { useRef } from 'react'
import Draggable from 'react-draggable'

import './draggable-anime.css'

const DraggableAnime = props => {
    const ref = useRef(null)
    const block = useRef(null)


    const onDrag = event => {
        event.preventDefault()
        ref.current.style.position = 'absolute'
    }
    const onStart = event => {
        event.preventDefault()

        ref.current.style.width = `${ref.current.offsetWidth}px`
        ref.current.style.height = `${ref.current.offsetHeight}px`

        block.current.style.minWidth = `${ref.current.offsetWidth}px`
        block.current.style.minHeight = `${ref.current.offsetHeight}px`
    }
    
    const onStop = event => {
        event.preventDefault()
        props.triggerStop(ref, props.id)

        // neither like or dislike
        ref.current.style.position = ''
        ref.current.style.width = '100%'
        ref.current.style.height = ''
        ref.current.style.transform = ''

        block.current.style.minWidth = ''
        block.current.style.minHeight = ''
    }


    return (
        <div ref={block}>
            <Draggable 
                key={props.id} 
                onDrag={onDrag} 
                onStart={onStart}
                onStop={onStop}
                position={{x: 0, y: 0}}
            >
                <img
                    style={{width: '100%'}}
                    src={props.src}
                    alt={props.alt}
                    key={`img-${props.id}`}
                    draggable='false'
                    ref={ref}
                />
            </Draggable>
        </div>
    )
}

export default DraggableAnime