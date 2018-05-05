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
                size : 20,
                query: {
                    multi_match: {
                        query: keyword,
                        fields: [
                            "name", "name.autocomplete", "name.keyword^10"
                        ]
                    }
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

            console.log(resArrObj.length);
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


ProcessEngine('telkomsel').then(() => Promise.resolve());