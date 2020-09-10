const router = require('express').Router()
const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()
const movieRoute = require('./movie')
const seriesRoute = require('./series')

router.get('/', async (req, res) => {
    const entertainmeCached = await redis.get('entertain-me')
    let Response = {}
    if(entertainmeCached) {
        res.status(200).json(entertainmeCached)
    } else {
        axios({
            url: 'http://localhost:5001/movies',
            method: 'GET'
        })
            .then(movies => {
                Response.movies = movies.data
                return axios({
                    url: 'http://localhost:5002/tv',
                    method: 'GET'
                })
            })
            .then(async (series) => {
                Response.tvSeries = series.data
                await redis.set('entertain-me', JSON.stringify(Response))
                res.status(200).json(Response)
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Error when getting Response.',
                    error: err
                });
            })
    }
})

router.use('/movies', movieRoute)
router.use('/tv', seriesRoute)


module.exports = router