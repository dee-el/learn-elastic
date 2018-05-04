const Elasticsearch = require('elasticsearch');
const Client = new Elasticsearch.Client({
    host: 'localhost:9200',
    apiVersion: '6.2'
});


Client.ping({
    requestTimeout: 1000
}).then(() => {
    console.log(`It's Okay`);
}).catch(err => console.log(err));

module.exports = {
    Client
}