var client = require('./contentfulClient').client;

function getHomepage (query) {
  query = query || {}
  query.content_type = 'homepage';
  query.include = 10;
  return client.getEntries(query);
}
module.exports = {
  getHomepage
}
