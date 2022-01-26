// npm i
// node -r dotenv/config your_script.js
// # keys in .env

'use strict';

// [START dialogflow_quickstart]

const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(projectId = 'your-project-id') {
  // A unique identifier for the given session
  const sessionId = uuid.v4();

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
  );

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: 'hello',
        // The language used by the client (en-US)
        languageCode: 'en-US',
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log('  No intent matched.');
  }
}
// [END dialogflow_quickstart]

const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error(`
    USAGE:
       node quickstart.js <projectId>

     EXAMPLE:
       node quickstart.js my-project-id

    You can find your project ID in your Dialogflow agent settings:  https://dialogflow.com/docs/agents#settings.
  `);
  process.exit(1);
}

runSample(...args).catch(console.error);
