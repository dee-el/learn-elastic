const Client = require('./es-connection').Client;

/**
 * 
 * @param {String} indexName 
 */
const CreateIndex = async (indexName) => {
    try {
        const response = await Client.indices.create({
            "index": indexName,
            "body": {
                "mappings": {
                    "_doc": {
                        "properties": {
                            "name": {
                                "type": "text",
                                "analyzer": "standard",
                                "search_analyzer": "standard",
                                "fields": {
                                    "keyword": {
                                        "type": "text", 
                                        "analyzer": "keyword"
                                    },
                                    "autocomplete": {
                                        "type": "text", 
                                        "analyzer": "autocomplete",
                                        "search_analyzer": "standard" 
                                    },
                                    "edge_ngram": {
                                        "type": "text",
                                        "analyzer": "edge_ngram",
                                        "search_analyzer": "edge_ngram"
                                    },
                                    "no_whitespace": {
                                        "type": "text",
                                        "analyzer": "keyword_edge_ngram",
                                    },
                                    "num_for_word": {
                                        "type": "text",
                                        "analyzer": "num_for_word"
                                    }
                                }
                            },
                        }
                    }
                },
                "settings": {
                    "analysis": {
                        "char_filter": {
                            "whitespace_remove": {
                                "type": "pattern_replace",
                                "pattern": "\\s",
                                "replacement": ""
                            },
                            "special_char_remove": {
                                "type": "pattern_replace",
                                "pattern": "[^a-zA-Z0-9]",
                                "replacement": ""
                            },
                            "mapping_alpha_num": {
                                "type": "mapping",
                                "mappings": [
                                    "0 => o",
                                    "1 => i",
                                    "3 => e",
                                    "4 => a",
                                    "5 => s",
                                    "6 => g",
                                    "7 => t"
                                ]
                              }
                        },
                        "filter": {
                            "edge_ngram": {
                                "type": "edge_ngram",
                                "min_gram": 3,
                                "max_gram": 10,
                                "side": "front",
                                "token_chars": [
                                    "letter",
                                    "digit",
                                ]
                            },
                            "ngram": {
                                "type": "ngram",
                                "min_gram": 3,
                                "max_gram": 15,
                                "side": "front",
                                "token_chars": [
                                    "letter",
                                    "digit"
                                ]
                            },
                            "indonesian_stop": {
                                "type": "stop",
                                "stopwords": "_indonesian_" 
                            },
                            "indonesian_stemmer": {
                                "type": "stemmer",
                                "language": "indonesian"
                            }
                        },
                        "tokenizer": {
                            "keyword_tokenizer": {
                                "type": "keyword"
                            },
                        },
                        "analyzer": {
                            "autocomplete": { 
                                "type": "custom",
                                "tokenizer": "standard",
                                "char_filter": [
                                    "special_char_remove"
                                ],
                                "filter": [
                                    "lowercase",
                                    "standard",
                                    "edge_ngram",
                                    "ngram",
                                    "indonesian_stop",
                                    "indonesian_stemmer"
                                ]
                            },
                            "edge_ngram": {
                                "type": "custom",
                                "tokenizer": "standard",
                                "char_filter": [
                                    "special_char_remove"
                                ],
                                "filter": [
                                    "lowercase",
                                    "edge_ngram",
                                    "indonesian_stop",
                                    "indonesian_stemmer"
                                ]
                            },
                            "keyword_edge_ngram": {
                                "type": "custom",
                                "tokenizer": "keyword_tokenizer",
                                "char_filter": [
                                    "whitespace_remove",
                                    "special_char_remove"
                                ],
                                "filter": [
                                    "lowercase",
                                    "edge_ngram"
                                ]
                            },
                            "num_for_word": {
                                "type": "custom",
                                "tokenizer": "standard",
                                "char_filter": [
                                    "special_char_remove",
                                    "mapping_alpha_num"
                                ],
                                "filter": [
                                    "lowercase",
                                    "edge_ngram",
                                    "ngram",
                                    "indonesian_stop",
                                    "indonesian_stemmer"
                                ]
                            },
                            "keyword": {
                                "type": "custom",
                                "tokenizer": "keyword_tokenizer",
                                "filter": [
                                    "lowercase"
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
        console.log(error);
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