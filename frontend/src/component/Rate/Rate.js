import './Rate.css'

import { useQuery, gql } from "@apollo/client"
import { GENERATE } from "../../graphql/Query"

import { useState } from "react"
import { useSelector } from 'react-redux'
import { selectDarkMode } from '../../redux/slices/darkModeSlice'

import Spinner from "react-bootstrap/Spinner"
import Card from "../Card/Card"

const Rate = () => {
    const isDarkMode = useSelector(selectDarkMode)
    const [pageNum, setPageNum] = useState(1)
    const {loading, data, refetch} = useQuery(
        gql(GENERATE),
        {
            variables: {page: pageNum}
        }
    )

    const render = 
        loading ? 
        <Spinner animation="border" /> :
        [...data.generate.media].map((anime, count) => <Card anime={anime} count={count} />)
        
    
    return (
        <div className={isDarkMode ? 'rate-dark': 'rate-light'}>
            <div className="rate-container rate-flex pt-2">
                {render}
            </div>
        </div>
    )
}

export default Rate