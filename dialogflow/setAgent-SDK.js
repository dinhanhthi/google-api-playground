/**
 * HOW TO USE?
 * read README.md
 * Change parameters in .env and // Parameters
 */

"use strict";

require("dotenv").config();

async function main() {
  // [START dialogflow_set_agent_sample]
  const { AgentsClient } = require("@google-cloud/dialogflow");

  // Parameters
  const location = "us";
  const displayName = "sdk_api-test";
  const parentId = process.env.PROJECT_ID; // project_id
  const privateKey = process.env.PRIVATE_KEY;
  const clientEmail = process.env.CLIENT_EMAIL;

  const parent = "projects/" + parentId + "/locations/" + location;

  const agent = {
    parent: parent,
    displayName: displayName,
    defaultLanguageCode: "en",
    timeZone: "America/Los_Angeles",
  };

  const client = new AgentsClient({
    credentials: { private_key: privateKey, client_email: clientEmail },
    apiEndpoint: location + "-dialogflow.googleapis.com",
  });

  async function setAgent() {
    const request = {
      agent,
    };

    // const [response] = await client.setAgent(request);
    const response = await client.setAgent(request);
    // console.log(`response: ${JSON.stringify(response, null, 2)}`);
    console.log(response);
  }
  await setAgent();
  // [END dialogflow_set_agent_sample]
}

process.on("unhandledRejection", (err) => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
