/**
 *
 * SDK: https://cloud.google.com/nodejs/docs/reference/dialogflow/latest/dialogflow/v2.agentsclient#_google_cloud_dialogflow_v2_AgentsClient_setAgent_member_1_
 *
 * HOW TO USE?
 * - Read REAMDE.md
 * - Run:
 *    node -r dotenv/config dialogflow/setAgent-SDK.js <projectId> <displayName>
 */

import { credentials } from "../credentials.js";
import { AgentsClient } from "@google-cloud/dialogflow";

async function main(projectId, displayName) {
  const location = "us";
  const parent = "projects/" + projectId + "/locations/" + location;

  const client = new AgentsClient({
    credentials,
    apiEndpoint: location + "-dialogflow.googleapis.com",
  });

  // https://googleapis.dev/nodejs/dialogflow/latest/google.cloud.dialogflow.v2.Agent.html
  const agent = {
    parent, // required
    displayName,
    timeZone: "America/Los_Angeles", // required
    // defaultLanguageCode: "en",
  };

  async function setAgent() {
    const request = { agent };
    const response = await client.setAgent(request);
    // console.log(`response: ${JSON.stringify(response, null, 2)}`);
    console.log(response);
  }
  await setAgent();
}

process.on("unhandledRejection", (err) => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));

/*
Return example:
[
  {
    supportedLanguageCodes: [],
    parent: 'projects/id-of-project/locations/us',
    displayName: 'Agent Id of Project',
    defaultLanguageCode: 'en',
    timeZone: 'America/Los_Angeles',
    description: '',
    avatarUri: '',
    enableLogging: false,
    matchMode: 'MATCH_MODE_UNSPECIFIED',
    classificationThreshold: 0,
    apiVersion: 'API_VERSION_V2',
    tier: 'TIER_UNSPECIFIED'
  },
  null,
  null
]
*/
