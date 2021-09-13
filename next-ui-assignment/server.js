const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(express.urlencoded());

app.get('/search', (req, res) => {
    res.send('Hello World!');
});

// search query about an artist, album or song

app.post('/api/search', (req, res) => {
    const searchQuery = req.body.query;
    const pageNumber = req.body.pageNumber || 0;
    console.log(" pageNumber before call ", pageNumber)
    const url = `https://itunes.apple.com/search?term=${searchQuery}`;
    axios({
        method:'get',
        url
    })
    .then(response => {
        const LIMIT = 10;
        const ENTRIES_PER_PAGE = 10;
        
        const end = pageNumber*ENTRIES_PER_PAGE+LIMIT;
        const start = pageNumber*ENTRIES_PER_PAGE;
        const responseData = response.data && response.data.results.slice(start, end);
        const nextPage = pageNumber+1;
        res.send(JSON.stringify({data: responseData, pageNumber: nextPage }));
    })
    .catch(function (error) {
        console.log(error);
    });
    // res.send({ express: 'Hello From Express' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));