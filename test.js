const { flatten } = require('lodash');
const fs = require('fs');

const words = [
    'agenbrilink','agen brilink','agen brilink 14017',
'agenbrilink afcellular','agen brilink bakul pulsa  atk','agen brilink berliyana',
'agenbrilinkkess','agen brilink promo casback 3jta',
'agen brilink promo cashback 5juta','agen brilink rairaka 2','agus brilink','akhadiah yuluani',
'aktifasi brilink berhasil','akun gojek aktif','alfa brilink','anda trimahadiah gojek 1jt',
'anton promono','arridhobrilink','atang karya mandiri agen brilink bri','b0nus gopay','bankgopay',
'bonusgojek','bonus gojek','bonus gopay','bonus gopay 1jt','bribrilink','bri brilink','brilink',
'brilink ','brilink5jt','brilink acktive','brilink arsy','brilink giarto','brilink hm','brilink jabar',
'brilink lamkuta','brilink mocasbri','brilink mocash','brilink mocashbri','brilink ochient',
'brilink point susinawati','brilinks','bukit salju agen brilink ambun pagi  agam','bunushadiah',
'bunus hadiah ','dana hadiah','danapromo','dedi brilink','drbrilink','driver gojek aktif','dwi gojek ',
'eka brilink point rp1 juta','fahma brilink','fendi pemenang 3jt','gojek','go jek','gojek ','gojek1234',
'gojek800','gojek aktif','gojekgopay','gojekgrab','gojek ind0nesia','go jek indonesia',
'gojek indonesia','gojekjktj8091gmailcom','gojek online','gopay','go pay','gopay ','go pay aktif',
'gopay bonus','gopay customer','gopayfazz','gopay gojek','gopayy','grafari telkom ','hadia gojek',
'hadia gopay','hadiah','hadiah ','hadiah 1jta','hadiah 2018','hadiah 3 juta','hadiah 8jt','hadiah 8juta',
'hadiah bca','hadiah bri hp','hadiah brilink','hadiah bri link','hadiah gojek','hadiah gopay',
'hadiah  gopay','hadiahmad','hadiah motor','hadiah poin telkomsel','hadiahpr0m02018','hadiah rp5000000',
'hadiah rp 5000000','hadiah sepedah motor','hadiahtelkomsel','hadiah telkomsel','hadiah  telkomsel',
'hadiahtsel','hadiah tsel','hadia kulkas','hadia telkom','hadia telkomsel','hadiya gojek','hadiya telkomsel',
'hdiahpromo10jt','hdiahpromo10juta','hdiahpromo2018','idr gopay','jpshopee','kantorgojek','kejutan hadiah',
'kembali dana 22jt','kontol gojek','kulkas','kulkas220','kulkas2202','kulkas 2 pintu','kupon123','kupon2018',
'kupon mobil toyota avana','kupon paket umroh','kupon uang tunai 10juta ','mayadi gojek',
'mbah putri melayani pembayaran listrik token bpjs top up gopay transfer bank pulsa tiket kereta daftar grab ',
'mimi shopee','mitra gojek','pemenang ','pemenang gojek 3jt','pemenang telkomsel',
'perwanti pemenang',' pmng gopay shofa','poinhadiah','pratamafastgopay','promo',
'promo2018','promo bankbri','promo bank bri','promo bank bri ','promo brilink cashback 3juta',
'promo gopay','promo haji','promohdiah10jt','promo umbroh','pt gojek','pt telkomsel',
'sadewo brilink','sakinah brilink','selamat anda terimah kupon ',
'selamat  televisi toshiba 42 in  uang tunai 4000000 juta','shopee','shopeeacc',
'supromo','sutejo promono liong','televisi','televisi 56 inc','televisi lg toshiba 42 in ',
'telkom','telkomsel','telkomsel ','telkomsel10','telkomsel19','telkomunikasi','teras brilink',
'terima bonus 2jta','terimagopay','terimahadiah','terima hadiah','terima hadiah rp5000000',
'tokopedia','tokopediacom','top up gopay','top up gopay rp 1000000','toup gopay','tri brilink',
' trima dana 2jt','trima dana 2jt','trimahadiah','trimahadiah limajuta','trimahdana2jtgmailcom',
'trimah hadiah','trima kasih go jek','udangan syah brilink','undangan brilink',
'voucher gopay','warsi brilink dawung','wijang pemenang','active brilink','agen brilink','aktivasi brilink berhasil',
'akun gojek anda aktif','b0nus gopay','bonus gojek','bonus gopay','bonus gopay 1tj',
'bonus gopay 20000000','bonus voucher gojek','bonusgojek','bri brilink','brilink','brilink kulkas',
'brilink poin','brilink saldo','dana gojek','dana gojek rp3jt','dana gopay rp 3jt','dana promo t sel',
'drivergojek','gojek','gojek bro','gojek online','gopay','gopay 1jt','gopay1000000',
'hadia gopay','hadia telkomsel','hadiah','hadiah bri hp','hadiah bri kulkas','hadiah bri televisi',
'hadiah gojek','hadiah gopay','hadiah indosat','hadiah jogek','hadiah telk0msel',
'hadiah telkomsei','hadiah telkomsel','hadiah tsel','hadiah tsell','kantorgojek',
'kulkas','kulkas 2 pintu','kupon','kupon mobil toyota avana','kupon paket umroh',
'led tv kulkas','paket umroh brilink','pemenang gojek','pemenang telkomsel',
'promo brilink','pt gojek','setyo promono','surat undangan brilinkk',
'televisi','telkom','telkomsel','telkomsel ','tokopedia','trima dana 2jt','trma dana 2jt'];



let split_words = [];

words.map(word => {
    const split_per_words = word.split(' ');
    split_words.push(split_per_words);
});


const flat_words = flatten(split_words);

const uniq = [...new Set(flat_words)];

fs.open('words.txt', 'a', (err, fd) => {
    if (err) throw err;
    uniq.map(unq => {
        fs.appendFile(fd, `'${unq}'\n`, 'utf8', (err) => {        
            if (err) throw err;
        });
    })

    fs.close(fd, (err) => {
        if (err) throw err;
    });
});




