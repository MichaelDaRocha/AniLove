import './Rate.css'

import { gql, useLazyQuery } from '@apollo/client'
import { GENERATE } from '../../graphql/Query'

import Card from "../Card/Card"

import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux'
import { like, neutral, dislike } from '../../redux/slices/rateSlice';

const itemWindow = {}
const itemIdToLoc = {}
const itemWindowMeta = {page: 1, windowLen: 0, index: 0, hasNextPage: true}

const fetchLogic = (_fetch, _refresh) => () => {
    _fetch({variables: {page: itemWindowMeta['page']}})
    .then(res => {
        let loc = itemWindowMeta['index']
        for(let i = 0; i < res.data.generate.media.length; ++i, ++loc){
            itemWindow[loc] = res.data.generate.media[i]
            itemIdToLoc[res.data.generate.media[i].id] = loc
        }
        
        itemWindowMeta['page'] += 1
        itemWindowMeta['windowLen'] += res.data.generate.media.length
        itemWindowMeta['index'] = loc
        itemWindowMeta['hasNextPage'] = res.data.generate.pageInfo.hasNextPage

        _refresh(prev => !prev)
    })
}



const Rate = () => {
    const [ ,  _refresh ] = useState(false)
    const [ _fetch ] = useLazyQuery(gql(GENERATE))
    const fetch = useRef(fetchLogic(_fetch, _refresh))

    const dispatch = useRef(useDispatch())
    const helper = useRef(rateFunc => anime => {
        delete itemWindow[itemIdToLoc[anime.id]]
        itemWindowMeta['windowLen'] -= 1
        dispatch.current(rateFunc(anime))
        itemWindowMeta['windowLen'] <= 10 ? fetch.current(_fetch, _refresh) : _refresh(prev => !prev)
    })
    const likeRef = useRef(helper.current(like))
    const neutralRef = useRef(helper.current(neutral))
    const dislikeRef = useRef(helper.current(dislike))


    useEffect(() => fetch.current(), [])


    return (
        <div className='rate'>
            <div className="pt-2">
                <InfiniteScroll
                    dataLength={itemWindowMeta['windowLen']}
                    next={fetch.current}
                    hasMore={itemWindowMeta['hasNextPage']}
                    loader={<div>Loading...</div>}
                >
                    { Object.keys(itemWindow).map(i => <Card anime={itemWindow[i]} like={likeRef.current} neutral={neutralRef.current} dislike={dislikeRef.current} key={i}/>) }
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default Rate