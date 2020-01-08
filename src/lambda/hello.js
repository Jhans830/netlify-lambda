const axios = require("axios");

// serverless letlify lambda function, 
// intermediate between client and github apiv4

exports.handler = (event, context, callback) => {
  const getrepos = () => {
    axios({
    method: "get",
    url: `https://api.github.com/repos/Jhans830/netlify-lambda`,
    headers: {
        Authorization: `Bearer 7e27c42644a636cbe38e5e8aa486ef1b907390ae`,
        "Content-Type": "application/json"
    },
    })
    .then(res => {
        callback(null, {
            statusCode: 200,
            body: JSON.stringify(res.data)
        });
    })
    .catch(err => {
        callback(err);
    });
  };

  // Make sure method is GET
  if (event.httpMethod == "GET") {
    // Run
    getrepos();
  }
};