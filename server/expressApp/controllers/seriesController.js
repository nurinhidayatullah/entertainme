const seriesModel = require('../models/seriesModel.js');

class seriesController {
    static list (req, res) {
        seriesModel.find({})
            .then(seriess => {
                res.json(seriess);
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Error when getting Tv Series.',
                    error: err
                });
            })
    }

    static show (req, res) {
        let id = req.params.id;
        seriesModel.findOne({_id: id})
            .then(series => {
                if (!series) {
                    throw res.status(404).json({
                        message: 'No such Tv Series'
                    });
                }
                res.json(series);
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Error when getting Tv Series.',
                    error: err
                });
            })            
    }

    static create (req, res) {
        let series = new seriesModel({
			title : req.body.title,
			overview : req.body.overview,
			poster_path : req.body.poster_path,
			popularity : req.body.popularity,
			tags : req.body.tags
        })

        series.save() 
            .then(_ => {
                res.status(201).json(series);
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Error when creating Tv Series',
                    error: err
                })
            })
    }
    static update (req, res) {
        let id = req.params.id;
        seriesModel.findOne({_id: id})
            .then(series => {
                if (!series) {
                    throw res.status(404).json({
                        message: 'No such Tv Series'
                    });
                }
                series.title = req.body.title ? req.body.title : series.title;
			    series.overview = req.body.overview ? req.body.overview : series.overview;
			    series.poster_path = req.body.poster_path ? req.body.poster_path : series.poster_path;
			    series.popularity = req.body.popularity ? req.body.popularity : series.popularity;
                series.tags = req.body.tags ? req.body.tags : series.tags;
                return series.save()
            })
            .then(_ => {
                res.status(200).json('Success Edit Tv Series')
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Error when getting Tv Series',
                    error: err
                });
            })
    }

    static remove (req, res) {
        let id = req.params.id;
        seriesModel.findByIdAndRemove(id).exec()
            .then(_ => {
                res.status(204).json('Success Delete Tv Series');
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
