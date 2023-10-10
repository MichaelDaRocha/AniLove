import './block.css'

const Block = props =>{
    return <div className='block black-border' style={{backgroundColor: props.color}} ref={props.refz}/>
}


const collide = (block, poi) => {
    const regex = /-?[0-9]+/g
    const left = poi.current.style.transform.match(regex)[0]
    const center = (parseInt(left) + poi.current.offsetLeft) + poi.current.offsetWidth/2
    
    return block.current.offsetLeft <= center && center <= block.current.offsetLeft + block.current.offsetWidth
}


export default Block

export {collide}