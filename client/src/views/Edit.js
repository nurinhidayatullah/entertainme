import React, {useState} from 'react'
import {useMutation, useQuery} from '@apollo/client'
import {useHistory} from 'react-router-dom' 
import NavBar from '../components/NavBar'
import Delete from '../images/cross.png'
import {
    FETCH_MOVIE,
    GET_Movie,
    GET_Series,
    UPDATE_MOVIE,
    UPDATE_EPISODE
} from '../queries'
import toast from 'toast-me';


const Edit = ({match}) => {
    const {type} = match.params
    let GET_MOVIE;
    const history = useHistory()
    const [title, setTitle] = useState('')
    const [titleValidate, setTitleValidate] = useState(true)
    const [overview, setOverview] = useState('')
    const [overviewValidate, setOverviewValidate] = useState(true)
    const [poster_path, setPosterPath] = useState('')
    const [posterValidate, setPosterValidate] = useState(true)
    const [popularity, setPopularity] = useState(0)
    const [popularityValidate, setPopularityValidate] = useState(true)
    const [oneTag, setOneTag] = useState('')
    const [tags, setTags] = useState([])
    const [tagsValidate, setTagsValidate] = useState(true)
    if(type === 'Movie') {
        GET_MOVIE = GET_Movie
    } else if(type === 'Episode') {
        GET_MOVIE = GET_Series
    }

    const {loading, error, data} = useQuery(GET_MOVIE, {
        variables: {id: match.params.id},
        onCompleted() {
            if(type === 'Movie') {
                setTitle(data.movie.title)
                setOverview(data.movie.overview)
                setPosterPath(data.movie.poster_path)
                setPopularity(data.movie.popularity)
                setTags(JSON.parse(JSON.stringify(data.movie.tags)))
            } else if (type === 'Episode') {
                setTitle(data.episode.title)
                setOverview(data.episode.overview)
                setPosterPath(data.episode.poster_path)
                setPopularity(data.episode.popularity)
                setTags(JSON.parse(JSON.stringify(data.episode.tags)))
            }
        }
    })   
    
    const tagHandler = () => {
        setTags(tags.concat(oneTag))
    }

    const removeTagHandler = (key, event) => {
        event.preventDefault()
        setTags(tags.filter(tag => tag !== key))
    }

    const [updateMovie, {datas}] = useMutation(UPDATE_MOVIE, {
        refetchQueries: [{query: FETCH_MOVIE}]
    })

    const [updateEpisode, {datas1}] = useMutation(UPDATE_EPISODE, {
        refetchQueries: [{query: FETCH_MOVIE}]
    })

    const updateMutationHandler = () => {
        if(type === 'Movie') {
            updateMovie({
                variables: {
                    id: match.params.id,
                    title,
                    overview,
                    poster_path,
                    popularity: +popularity,
                    tags
                }
            })
        } else if (type === 'Episode') {
            updateEpisode({
                variables: {
                    id: match.params.id,
                    title,
                    overview,
                    poster_path,
                    popularity: +popularity,
                    tags
                }
            })
        }
    }
    
    const updateValidateHandler = () => {
        if(title
            && overview
            && poster_path
            && popularity
            && tags.length    
         ) {
             updateMutationHandler()
             if(type == 'Movie') {
                history.push('/home/movies')
                toast('Update Movie Successfully', {
                    position: "bottom",
                    toastClass: 'success',
                    type: "chain",
                    timeoutOnRemove: 1000,
                    duration: 2000
                })
             } else if(type == 'Episode') {
                history.push('/home/series')
                toast('Update Tv Series Successfully', {
                    position: "bottom",
                    toastClass: 'success',
                    type: "chain",
                    timeoutOnRemove: 1000,
                    duration: 2000
                })
             }
         }
         if(!title) {
             setTitleValidate(false)
         }
         if(!overview) {
             setOverviewValidate(false)
         }
         if(!poster_path) {
             setPosterValidate(false)
         }
         if(!popularity) {
             setPopularityValidate(false)
         }
         if(!tags.length) {
             setTagsValidate(false)
         }
    }

    if(loading) return <p>Loading...</p>
    if(error) return <p>error...{JSON.stringify(error)}</p>
    
    return(
        <div className="add">
            <NavBar />
            <div className="add-content">
                <div className="add-intro">
                    <h1>LANCER</h1>
                    <h2>MOVIES</h2>
                </div>
                <div className="add-form">
                  <h1>Edit Movie/Tv Series</h1>
                  <label>Title:</label><br/>
                  {!titleValidate && <small style={{color: "red"}}>Title Required!!!<br/></small>}
                  <input type="text" placeholder="Movie/Tv Series Title" onChange={(e) => setTitle(e.target.value)} value={title} /><br />
                  <label>Overview:</label><br/>
                  {!overviewValidate && <small style={{color: "red"}}>Overview Required<br/></small>}
                  <textarea className="text-box" rows="4" cols="41" placeholder="Movie/Tv Series Overview" onChange={(e) => setOverview(e.target.value)} value={overview} /><br />
                  <label>Poster Path URL:</label><br/>
                  {!posterValidate && <small style={{color: "red"}}>Poster URL Required<br/></small>}
                  <input type="text" placeholder="Movie/Tv Series Poster Path URL" onChange={(e) => setPosterPath(e.target.value)} value={poster_path} /><br />
                  <label>Popularity:</label><br/>
                  {!popularityValidate && <small style={{color: "red"}}>Popularity Required<br/></small>}
                  <input type="number" placeholder="Movie/Tv Series popularity" onChange={(e) => setPopularity(e.target.value)} value={+popularity} /><br />
                  <label>Tags:</label><br/>
                  {!tagsValidate && <small style={{color: "red"}}>Tags Required<br/></small>}
                  {tags.length ?
                    <div className="tag">
                        {tags.map((tag) => {
                            return (
                                <small key={tag}>{tag} 
                                    <button type="button"><img src={Delete} onClick={(event) => removeTagHandler(tag, event)} width="10px" alt="..."/></button>
                                </small>
                            )
                        })}
                    </div> : ''
                  }
                  <input type="text" placeholder="Movie/Tv Series Tags" onChange={(e) => setOneTag(e.target.value)} /><button onClick={tagHandler} type="button">+</button><br />
                  <button onClick={updateValidateHandler} className="btn-2" type="button">Update Movie</button>
                </div>
            </div>
        </div>
    )
}

export default Edit