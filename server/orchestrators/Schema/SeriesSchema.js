const { gql } = require('apollo-server')
const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

const typeDefs = gql `

    type Episode {
        _id: ID
        title: String
        overview: String
        poster_path: String
        popularity: Float
        tags: [String]
    }

    extend type Query {
        series: [Episode]
        episode(id: ID): Episode
    }

    extend type Mutation {
        addEpisode(title: String, overview: String, poster_path: String, popularity: Float, tags: [String]): Episode
        updateEpisode(id: ID, title: String, overview: String, poster_path: String, popularity: Float, tags: [String]): Episode
        deleteEpisode(id: ID) : Episode
    }
`

const resolvers = {
    Query: {
        async series () {
            const seriesCached = await redis.get('series')
            if(seriesCached) {
                return JSON.parse(seriesCached)
            } else {
                let {data} = await axios.get('http://localhost:5002/tv')
                await redis.set('series', JSON.stringify(data))
                return data
            }
        },
        async episode (_, args) {
            let {id} = args
            let {data} = await axios.get(`http://localhost:5002/tv/${id}`)
            return data
        }
    },
    Mutation: {
        async addEpisode(_, args) {
            redis.del('series')
            let {data} = await axios.post('http://localhost:5002/tv', args)
            return data
        },
        async updateEpisode(_, args) {
            redis.del('series')
            let {id, title, overview, poster_path, popularity, tags} = args
            let item = {title, overview, poster_path, popularity, tags}
            let {data} = await axios.put(`http://localhost:5002/tv/${id}`, item)
            return data
        },
        async deleteEpisode(_, args) {
            redis.del('series')
            let {id} = args
            let {data} = await axios.delete(`http://localhost:5002/tv/${id}`)
            return data
        }
    }
}

module.exports = {typeDefs, resolvers}
