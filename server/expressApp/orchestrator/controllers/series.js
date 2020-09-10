const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

class seriesController {
    static async list (req, res) {
        const seriesCached = await redis.get('series')
        if(seriesCached) {
            res.status(200).json(seriesCached)
        } else {
            axios({
                url: 'http://localhost:5002/tv',
                method: 'GET'
            })
                .then(async (resp) => {
                    const series = resp.data
                    await redis.set('series', JSON.stringify(series))
                    res.status(200).json(series)
                })
                .catch(err => {
                    res.status(500).json({
                        message: 'Error when getting Tv Series.',
                        error: err
                    });
                })
        }
    }

    static show (req, res) {
        let id = req.params.id;
        axios({
            url: `http://localhost:5002/tv/${id}`,
            method: 'GET'
        })
            .then(series => {
                res.status(200).json(series.data)
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Error when getting Tv Series.',
                    error: err
                });
            })
    }

    static create (req, res) {
        let series = {
			title : req.body.title,
			overview : req.body.overview,
			poster_path : req.body.poster_path,
			popularity : req.body.popularity,
			tags : req.body.tags
        }
        axios({
            url: `http://localhost:5002/tv`,
            method: 'POST',
            data: series,
        })
            .then(series => {
                res.status(200).json(series.data)
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Error when getting Tv Series.',
                    error: err
                });
            })
    }
    static update (req, res) {
        let id = req.params.id;
        let series = {
                title : req.body.title,
			    overview : req.body.overview,
			    poster_path : req.body.poster_path,
			    popularity : req.body.popularity,
                tags : req.body.tags
            }
        axios({
            url: `http://localhost:5002/tv/${id}`,
            method: 'PUT',
            data: series
        })
            .then(_ => {
                res.status(200).json('Success Edit Tv Series')
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Error when getting Tv Series.',
                    error: err
                });
            })
    }

    static remove (req, res) {
        let id = req.params.id;
        axios({
            url: `http://localhost:5002/tv/${id}`,
            method: 'DELETE'
        })
            .then(_ => {
                res.status(204).json('Success Delete Tv Series')
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Error when deleting the Tv Series.',
                    error: err
                });
            })
    }
}

module.exports = seriesController