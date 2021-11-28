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



const axios = require("axios");
require('dotenv').config();


const { YOUR_API_KEY } = require("../config");


const tlClient = axios.create({
  baseURL: "https://api.textlocal.in/",
  params: {
    apiKey: YOUR_API_KEY, //Text local api key
    sender: "6 CHARACTER SENDER ID"
  }
});

const smsClient =  {
   sendVerificationMessage: user => {
    if (user && user.phone) {
      const params = new URLSearchParams();
      params.append("numbers", [parseInt("91" + user.phone)]);
      params.append(
        "message",
        `Your Myzon verification code is ${user.otp}`
      );
      tlClient.post("/send", params);
    }
  }
}; 

module.exports = smsClient;