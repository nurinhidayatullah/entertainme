import React from 'react'
import NavBar from '../components/NavBar'
import {useQuery} from '@apollo/client'
import {Link} from 'react-router-dom'
import {FETCH_MOVIE} from '../queries'
import Poster from '../components/coursel'
const Landing = () => {
    const {loading, error, data} = useQuery(FETCH_MOVIE)
    if(loading) return <p>Loading...</p>
    if(error) return <p>error...(JSON.stringify(error))</p>

    const filtered = data.movies.filter((movie, i) => {
        if(i < 5) {
            return movie
        }
    })
    return (
        <div className="landing">
            <NavBar />
            <div className="landing-content">
                <div className="intro">
                    <h1>LANCER</h1>
                    <h6>movies preview</h6>
                    <h6>and popularity</h6>
                    <button type="button">
                        <Link to="/home/all">
                            See Collection
                        </Link>
                    </button>
                </div>
                <div className="preview">
                    <Poster filtered={filtered}/>
                </div>
            </div>
        </div>
    )
}

export default Landing