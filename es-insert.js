const Client = require('./es-connection').Client;

const badWords = [
    'aktif', 'berhasil',
    'aktifasi','gojek','Gojek','Go jek',
    'Go-jek','GOJEK','GO JEK','GO-JEK','gojek','GOJEK','GOJEK','GOJEK AKTIF',
    'gojek bro','Go-jek/Go-pay','Go-jek/GO-pay','GO-JEK/GO-PAY','Gojek/Grab',
    'gopay','Gopay',
    'gopayfazz',
    'Grab','GrabBike','Grab Bike','grab car','GRAB-ID', 'grabcar',
    'Grabpay', 'ovo',
    'indosat', 'Kudo', 'point','PT GO-JEK',
    'shopee','telkomsel',
    'topup', 'Uber',
    'aktiv', 'SALDO', 'pulsa', 'paket', 'motor', 'televisi', 'umroh',
    'agenbrilink','agen','brilink', 'agenbrilinkkess','promo','casback','jta',
    'cashback','juta','aktifasi','akun', 'jt', 
    'trima','b0nus','g0pay','bankgopay', 'acktive','jabar','mocas','mocash',
    'mocashbri', 'point', 'tunai', 'driver','pemenang', 'gojekgopay','gojekgrab',
    'ind0nesia','indonesia','customer','grafari','grapari',
    'tsel','kulkas','kontol','kejutan','kupon','mobil', 'hadiah',
    'paket', 'uang', 'pembayaran','listrik','token', 'melayani',
    'bpjs','topup','tiket','transfer', 'bank', 'kereta',
    'daftar', 'poin', 'haji', 
    'pt', 'telkom',
    'pedia','pediacom', 'trimah',
    'undangan','voucher', 'drivergojekbro', 'telk0msel','telkomsei',
    'tsell', 'tv',
    'pt ','p.t','p.t.','kfc','mcdonald','shopback','blibli','lazada','burgerking','burger king',
    'pizza','pizza hut','7 eleven','subway','taco bell','carrefour', 'pay tren', 'paypro', 'pay pro',
    'payfazz', 'giant', 'hypermart', 'uniqlo', 'tukar', 'bonus'
];


let setupArr = [];
const bulkWords = badWords.map((badWord, index) => {
    setupArr.push({index: { _index: 'badwords', _type: "_doc",_id: index+1}});
    setupArr.push({name: badWord});
});

const BulkInsert = async () => {
    try {
        const response = await Client.bulk({
            body: setupArr
        })
        console.log('Bulk Insert success');
        return response;
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
}

module.exports = {
    BulkInsert
}