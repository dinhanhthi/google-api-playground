// import * as request from 'request-promise-native';

require("dotenv").config();

const { google } = require("googleapis");
const request = require("request");

async function main() {
  var token;

  const auth = new google.auth.GoogleAuth({
    keyFilename:
      "/Users/thi/git/ideta/gcp-credentials/testing-1-bcpa-956fee3f8584.json",
    // Scopes can be specified either as an array or as a single, space-delimited string.
    scopes: ["https://www.googleapis.com/auth/dialogflow"],
  });

  async function getAccessToken() {
    const authClient = await auth.getClient();
    // const token = await authClient.getAccessToken();
    token = await authClient.getAccessToken();
    // console.log(token);
    return token;
  }

  await getAccessToken();

  // console.log(">>token: ", token.token);

  const location = "global";
  // const location = "europe-west1";
  const parent = (location) => "projects/-" + "/locations/" + location;
  const parentPath = parent(location);

  request.get(
    // `https://${location}-dialogflow.googleapis.com/v2/${parentPath}`,
    `https://dialogflow.googleapis.com/v2/projects/-/agent:search`,
    {
      auth: {
        bearer: token.token,
      },
    },
    function (err, res) {
      if (err) {
        console.error(err);
      } else {
        console.log(res.body);
      }
    }
  );
}

main();
