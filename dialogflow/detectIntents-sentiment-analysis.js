/**
 * Source: https://cloud.google.com/dialogflow/es/docs/how/sentiment#detect-intent-sentiment-nodejs
 *
 * REMARK: To get the sentiment in the response, you need
 *  - either to use "sentimentAnalysisRequestConfig" in the request
 *  - or to enable it on DF console (settings > advanced)
 *
 * HOW TO USE?
 * - Read REAMDE.md
 * - Run:
 *    node -r dotenv/config dialogflow/detectIntents-sentiment-analysis.js <projectId>
 */

import { credentials } from "../credentials.js";
import { SessionsClient } from "@google-cloud/dialogflow";
import { v4 as uuidv4 } from "uuid";

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function main(projectId = "your-project-id") {
  const location = "global";

  // A unique identifier for the given session
  const sessionId = uuidv4();

  // Create a new session
  const sessionClient = new SessionsClient({
    credentials,
    apiEndpoint: location + "-dialogflow.googleapis.com",
  });

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
        text: "I don't like this",
        // The language used by the client (en-US)
        languageCode: "en-US",
      },
    },
    // queryParams: {
    //   sentimentAnalysisRequestConfig: {
    //     analyzeQueryTextSentiment: true,
    //   },
    // },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log("Detected intent");
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log("  No intent matched.");
  }
  if (result.sentimentAnalysisResult) {
    console.log("Detected sentiment");
    console.log(
      `  Score: ${result.sentimentAnalysisResult.queryTextSentiment.score}`
    );
    console.log(
      `  Magnitude: ${result.sentimentAnalysisResult.queryTextSentiment.magnitude}`
    );
  } else {
    console.log("No sentiment Analysis Found");
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

main(...args).catch(console.error);

/*
Example output:

Detected intent
  Query: hello
  Response: Hi! How are you doing?
  Intent: Default Welcome Intent
*/
