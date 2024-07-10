import './Rate.css'

import { gql, useLazyQuery } from '@apollo/client'
import { GENERATE } from '../../graphql/Query'

import Card from "../Card/Card"

import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';

const itemWindow = {}
const itemWindowMeta = {page: 1, windowLen: 0, index: 0, hasNextPage: true}

const fetchLogic = (_fetch, _refresh) => () => {
    _fetch({variables: {page: itemWindowMeta['page']}})
    .then(res => {
        let loc = itemWindowMeta['index']
        for(let i = 0; i < res.data.generate.media.length; ++i, ++loc)
            itemWindow[loc] = res.data.generate.media[i]
        
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
    
    const fetch = fetchLogic(_fetch, _refresh)

    useEffect(() => fetch(), 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    [])

    return (
        <div className='rate'>
            <div className="pt-2">
                <InfiniteScroll
                    dataLength={itemWindowMeta['windowLen']}
                    next={fetch}
                    hasMore={itemWindowMeta['hasNextPage']}
                    loader={<div>Loading...</div>}
                >
                    { Object.keys(itemWindow).map(i => <Card anime={itemWindow[i]} key={i}/>) }
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default Rate