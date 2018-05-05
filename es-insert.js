const Client = require('./es-connection').Client;

const badWords = [
    'aktif','AKTIF ANTARIN','Aktif anterin','Aktifasi BRILINK Berhasil',
    'aktifasi uangku','Aktifkan cashback  pertransaksi','gojek','Gojek','Go jek',
    'Go-jek','GOJEK','GO JEK','GO-JEK','GOJEK ','gojek','GOJEK','GOJEK','GOJEK AKTIF',
    'gojek bro','Go-jek/Go-pay','Go-jek/GO-pay','GO-JEK/GO-PAY','Gojek/Grab',
    'Go-jek indonesia','Gojek indonesia','Go-Jek Indonesia','GO JEK INDONESIA',
    'gojek.jktj@gmail.com','Gojek Online','GOJEK Online','gopay','Gopay','GOPAY',
    'GOPAY JT','Gopay Bonus','gopayfazz','GoPayFazz','GOPAY GOJEK','gopayy','grab',
    'Grab','GRAB','Grab aktif','grabber','GrabBike','Grab Bike','grabcarr','GRAB-ID',
    'GRAB-ID-AKTIF','Grabpay','hadiah','Hadiah','HADIAH','HADIAH JTA','HADIAH ',
    'HADIAH Jt','HADIAH .Juta','HADIAH BCA','HADIAH BRI HP','HADIAH BRI KULKAS',
    'Hadiah brilink','HADIAH BRI LINK','hadiah bri televisi','HADIAH BRI TELEVISI',
    'HADIAH GOJEK','HADIAH GO-JEK','HADIAH GOPAY','HADIAH  GO-PAY','HADIAH GO-PAY',
    'HADIAH INDOSAT','Hadiah jogek','HADIAH MOTOR','HADIAH POIN TELKOMSEL','HADIAHPRM',
    'HADIAH Rp. ..','HADIAH Rp...','HADIAH TELKMSEL','Hadiah TelkomseI',
    'HadiaH TelkomseL','HADIAHTELKOMSEL','HADIAH TELKOMSEL','Hadiah T-seL',
    'HADIAhTSEL','indosat','INDOSAT SDJ','Kudo','KUDO CELL','Kudo Cs',
    'KUDOKU','Kudota','KUDOTRENI','kudou','point anda','PT GO-JEK','shopee',
    'shopeeacc','telkomsel','TELKOMSEL','telkomsel','Telkomsel','topup',
    'Topup Game','TOPUP PULSA','Uber','UBER','Uber Aktic','uber aktif',
    'UBER(aktif)','UBER AKTIF','UBER  AKTIF','UBER AKTIF ','UBER-AKTIF',
    'uber aktiv','UBER AKTIVE','UBERDRE-','UBER GREF AKTIF','UBER KE GRAB','UBER SKTIF',
    'SALDO', 'pulsa', 'PAKET', 'motor', 'televisi', 'kantor pusat', 'pusat', 'kantor'
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