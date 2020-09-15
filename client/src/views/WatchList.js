import React from 'react'
import { GET_WATCH_LIST } from '../queries'
import { useQuery } from '@apollo/client'

import NavBar from '../components/NavBar'
import CardList from '../components/list-card'

const WatchList = () => {
    const {loading, error, data} = useQuery(GET_WATCH_LIST)
    if(loading) return <p>Loading...</p>
    if(error) return <p>error...(JSON.stringify(error))</p>
    return (
        <div className="home">
            <NavBar />
            <div className="home-page">
                <div className="sub-nav">
                    <h1 className="list-title">Your's Watch List</h1>
                </div>
                <div className="container">
                    <div className="container-list">
                        {!data.watchList.length ? <h1 className="no-file">No Such File</h1>
                        
                        : data.watchList.map((list, idx) => (
                            <CardList key={idx} list={list}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WatchList