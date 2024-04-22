import { useQuery, gql } from "@apollo/client"
import { useState } from "react"
import Spinner from "react-bootstrap/Spinner"

import { GENERATE } from "../../graphql/Query"
import Card from "../Card/Card"

const Rate = () => {
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
        <div>
            {render}
        </div>
    )
}

export default Rate