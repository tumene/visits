// import libraries
const express = require('express');
const redis = require('redis');

//Make an instance of an express application
const app = express();

//Setup a connection to the redis server
const client = redis.createClient({
    host: 'redis-server',
    port: 6379
});

//Initialize the number of visits to be set to 0
client.set('visits', 0);

//Add in a route handler for the root route
//route for home page
app.get('/', (req, res) => {
    client.get('visits', (err, visits) => {
        res.send('Number of visits is ' + visits);
        client.set('visits', parseInt(visits) + 1);
    });
});

app.listen(8081, () => {
    console.log('Listening on port 8081');
});