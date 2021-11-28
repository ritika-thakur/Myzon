// const fast2sms = require("fast-two-sms");
// const {FAST2SMS} = require("../config");
 

 //var options = {API_KEY: YOUR_API_KEY};
// // fast2sms.init(options);



// exports.fast2sms = async ({ message, contactNumber }, next) => {
//   try {
//     const res = await fast2sms.sendMessage({
//       authorization: FAST2SMS,
//       message,
//       numbers: [contactNumber],
//     });
//     console.log(res);
//   } catch (error) {
//     next(error);
//   }
// };
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////



var http = require('http');

var urlencode = require('urlencode');


const sendMessage =  {sendVerificationMessage: user =>{

    var username = "myzonsales@gmail.com";

    var hash = urlencode('ae01d50559dc65319d30d5102c99c3a3e0bceef114e6bb12e86eddf986c36437'); 

    var sender = urlencode('TXTLCL');

    var msg=encodeURIComponent("Your Myzon verification code is ${user.otp}");

    var data = '/send?username=' + username + '&hash=' + hash + '&sender=' + sender + '&numbers=' + user.phone + '&message=' +msg ;

    var options = {

      host: 'api.textlocal.in', path: data

    };

    callback = function (response) {

      var str = '';

      response.on('data', function (chunk) {

        str += chunk;

      });

      response.on('end', function () {

        // console.log(str);

        res.end(JSON.stringify({ success: 'success' }));

      });

    }

    console.log(options);

    http.request(options, callback).end();

}
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////








const axios = require("axios");
require('dotenv').config();
//var tl = require('TextLocal')(validOptions);


const { YOUR_API_KEY } = require("../config");



var validOptions = { apikey: "MzA2OTVhNzA1MTZmNGM0ODUzNGU1NDVhNTQ0ZTZlNDE="};

var tl = require('textlocal')(validOptions);

// const tlClient = axios.create({
//   baseURL: "https://api.textlocal.in/",
//   params: {
//     apiKey: YOUR_API_KEY, //Text local api key
//     sender: "6 CHARACTER SENDER ID"
//   }
// });

const smsClient =  {
   sendVerificationMessage: (user) => {
     
    var username = "myzonsales@gmail.com";

    var hash = urlencode('ae01d50559dc65319d30d5102c99c3a3e0bceef114e6bb12e86eddf986c36437'); 

    var sender = urlencode('TXTLCL');

    var msg=encodeURIComponent("Your Myzon verification code is ${user.otp}");

    var data = '/send?username=' + username + '&hash=' + hash + '&sender=' + sender + '&numbers=91' +user.phone + '&message=' +msg ;

    var options = {

      host: 'api.textlocal.in', path: data

    };

    callback = function (response) {

      var str = '';

      response.on('data', function (chunk) {

        str += chunk;

      });

      response.on('end', function () {

         console.log(str);

        // res.end(JSON.stringify({ success: 'success' }));

      });

    }

    console.log(options);

    http.request(options, callback).end();

  }
}; 

module.exports = smsClient;
