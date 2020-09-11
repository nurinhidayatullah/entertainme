const {MongoClient} = require('mongodb')
const {ObjectID} = require('mongodb')
const uri = 'mongodb://localhost:27017'
const client = new MongoClient(uri, {useUnifiedTopology: true})

class MovieControl {
    static async create (req, res, next) {
        try {
            await client.connect()
            const entertainme = client.db('entertain-me-mongo')
            const collection = entertainme.collection('movies')
    
            const movie = await collection.insertOne({
                title: req.body.title,
                overview: req.body.overview,
                poster_path: req.body.poster_path,
                popularity: req.body.popularity,
                tags: req.body.tags
            })
            res.status(201).json({message: 'Success Add Movie.'})
        } catch (err) {
            res.status(500).json({
                message: 'Error when getting movie',
                error: err
            });
        } 
    }

    static async list (req, res, next) {
        try {
            await client.connect()
            const entertainme = client.db('entertain-me-mongo')
            const collection = entertainme.collection('movies')
            const moviesCursor = await collection.find()
            const movies = await moviesCursor.toArray()

        res.status(200).json(movies)
        } catch (err) {
            res.status(500).json({
                message: 'Error when getting movie',
                error: err
            });
        } 
    }

    static async update (req, res, next) {
        const {id} = req.params
        try {
            await client.connect()
            const entertainme = client.db('entertain-me-mongo')
            const collection = entertainme.collection('movies')
            const movie = await collection.findOne({_id: ObjectID(id)})
            console.log(movie)
            if(!movie) {
                throw res.status(404).json({
                    message: 'No such movie'
                });
            }
            const items = {
                title : req.body.title ? req.body.title : movie.title,
                overview : req.body.overview ? req.body.overview : movie.overview,
                poster_path : req.body.poster_path ? req.body.poster_path : movie.poster_path,
                popularity : req.body.popularity ? req.body.popularity : movie.popularity,
                tags : req.body.tags ? req.body.tags : movie.tags
            }
            await collection.updateOne({_id: ObjectID(id)}, {
                $set: items
            })
            res.status(200).json({message: 'Success Update Movie'})
        } catch (err) {
            res.status(500).json({
                message: 'Error when getting movie <<<<<<<<< dari movie',
                error: err
            });
        }
    }

    static async delete (req, res, next) {
        let {id} = req.params
        try {
            await client.connect()
            const entertainme = client.db('entertain-me-mongo')
            const collection = entertainme.collection('movies')
            const movie = await collection.findOne({_id: ObjectID(id)})
            if(!movie) {
                throw res.status(404).json({
                    message: 'No such movie'
                });
            }
            await collection.deleteOne({_id: ObjectID(id)})
            res.status(200).json({message: 'Success Delete Movie'})
        } catch (err) {
            res.status(500).json({
                message: 'Error when deleting the movie.',
                error: err
            });
        }
    }
}

module.exports = MovieControl