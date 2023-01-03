const axios = require('axios')
const getProfileInformations = async (id) => {
  try
  {
    const requestUrl = `https://graph.facebook.com/v2.6/${id}?access_token=${process.env.VERIFY_TOKEN}`;
    const result =  await axios.get(requestUrl);
    return result.data;
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