const {ApolloServer, gql, makeExecutableSchema } = require('apollo-server')
const MovieSchema = require('./Schema/MovieSchema')
const SeriesSchema = require('./Schema/SeriesSchema')

const typeDefs = gql `
    type Query
    type Mutation
`
const schema = makeExecutableSchema({
    typeDefs: [typeDefs, MovieSchema.typeDefs, SeriesSchema.typeDefs],
    resolvers: [MovieSchema.resolvers, SeriesSchema.resolvers]
})

const server = new ApolloServer({schema})

server.listen(5000).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
