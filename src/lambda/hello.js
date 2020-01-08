const axios = require("axios");

// serverless letlify lambda function, 
// intermediate between client and github apiv4

exports.handler = (event, context, callback) => {
  const URL = `https://api.github.com/graphql`;
  const accessToken = "7e27c42644a636cbe38e5e8aa486ef1b907390ae";
  const query = `
  query {
    repositoryOwner(login:"jhans830@gmail.com"){
      pinnedRepositories(first:10) {
        nodes {
          name
          url
          homepageUrl
          description
          repositoryTopics(first:10) {
            nodes {
              topic {
                name
              }
            }
          }
        }
      }
    }
  }`;

  // Send json response to the react client app
  const send = body => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(body)
    });
  };

  // Perform API call
  const getrepos = () => {
    axios({
      method: "POST",
      url: URL,
      data: JSON.stringify({ query }),
      headers: {
        Authorization: `Bearer c8d54f276daae14b8045184a6f171d0a15976893`
      }
    })
      .then(res => send(res.data.data.repositoryOwner.pinnedRepositories.nodes))
      .catch(err => send(err));
  };

  // Make sure method is GET
  if (event.httpMethod == "GET") {
    // Run
    getrepos();
  }
};