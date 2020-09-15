import React, {useState} from 'react'
import {useMutation} from '@apollo/client'
import {useHistory} from 'react-router-dom'
import NavBar from '../components/NavBar'
import Delete from '../images/cross.png'
import {
    FETCH_MOVIE,
    ADD_MOVIE,
    ADD_EPISODE
} from '../queries'
import toast from 'toast-me';

const Add = () => {
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
    
    const tagHandler = () => {
        setTags(tags.concat(oneTag))
    }

    const removeTagHandler = (key, event) => {
        event.preventDefault()
        setTags(tags.filter(tag => tag !== key))
    }

    const addMutationHandler = () => {
        addMovie({
            variables: {
                title,
                overview,
                poster_path,
                popularity: +popularity,
                tags
            }
        })
    }

    const addEpisodeMutationHandler = () => {
        addEpisode({
            variables: {
                title,
                overview,
                poster_path,
                popularity: +popularity,
                tags
            }
        })
    }

    const history = useHistory()

    const historyHandler = (category) => {
        if(title
           && overview
           && poster_path
           && popularity
           && tags.length    
        ) {
            if(category === 'movie') {
                addMutationHandler()
                history.push('/home/movies')
                toast('Add Movie Successfully', {
                    position: "bottom",
                    toastClass: 'success',
                    type: "chain",
                    timeoutOnRemove: 1000,
                    duration: 2000
                })
            } else if(category === 'episode'){
                addEpisodeMutationHandler()
                history.push('/home/series')
                toast('Add Tv Series Successfully', {
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

    const [addMovie, {data1}] = useMutation(ADD_MOVIE, {
        refetchQueries: [{query: FETCH_MOVIE}]
    })
    const [addEpisode, {data}] = useMutation(ADD_EPISODE, {
        refetchQueries: [{query: FETCH_MOVIE}]
    })
    return(
        <div className="add">
            <NavBar />
            <div className="add-content">
                <div className="add-intro">
                    <h1>LANCER</h1>
                    <h2>MOVIES</h2>
                </div>
                <div className="add-form">
                  <h1>Add Movie/Tv Series</h1>
                  <label>Title:</label><br/>
                  {!titleValidate && <small style={{color: "red"}}>Title Required!!!<br/></small>}
                  <input type="text" placeholder="Movie/Tv Series Title" onChange={(e) => setTitle(e.target.value)} /><br />
                  <label>Overview:</label><br/>
                  {!overviewValidate && <small style={{color: "red"}}>Overview Required<br/></small>}
                  <textarea className="text-box" rows="4" cols="41" placeholder="Movie/Tv Series Overview URL" onChange={(e) => setOverview(e.target.value)} /><br />
                  <label>Poster Path URL:</label><br/>
                  {!posterValidate && <small style={{color: "red"}}>Poster URL Required<br/></small>}
                  <input type="text" placeholder="Movie/Tv Series Overview URL" onChange={(e) => setPosterPath(e.target.value)} /><br />
                  <label>Popularity:</label><br/>
                  {!popularityValidate && <small style={{color: "red"}}>Popularity Required<br/></small>}
                  <input type="number" placeholder="Movie/Tv Series popularity" onChange={(e) => setPopularity(e.target.value)} /><br />
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
                  <div className="buttons">
                    <button onClick={() => historyHandler('movie')} className="btn btn1" type="button">Add Movie</button>
                    <button onClick={() => historyHandler('episode')} className="btn" type="button">Add Series</button>
                  </div>
                </div>
            </div>
        </div>
    )
}

export default Add