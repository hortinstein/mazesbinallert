//mazesbinallert
const axios = require('axios');
const cheerio = require('cheerio');

//opens up a list for the group text file

var argv = require('minimist')(process.argv.slice(2));
const fs = require('fs');

console.log(argv);

let accountSid =  '';
let authToken =   '';
let twilioNumber ='';
let myNumber =    '';

if ('config' in argv){
    console.log('loading configuration file');
    let rawdata = fs.readFileSync(argv['config']);
    let configlist = JSON.parse(rawdata);
    
    accountSid =    configlist['accountSid'];
    authToken =     configlist['authToken'];
    twilioNumber =  configlist['twilioNumber'];
    myNumber =      configlist['myNumber'];
} else {
    console.log('loading from env file');
    accountSid =    process.env.TWILIO_ACCOUNT_SID;
    authToken =     process.env.TWILIO_AUTH_TOKEN;
    twilioNumber =  process.env.TWILIO_PHONE_NUMBER;
    myNumber =      process.env.MY_PHONE_NUMBER;
}

const client = require('twilio')(accountSid, authToken);

async function send_group_text(text){
    if ('grouplist' in argv){
        console.log('loading grouplist from '+ argv['grouplist'])
        let rawdata = fs.readFileSync(argv['grouplist']);
        let group_data = JSON.parse(rawdata);
        for (var key in group_data) {
            if (group_data.hasOwnProperty(key)) {
                console.log('sending text to ',key);
                send_text(text,group_data[key]);
            }
        }
    }
}

diff_data = ''

async function send_text(text,dest_num){
    console.log("Sending Text to "+dest_num+": "+ text);
    client.messages
    .create({
        body: text,
        from: twilioNumber,
        to: dest_num
    })
    .then(message => console.log(message.sid))
    .catch(e => { console.error('Got an error:', e.code, e.message); });
}

async function check_sbins(){
    axios.get('http://www.mazesp.in')
        .then(response => {
            const html = response.data;    
            //console.log(html);
            // body > div > div.table-responsive > table > tfoot > tr > td:nth-child(9)
            const $ = cheerio.load(html);
            //advanced spin detection algorithm
            const scrapedata = $('tfoot').text().trim().split(/\s+/)[8];
            //init
            if (diff_data == ''){
                diff_data = scrapedata;
                send_text("MAZESBINALLERT INIT: "+ scrapedata + " mazespins this season; спwеинек!",myNumber);
            } else if (diff_data != scrapedata){
                var text = "MAZESBINALLERT: HE SPUN OUT!!! " + scrapedata + " mazespins this season; спwеинек!"
                send_text(text,myNumber);
                send_group_text(text);
                diff_data = scrapedata;
            }
        })
}

check_sbins();
setInterval(check_sbins,60000);
check_sbins();
//this alerts every friday hours to make sure you never forget about our spinny boy
setInterval(function fn(){send_text('MAZESBINALLERT: still running...some say hes still spinning',myNumber)},60000 * 60 * 168);
// setInterval(function fn(){console.log("diff_data: " +diff_data)},5000);
// setInterval(function fn(){
//     diff_data = 'test';
//     console.log('testing the diff data');
// },60000);
