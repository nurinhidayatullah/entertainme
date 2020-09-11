const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

class movieController {
    static async list (req, res) {
        const moviesCached = await redis.get('movies')
        if(moviesCached) {
            res.status(200).json(JSON.parse(moviesCached))
        } else {
            axios({
                url: 'http://localhost:5001/movies',
                method: 'GET'
            })
                .then(async (resp) => {
                    const movies = resp.data
                    await redis.set('movies', JSON.stringify(movies))
                    res.status(200).json(movies)
                })
                .catch(err => {
                    res.status(500).json({
                        message: 'Error when getting Movies.',
                        error: err
                    });
                })
        }
    }

    static create (req, res) {
        let movie = {
			title : req.body.title,
			overview : req.body.overview,
			poster_path : req.body.poster_path,
			popularity : req.body.popularity,
			tags : req.body.tags
        }
        axios({
            url: `http://localhost:5001/movies`,
            method: 'POST',
            data: movie,
        })
            .then((movie) => {
                redis.del('movies')
                redis.del('entertain-me')
                res.status(200).json(movie.data)
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Error when create Movie.',
                    error: err
                });
            })
    }
    static update (req, res, next) {
        let id = req.params.id;
        let movies = {
                title : req.body.title,
			    overview : req.body.overview,
			    poster_path : req.body.poster_path,
			    popularity : req.body.popularity,
                tags : req.body.tags
        }
        console.log(movies)
        axios({
            url: `http://localhost:5001/movies/${id}`,
            method: 'PUT',
            data: movies
        })
            .then(_ => {
                redis.del('movies')
                redis.del('entertain-me')
                res.status(200).json('Success Edit Movie')
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Error when getting Movie.',
                    error: err
                });
            })
    }

    static remove (req, res) {
        let id = req.params.id;
        axios({
            url: `http://localhost:5001/movies/${id}`,
            method: 'DELETE'
        })
            .then((_) => {
                redis.del('movies')
                redis.del('entertain-me')
                res.status(200).json({message: 'Success Delete Movie'})
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Error when deleting the Movie.',
                    error: err
                });
            })
    }
}

module.exports = movieController