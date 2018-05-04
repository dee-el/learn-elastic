const Client = require('./es-connection').Client;

/**
 * 
 * @param {String} indexName 
 */
const CreateIndex = async (indexName) => {
    try {
        const response = await Client.indices.create({
            index: indexName,
            body: {
                mappings: {
                    "_doc": {
                        properties: {
                            name: {
                                type: "text",
                                analyzer: "autocomplete", 
                                search_analyzer: "standard" 
                            },
                        }
                    }
                },
                settings: {
                    analysis: {
                        filter: {
                            "autocomplete_filter": {
                                "type": "ngram",
                                "min_gram": 3,
                                "max_gram": 10
                            },
                            "indonesian_stop": {
                                "type": "stop",
                                "stopwords":  "_indonesian_" 
                            },
                            "indonesian_stemmer": {
                                "type": "stemmer",
                                "language":   "indonesian"
                            }
                        },
                        analyzer: {
                            "autocomplete": { 
                                type: "custom",
                                tokenizer: "standard",
                                filter: [
                                    "lowercase",
                                    "standard",
                                    "autocomplete_filter",
                                    "indonesian_stop",
                                    "indonesian_keywords",
                                    "indonesian_stemmer"
                                ]
                            }
                        }
                    }
                  }
            }
        });
        console.log('created');
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

/**
 * 
 * @param {String} indexName 
 */
const DeleteIndex = async (indexName) => {
    try {
        const response = await Client.indices.delete({
            index: indexName
        });
        console.log('deleted');
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

module.exports = {
    CreateIndex,
    DeleteIndex
}