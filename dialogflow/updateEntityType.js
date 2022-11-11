/**
 * SDK:
 *  - (modern doc) https://cloud.google.com/nodejs/docs/reference/dialogflow/latest/dialogflow/v2.entitytypesclient#_google_cloud_dialogflow_v2_EntityTypesClient_updateEntityType_member_1_
 *  - (old theme doc) https://googleapis.dev/nodejs/dialogflow/4.5.0/v2.EntityTypesClient.html#updateEntityType
 *
 * HOW TO USE?
 * - Read REAMDE.md
 * - Uncomment PRIVATE_KEY AND CLIENT_EMAIL in .env file
 * - Go to DF console -> create a new entity type -> use get list entity type to get the name
 * - Modify "projectId", "name" in the request
 * - Run:
 *    node -r dotenv/config dialogflow/updateEntityType.js
 */

import { credentials } from "../credentials.js";
import { EntityTypesClient } from "@google-cloud/dialogflow";

async function main() {
  const location = "us";
  const client = new EntityTypesClient({
    credentials,
    apiEndpoint: `${location}-dialogflow.googleapis.com`,
  });

  const projectId = "testing-1-bcpa";

  const updateEntityTypeRequest = {
    parent: `projects/${projectId}/locations/${location}/agent`,
    entityType: {
      name: `projects/${projectId}/locations/us/agent/entityTypes/6a21d547-fbfb-4e5a-b3b4-23e55d60ac99`,
      displayName: "newEntityThreeFromSDK",
      kind: "KIND_MAP",
      autoExpansionMode: "AUTO_EXPANSION_MODE_DEFAULT",
      entities: [{ value: "new value ss", synonyms: ["new value", "value"] }],
    },
    languageCode: "en",
  };

  const responses = await client.updateEntityType(updateEntityTypeRequest);
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
//     "name": "projects/testing-1-bcpa/locations/us/agent/entityTypes/6a21d547-fbfb-4e5a-b3b4-23e55d60ac99",
//     "displayName": "newEntityThreeFromSDK",
//     "kind": "KIND_MAP",
//     "autoExpansionMode": "AUTO_EXPANSION_MODE_DEFAULT",
//     "enableFuzzyExtraction": false
//   },
//   null,
//   null
// ]
