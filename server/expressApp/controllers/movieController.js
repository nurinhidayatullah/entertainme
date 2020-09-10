const movieModel = require('../models/movieModel.js');

class movieController {
    static list (req, res) {
        movieModel.find({})
            .then(movies => {
                res.json(movies);
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Error when getting movie.',
                    error: err
                });
            })
    }

    static show (req, res) {
        let id = req.params.id;
        movieModel.findOne({_id: id})
            .then(movie => {
                if (!movie) {
                    throw res.status(404).json({
                        message: 'No such movie'
                    });
                }
                res.json(movie);
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Error when getting movie.',
                    error: err
                });
            })            
    }

    static create (req, res) {
        let movie = new movieModel({
			title : req.body.title,
			overview : req.body.overview,
			poster_path : req.body.poster_path,
			popularity : req.body.popularity,
			tags : req.body.tags
        })

        movie.save() 
            .then(_ => {
                res.status(201).json(movie);
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Error when creating movie',
                    error: err
                })
            })
    }
    static update (req, res) {
        let id = req.params.id;
        movieModel.findOne({_id: id})
            .then(movie => {
                if (!movie) {
                    throw res.status(404).json({
                        message: 'No such movie'
                    });
                }
                movie.title = req.body.title ? req.body.title : movie.title;
			    movie.overview = req.body.overview ? req.body.overview : movie.overview;
			    movie.poster_path = req.body.poster_path ? req.body.poster_path : movie.poster_path;
			    movie.popularity = req.body.popularity ? req.body.popularity : movie.popularity;
                movie.tags = req.body.tags ? req.body.tags : movie.tags;
                return movie.save()
            })
            .then(_ => {
                res.status(200).json('Success Edit Movie')
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Error when getting movie',
                    error: err
                });
            })
    }

    static remove (req, res) {
        let id = req.params.id;
        movieModel.findByIdAndRemove(id).exec()
            .then(_ => {
                res.status(204).json('Success Delete Movie');
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Error when deleting the movie.',
                    error: err
                });
            })
    }
}

module.exports = movieController
