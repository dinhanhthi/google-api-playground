/**
 * Source:
 * SDK: https://googleapis.dev/nodejs/dialogflow/4.5.0/v2.AgentsClient.html#searchAgents
 * There is no original sample code for this api.
 * Samples on Github: https://github.com/googleapis/nodejs-dialogflow#samples
 *
 * HOW TO USE?
 * In .env, set the following variables: CLIENT_EMAIL, PRIVATE_KEY
 * Have to change the parameters (location, parent)
 * Run:
 *    node -r dotenv/config dialogflow/searchAgents-SDK.js
 */

// "use strict";

// require("dotenv").config();
import { private_key, client_email } from "../credentials.js";
import { AgentsClient } from "@google-cloud/dialogflow";

async function main() {

  const location = "global";
  // const location = "europe-west1";

  const parent = "projects/-/locations/" + location;
  // const parent = "projects/-";

  const client = new AgentsClient({
    credentials: { private_key, client_email },
    apiEndpoint: location + "-dialogflow.googleapis.com",
  });
  // const formattedParent = client.projectPath(parent);

  async function searchAgents() {
    const request = {
      // parent: formattedParent,
      parent: parent,
    };

    const options = {
      autoPaginate: false,
    };

    // const [response] = await client.searchAgents(request);
    const response = await client.searchAgents(request);
    // const [response] = await client.searchAgents(request, options);
    // console.log(`response: ${JSON.stringify(response, null, 2)}`);
    console.log(response);

    // const iterable = client.searchAgentsAsync(request);
    // for await (const response of iterable) {
    //   console.log(`response: ${JSON.stringify(response, null, 2)}`);
    // }
  }
  await searchAgents();
}

process.on("unhandledRejection", (err) => {
  console.error(err.message);
  process.exitCode = 1;
});

main();

// only this???
// response: {
//   "supportedLanguageCodes": [],
//   "parent": "projects/testing-1-bcpa/locations/global",
//   "displayName": "testing_1",
//   "defaultLanguageCode": "en",
//   "timeZone": "Europe/Kaliningrad",
//   "description": "",
//   "avatarUri": "",
//   "enableLogging": true,
//   "matchMode": "MATCH_MODE_HYBRID",
//   "classificationThreshold": 0,
//   "apiVersion": "API_VERSION_V2",
//   "tier": "TIER_STANDARD"
// }
