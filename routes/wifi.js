const express     = require('express');
const router      = express.Router();

const xlsx        = require('xlsx');
const WifiModel   = require('../models/wifi') 

router.get('/', function(req, res) {
    res.render('wifi');
});

router.get('/bulk', async function(req, res) {
    const excelFile = xlsx.readFile('./12_04_07_E_무료와이파이정보.xlsx');
    const sheet = excelFile.Sheets[excelFile.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);
    
    var wifi = new Array()
    for(let i=0; i<data.length; i++) {
        let temp = [
                    data[i]['설치장소명'], 
                    data[i]['설치시군구명'],
                    data[i]['서비스제공사명'],
                    data[i]['소재지도로명주소'],
                    data[i]['WGS84위도'],
                    data[i]['WGS84경도']
                   ];
        wifi.push(temp);
    }
    const result = await WifiModel.AddWifisBulk(wifi);
    if (result.error) {
        console.log(result.error);
        res.send(result.error);
    }
    else {
        console.log('WIFIs Inserted');
        res.send(result.result);
    }
});
module.exports = router;