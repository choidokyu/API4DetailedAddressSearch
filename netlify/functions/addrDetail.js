const fetch = require('node-fetch');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '.env' });
}


exports.handler = async function(event) {
  const { admCd, rnMgtSn, udrtYn, buldMnnm, buldSlno } = event.queryStringParameters;
  //const confmKey = process.env.CONFM_KEY;
  const confmKey = 'U01TX0FVVEgyMDI1MDUxMDA5MzQ0MjExNTczNzE=';
  console.log("confmKey :" , confmKey);
  const resultType = 'json';

  const apiUrl = `https://business.juso.go.kr/addrlink/addrDetailApi.do?admCd=${admCd}&rnMgtSn=${rnMgtSn}&udrtYn=${udrtYn}&buldMnnm=${buldMnnm}&buldSlno=${buldSlno}&resultType=${resultType}&confmKey=${confmKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.text();
    return {
      statusCode: 200,
      body: data,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "API 호출 실패", error: error.message })
    };
  }
};
