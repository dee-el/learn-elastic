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
                    _doc: {
                        properties: {
                            name: {
                                type: "text",
                                analyzer: "standard",
                                search_analyzer: "standard",
                                fields: {
                                    keyword: {
                                        type: "text", 
                                        analyzer: "keyword"
                                    },
                                    autocomplete: {
                                        type: "text", 
                                        analyzer: "autocomplete",
                                        search_analyzer: "standard" 
                                    },
                                    edge_ngram: {
                                        type: "text",
                                        analyzer: "edge_ngram",
                                        search_analyzer: "edge_ngram"
                                    }
                                }
                            },
                        }
                    }
                },
                settings: {
                    analysis: {
                        filter: {
                            whitespace_remove: {
                                type: "pattern_replace",
                                pattern: " ",
                                replacement: ""
                            },
                            keyword_ngram: {
                                type: "ngram",
                                min_gram: 3,
                                max_gram: 10,
                                token_chars: [
                                    "letter",
                                    "digit",
                                ]
                            },
                            keyword_edge_ngram: {
                                type: "edge_ngram",
                                min_gram: 3,
                                max_gram: 10,
                                side: "front",
                                token_chars: [
                                    "letter",
                                    "digit",
                                ]
                            },
                            indonesian_stop: {
                                type: "stop",
                                stopwords: "_indonesian_" 
                            },
                            indonesian_stemmer: {
                                type: "stemmer",
                                language: "indonesian"
                            }
                        },
                        tokenizer: {
                            keyword_tokenizer: {
                                type: "keyword"
                            },
                        },
                        analyzer: {
                            autocomplete: { 
                                type: "custom",
                                tokenizer: "standard",
                                filter: [
                                    "lowercase",
                                    "standard",
                                    "keyword_ngram",
                                    "indonesian_stop",
                                    "indonesian_stemmer",
                                    "whitespace_remove"
                                ]
                            },
                            edge_ngram: {
                                type: "custom",
                                tokenizer: "standard",
                                filter: [
                                    "lowercase",
                                    "keyword_edge_ngram",
                                    "indonesian_stop",
                                    "indonesian_stemmer",
                                    "whitespace_remove"
                                ]
                            },
                            keyword_edge_ngram: {
                                type: "custom",
                                tokenizer: "keyword_tokenizer",
                                filter: [
                                    "lowercase",
                                    "keyword_edge_ngram",
                                    "indonesian_stop",
                                    "indonesian_stemmer",
                                    "whitespace_remove"
                                ]
                            },
                            keyword: {
                                type: "custom",
                                tokenizer: "keyword_tokenizer",
                                filter: [
                                    "lowercase",
                                    "whitespace_remove"
                                ]
                            },

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