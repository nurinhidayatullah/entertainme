import {gql} from '@apollo/client'

export const FETCH_MOVIE = gql `
    query{
        movies{
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
        series{
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`

export const ADD_MOVIE = gql `
    mutation addMovie($title: String, $overview: String, $poster_path: String, $popularity: Float, $tags: [String]) {
        addMovie(title: $title, overview: $overview, poster_path: $poster_path, popularity: $popularity, tags: $tags) {
            _id
        }
    }
`

export const ADD_EPISODE = gql `
    mutation addEpisode($title: String, $overview: String, $poster_path: String, $popularity: Float, $tags: [String]) {
        addEpisode(title: $title, overview: $overview, poster_path: $poster_path, popularity: $popularity, tags: $tags) {
            _id
        }
    }
`

export const GET_Movie = gql `
    query Movie($id: ID){
        movie(id: $id) {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`

export const GET_Series = gql `
    query Episode($id: ID){
        episode(id: $id) {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`

export const UPDATE_MOVIE = gql `
    mutation updateMovie($id: ID, $title: String, $overview: String, $poster_path: String, $popularity: Float, $tags: [String]) {
        updateMovie(id: $id, title: $title, overview: $overview, poster_path: $poster_path, popularity: $popularity, tags: $tags) {
            _id
        }
    }
`

export const UPDATE_EPISODE = gql `
    mutation updateEpisode($id: ID, $title: String, $overview: String, $poster_path: String, $popularity: Float, $tags: [String]) {
        updateEpisode(id: $id, title: $title, overview: $overview, poster_path: $poster_path, popularity: $popularity, tags: $tags) {
            _id
        }
    }
`

export const DELETE_MOVIE = gql `
    mutation deleteMovie($id: ID) {
        deleteMovie(id: $id) {
            _id
        }
    }
    `

export const DELETE_SERIES = gql `
     mutation deleteEpisode($id: ID) {
        deleteEpisode(id: $id) {
            _id
        }
    }
`

export const GET_WATCH_LIST = gql `
    query GetWatchList{
        watchList @client
    }
`