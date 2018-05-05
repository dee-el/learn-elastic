const Client = require('./es-connection').Client;
const CreateIndex = require('./es-index').CreateIndex;
const DeleteIndex = require('./es-index').DeleteIndex;
const BulkInsert = require('./es-insert').BulkInsert;

/**
 * 
 * @param {String} keyword 
 */
const Search = async (keyword) => {
    try {
        return response = await Client.search({
            index: 'badwords',
            type: '_doc',
            body: {
                from : 0, 
                size : 5,
                query: {
                    // bool: {
                    //     should: [
                    //         {match: {"name.autocomplete": keyword}},
                    //         {match: {"name.keyword": keyword}},
                    //         {match: {"name": keyword}},
                    //     ],
                    //     minimum_should_match: 1
                    // }
                    multi_match: {
                        query: keyword,
                        fields: [ 
                          "name",
                          "name.edge_ngram",
                          "name.autocomplete",
                          "name.keyword",
                        ],
                        "type": "best_fields" ,
                        "tie_breaker": 0.5,
                    },
                    
                },
                terminate_after: 1000
            }
        });
    } catch (error) {
        return Promise.reject(error);
    }
}
/**
 * 
 * @param {String} keyword 
 */
const ProcessEngine = async (keyword) => {
    try {
        const result = await Search(keyword);
        if(result.hits.total !== 0){
            const resArrObj = result.hits.hits;
            resArrObj.map(obj => {
                console.log(obj);
            });
        }

        return true;
    } catch (error) {
        return Promise.reject(error);
    }
};

/**
 * OPEN SOME COMMENT IF WANT CHANGING THE PROTOTYPE
 */

// DeleteIndex('badwords');
// CreateIndex('badwords');
// BulkInsert();


ProcessEngine('bri').then(() => Promise.resolve());