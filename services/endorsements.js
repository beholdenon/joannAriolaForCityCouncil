var client = require('./contentfulClient').client;

function getEndorsements (query) {
  query = query || {}
  query.content_type = 'endorsement';
  query.include = 10;
  query.order = 'fields.order';
  return client.getEntries(query);
}
module.exports = {
  getEndorsements
}
