const axios = require('axios')
 require('dotenv').config()

const getProfileInformations = async () => {
  try
  {
    const requestUrl = `https://graph.facebook.com/v2.6/5928197517238041?access_token=${process.env.VERIFY_TOKEN}`;
    const result =  await axios.get(requestUrl);
    return result.data;
    // console.log(result.data);
  }
  catch (error)
  {
    console.error(error)
  }
};
// Exports
module.exports = {
    getProfileInformations
};