/**
 * Source: https://github.com/googleapis/nodejs-dialogflow/blob/94e1b7bc7e78b985bc5d03bc0351115a66ce2af1/samples/resource.js#L27
 * (found from here: https://snyk.io/advisor/npm-package/dialogflow/functions/dialogflow.EntityTypesClient -> search for "createEntityType")
 * SDK:
 *  - (modern doc) https://cloud.google.com/nodejs/docs/reference/dialogflow/latest/dialogflow/v2.entitytypesclient#_google_cloud_dialogflow_v2_EntityTypesClient_createEntityType_member_1_
 *
 * HOW TO USE?
 * - Read REAMDE.md
 * - Uncomment PRIVATE_KEY AND CLIENT_EMAIL in .env file
 * - Modify "projectId", "entityType" in the request
 * - Run:
 *    node -r dotenv/config dialogflow/createEntityType.js
 */

import { credentials } from "../credentials.js";
import { EntityTypesClient } from "@google-cloud/dialogflow";

async function main() {
  const location = "us";
  const client = new EntityTypesClient({
    credentials,
    apiEndpoint: `${location}-dialogflow.googleapis.com`,
  });

  // The path to the agent the created entity type belongs to.
  // const agentPath = entityTypesClient.projectAgentPath(credentials.projectId);
  // /* ###Thi */ console.log('>>>> agentPath', agentPath);

  const projectId = "testing-1-bcpa"
  /* ###Thi */ console.log('projectId: ', projectId);

  const createEntityTypeRequest = {
    parent: `projects/${projectId}/locations/${location}/agent`,
    entityType: {
      displayName: "newEntityThree",
      kind: "KIND_MAP",
      autoExpansionMode: "AUTO_EXPANSION_MODE_DEFAULT",
      entities: [{ value: "new value ss", synonyms: ["new value", "value"] }],
    },
    languageCode: "en",
  };

  const responses = await client.createEntityType(
    createEntityTypeRequest
  );
  console.log(JSON.stringify(responses, null, 2));
}

process.on("unhandledRejection", (err) => {
  console.error(err.message);
  process.exitCode = 1;
});

main();

// Return example:
// [
//   {
//     "entities": [
//       {
//         "synonyms": [
//           "new value",
//           "value"
//         ],
//         "value": "new value ss"
//       }
//     ],
//     "name": "projects/testing-1-bcpa/locations/us/agent/entityTypes/91fce172-de98-4a62-81fb-e013cc1358f9",
//     "displayName": "newEntityThree",
//     "kind": "KIND_MAP",
//     "autoExpansionMode": "AUTO_EXPANSION_MODE_DEFAULT",
//     "enableFuzzyExtraction": false
//   },
//   null,
//   null
// ]