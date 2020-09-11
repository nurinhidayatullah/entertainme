const { gql } = require('apollo-server')
const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

const typeDefs = gql `
    type Movie {
        _id: ID
        title: String
        overview: String
        poster_path: String
        popularity: Float
        tags: [String]
    }

    extend type Query {
        movies: [Movie]
        movie(id: ID): Movie
    }

    extend type Mutation {
        addMovie(title: String, overview: String, poster_path: String, popularity: Float, tags: [String]): Movie
        updateMovie(id: ID, title: String, overview: String, poster_path: String, popularity: Float, tags: [String]): Movie
        deleteMovie(id: ID) : Movie
    }
`

const resolvers = {
    Query: {
        async movies () {
            const moviesCached = await redis.get('movies')
            if(moviesCached) {
                return JSON.parse(moviesCached)
            } else {
                let {data} = await axios.get('http://localhost:5001/movies')
                await redis.set('movies', JSON.stringify(data))
                return data
            }
            
        },
        async movie (_, args) {
            let {id} = args
            let {data} = await axios.get(`http://localhost:5001/movies/${id}`)
            return data
        },
    },
    Mutation: {
        async addMovie(_, args) {
            redis.del('movies')
            let {data} = await axios.post('http://localhost:5001/movies', args)
            return data
        },
        async updateMovie(_, args) {
            redis.del('movies')
            let {id, title, overview, poster_path, popularity, tags} = args
            let item = {title, overview, poster_path, popularity, tags}
            let {data} = await axios.put(`http://localhost:5001/movies/${id}`, item)
            return data
        },
        async deleteMovie(_, args) {
            redis.del('movies')
            let {id} = args
            let {data} = await axios.delete(`http://localhost:5001/movies/${id}`)
            return data
        },
    }
}

module.exports = {typeDefs, resolvers}
