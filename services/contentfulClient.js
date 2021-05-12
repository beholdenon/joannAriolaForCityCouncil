if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var contentful = require('contentful');

var client = contentful.createClient({
  accessToken: 'ehySY3_A2pmEYaa_K9KyEd9giDfLLYP9a9vBNvD3JyQ',
  space: 'm7vb8l3s35b6',
  host: 'cdn.contentful.com'
})

exports.client = client;