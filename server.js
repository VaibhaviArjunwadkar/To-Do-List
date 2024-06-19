const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');

const app = express();


//connection to mongodb database code 
var db = 'mongodb://127.0.0.1:27017/todolist';
mongoose.connect(db).then(()=>console.log('connected to MongoDB')).catch((err)=>console.log('error'));


// Use GraphQL middleware
app.use('/', graphqlHTTP({
    schema,
    graphiql: true
}));


app.listen(4000, () => {
    console.log('Server is running on port 4000');
});

