import './body.css';
import MyAnimeList from '../../services/mal';
import {useState} from 'react';

function Body() {
  const [data, setData] = useState([])

  const client = new MyAnimeList()
  const date = new Date()

  const loader = (newData) => {
    setData(prev => [...prev, ...newData])
  }

  return (
    <>
    <div className="Body">
      <button onClick={() => client.loadSeasonalAnime(date.getFullYear(), date.getMonth(), loader)}></button>
    </div>

      <div className='flex'>
        {data.map(val => (
          <img 
            src={val.node.main_picture.large}
            height={200}
            width={150}
          />
        ))}
      </div>
    </>
  );
}

export default Body;
