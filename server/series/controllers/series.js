const {MongoClient} = require('mongodb')
const {ObjectID} = require('mongodb')
const uri = 'mongodb://localhost:27017'
const client = new MongoClient(uri, {useUnifiedTopology: true})

class TvSeriesController {
    static async create (req, res, next) {
        try {
            await client.connect()
            const entertainme = client.db('entertain-me-mongo')
            const collection = entertainme.collection('series')
    
            const series = await collection.insertOne({
                title: req.body.title,
                overview: req.body.overview,
                poster_path: req.body.poster_path,
                popularity: req.body.popularity,
                tags: req.body.tags
            })
            res.status(201).json({message: 'Success Add Tv Series'})
        } catch (err) {
            res.status(500).json({
                message: 'Error when getting Tv Series',
                error: err
            });
        } 
    }
    static async show (req, res, next) {
        let {id} = req.params
        try {
            await client.connect()
            const entertainme = client.db('entertain-me-mongo')
            const collection = entertainme.collection('series')
            const series = await collection.findOne({_id: ObjectID(id)})
            if(!series) {
                throw res.status(404).json({
                    message: 'No such Tv Series'
                });
            }
            res.status(200).json(series)
        } catch (err) {
            res.status(500).json({
                message: 'Error when getting Tv Series',
                error: err
            });
        }
    }
    static async list (req, res, next) {
        try {
            await client.connect()
            const entertainme = client.db('entertain-me-mongo')
            const collection = entertainme.collection('series')
            const seriesCursor = await collection.find()
            const series = await seriesCursor.toArray()

        res.status(200).json(series)
        } catch (err) {
            res.status(500).json({
                message: 'Error when getting Tv Series',
                error: err
            });
        } 
    }

    static async update (req, res, next) {
        let {id} = req.params
        try {
            await client.connect()
            const entertainme = client.db('entertain-me-mongo')
            const collection = entertainme.collection('series')
            const series = await collection.findOne({_id: ObjectID(id)})
            if(!series) {
                throw res.status(404).json({
                    message: 'No such Tv Series'
                });
            }
            const item = {
                title : req.body.title ? req.body.title : series.title,
                overview : req.body.overview ? req.body.overview : series.overview,
                poster_path : req.body.poster_path ? req.body.poster_path : series.poster_path,
                popularity : req.body.popularity ? req.body.popularity : series.popularity,
                tags : req.body.tags ? req.body.tags : series.tags
            }
            await collection.updateOne({_id: ObjectID(id)}, {
                $set: item
            })
            res.status(200).json({message: 'Success Update Tv Series'})
        } catch (err) {
            res.status(500).json({
                message: 'Error when getting Tv Series',
                error: err
            });
        }
    }

    static async delete (req, res, next) {
        let {id} = req.params
        try {
            await client.connect()
            const entertainme = client.db('entertain-me-mongo')
            const collection = entertainme.collection('series')
            const series = await collection.findOne({_id: ObjectID(id)})
            if(!series) {
                throw res.status(404).json({
                    message: 'No such Tv Series'
                });
            }
            await collection.deleteOne({_id: ObjectID(id)})
            res.status(200).json({message: 'Success Delete Tv Series'})
        } catch (err) {
            res.status(500).json({
                message: 'Error when deleting the Tv Series.',
                error: err
            });
        }
    }
}

module.exports = TvSeriesController