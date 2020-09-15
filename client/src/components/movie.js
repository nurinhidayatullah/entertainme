import React, {useState} from 'react'
import {useMutation} from '@apollo/client'
import {Link} from 'react-router-dom'
import {
    FETCH_MOVIE,
    DELETE_MOVIE,
    DELETE_SERIES
} from '../queries'
import toast from 'toast-me';
import Detail from '../images/study.png'
import Edit from '../images/edit.png'
import Delete from '../images/cross.png'
import {watchList} from '../cache'

const Movie = ({movie}) => {
    let stars = []
    const [isStored, setIsStored] = useState(false)

    const Stars = () => {
        const starsNum = Math.floor(movie.popularity/2)
        for (let i = 0; i < starsNum; i++) {
            stars.push(<span key={i+2} className="fa fa-star checked"></span>)
        }
        for (let i = 0; i < (5-starsNum); i++) {
            stars.push(<span key={i} className="fa fa-star"></span>)
        }
        return stars
    }

    const addWatchListHandler = (event) => {
        event.preventDefault()
        const list = watchList()
        const duplicate = list.filter(el => el.title === movie.title)
        if(!duplicate.length) {
            watchList([...list, movie])
            toast(`${movie.title} Added to Watch List`, {
                position: "bottom",
                toastClass: 'success',
                type: "chain",
                timeoutOnRemove: 1000,
                duration: 2000
            })
        } else {
            setIsStored(true)
            toast(`${movie.title} Already on the Watch List`, {
                position: "bottom",
                toastClass: "fail",
                type: "chain",
                timeoutOnRemove: 1000,
                duration: 2000
            })
        }
    }

    const [deleteMovie, {data}] = useMutation(DELETE_MOVIE, {
        refetchQueries: [{query: FETCH_MOVIE}]}
    )
    const [deleteEpisode, {data1}] = useMutation(DELETE_SERIES, {
        refetchQueries: [{query: FETCH_MOVIE}]}
    )
    const deleteMutationHandler = (id, event) => {
        event.preventDefault()
        if(movie.__typename == 'Movie') {
            deleteMovie({
                variables: {
                    id
                }
            })
        } else if(movie.__typename == 'Episode'){
            deleteEpisode({
                variables: {
                    id
                }
            })
        }
    }

    return (
        <div className="movie">
            <div className="container-overview">
                <div className="overview">
                    <div className="edit-delete">
                        <Link to={`/edit/${movie._id}/${movie.__typename}`}>
                            <img className="edit" src={Edit} width="18px" alt="..." />
                        </Link>
                        <a href=""><img className="delete" src={Delete} onClick={(event) => deleteMutationHandler(movie._id, event)} width="18px" alt="..." /></a>
                    </div>
                    <h4>Add Watch List</h4>
                    <a href="" onClick={(event) => addWatchListHandler(event)}><img src={Detail} width="54px" alt="..." /></a>
                    <h5>{movie.title}</h5>
                </div>
            </div>
                <img src={movie.poster_path} alt="...">
                </img>
                <div>
                <h5>Rating: {Stars()}</h5>
                </div>
        </div>
    )
}

export default Movie