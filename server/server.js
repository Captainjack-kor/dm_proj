// // 1. 서버 사용을 위해서 http 모듈을 http 변수에 담는다. (모듈과 변수의 이름은 달라도 된다.) 
// var http = require('http'); 

// // 2. http 모듈로 서버를 생성한다.
// //    아래와 같이 작성하면 서버를 생성한 후, 사용자로 부터 http 요청이 들어오면 function 블럭내부의 코드를 실행해서 응답한다.
// var server = http.createServer(function(request,response){ 

//     response.writeHead(200,{'Content-Type':'text/html'});
//     response.end('Hello node.js!!');

// });

// // 3. listen 함수로 8080 포트를 가진 서버를 실행한다. 서버가 실행된 것을 콘솔창에서 확인하기 위해 'Server is running...' 로그를 출력한다
// server.listen(9090, function(){ 
//     console.log('Server is running...');
// });

const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const dotenv = require("dotenv");
const axios = require("axios");
const PORT = 8080;
const CryptoJS = require("crypto-js");

dotenv.config();

// var method = "GET";
// var timestamp = Date.now() + '';
// var secretKey = "YOUR_SECRETKEY";
// var hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
// hmac.update(timestamp + '.' + method + '.' + api_url);
// var hash = hmac.finalize();
// hash.toString(CryptoJS.enc.Base64);

app.get('/keywordstool', function(req, res) {
  var method = "GET";
  var api_url = "/keywordstool";
  var timestamp = Date.now() + '';
  var accessKey = process.env.ACCESSKEY;
  var secretKey = process.env.SECRETKEY;

  var hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
  hmac.update(timestamp + '.' + method + '.' + api_url);


  var hash = hmac.finalize();
  hash.toString(CryptoJS.enc.Base64);
  //  encodeURI(req.query.hintKeywords)

  const request = require('request');
  const options = {
    url: 'https://api.naver.com/keywordstool?hintKeywords=' + req.query.real_data + '&showDetail=1',
    headers: {'X-Timestamp': timestamp, 'X-API-KEY': accessKey, 
              'X-API-SECRET': process.env.SECRETKEY, 'X-CUSTOMER': process.env.CUSTOMER_ID, 'X-Signature': hash.toString(CryptoJS.enc.Base64)}
    };
    // headers: {'X-Timestamp':timestamp, 'X-API-KEY': accessKey, 
    //           'X-API-SECRET': "YOUR_SECRETKEY", 'X-CUSTOMER': "YOUR_CUSTOMER_ID", 'X-Signature': hash.toString(CryptoJS.enc.Base64)}
    // };
    request.get(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
        res.end(body);
      } else {
        res.status(response.statusCode).end();
        console.log('error = ' + response.statusCode);
        console.log(error)
      }
    });
})

app.post("/data", async(req, res) => {
  try {
    const request_body = {
      startDate: "2022-06-14",
      endDate: "2022-07-14",
      timeUnit: "month",
      category: [{"name": "코카콜라", "param": ["50000000"]}],
      device: "",
      age: [],
      gender: ""
      // keywordGroups: [
      //   { groupName: "치킨", keywords: ["BBQ", "BHC", "교촌치킨"] },
      //   { groupName: "떡볶이", keywords: ["엽기떡볶이","신전떡볶이", "배떡"] },
      // ],
    };
    const url = 'https://openapi.naver.com/v1/datalab/shopping/categories';
    const headers =  {
      'Content-Type': 'application/json',
      'X-Naver-Client-Id': process.env.CLIENT_ID,
      'X-Naver-Client-Secret': process.env.CLIENT_SECRET,
    };
    const result = await axios.post(url, request_body, {
      headers: headers
    })
    console.log(req);
    console.log(result.data);
    return res.json(result.data);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

app.get("/total", async(req, res) => {
  try {
    const request_body = {
      // keywordGroups: [
      //   { groupName: "치킨", keywords: ["BBQ", "BHC", "교촌치킨"] },
      //   { groupName: "떡볶이", keywords: ["엽기떡볶이","신전떡볶이", "배떡"] },
      // ],
    };

    //req.query.real_data;

    const url = "https://openapi.naver.com/v1/search/shop.json?'";
    
    const headers =  {
      'X-Naver-Client-Id': process.env.CLIENT_ID,
      'X-Naver-Client-Secret': process.env.CLIENT_SECRET,
    };

    const params = {
      query: encodeURI("iphone"),
      sort: "sim",
      start: 1,
      display: 100,
    };

    const result = await axios.get({
      url: url,
      params: params,
      headers: headers,
    })
    console.log(req);
    console.log(result.data);
    return res.json(result.data);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

// app.post(("/total"), async(req, res) => {
//   const url = 'https://openapi.naver.com/v1/search/shop.json?';
//   const headers =  {
//     'X-Naver-Client-Id': process.env.CLIENT_ID,
//     'X-Naver-Client-Secret': process.env.CLIENT_SECRET,
//   };
//   const params = {
//     query: encodeURI("콜라"),
//     sort: "sim",
//     start: 1,
//     display: 100,
//   }
//   const result = await axios.get(url, {
//     headers: headers,
//     params: params
//   })
//   console.log(result);
//   return res.json(result.data);
// })

app.listen(PORT, () => console.log(`this server ${PORT}`))