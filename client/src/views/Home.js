import React from 'react'
import NavBar from '../components/NavBar'
import Add from '../images/add.png'
import {Link} from 'react-router-dom'
import {useQuery} from '@apollo/client'
import {FETCH_MOVIE} from '../queries'

import Movie from '../components/movie'

const Home = ({match}) => {
    const category = match.params.category
    const {loading, error, data} = useQuery(FETCH_MOVIE)
    if(loading) return <p>Loading...</p>
    if(error) return <p>error...(JSON.stringify(error))</p>
    return (
        <div className='home'>
            <NavBar />
            <div className='home-page'>
                <div className='sub-nav'>
                    <div className="add-home">
                        <Link to='/add'>
                            <img src={Add} alt="..." width="24px" height="24px" />
                            <h1>Add Movie/Tv Series</h1>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="container-content">
                    <div className="wrapper">
                        {(category === 'movies' && !data.movies.length ||
                          category === 'series' && !data.series.length  
                        ) ? <h1 className="no-file">No Such File</h1> :
                            category === 'all' ? data.movies.concat(data.series).map((movie, idx) => (
                            <Movie key={idx} movie={movie}/>
                            )) :
                            category === 'movies' ? data.movies.map((movie, idx) => (
                            <Movie key={idx} movie={movie}/>
                        )) : category === 'series' ? data.series.map((series, idx) => (
                            <Movie key={idx} movie={series}/>
                        )) : ''
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home