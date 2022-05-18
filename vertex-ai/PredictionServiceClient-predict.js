/**
 * API: https://cloud.google.com/nodejs/docs/reference/aiplatform/latest/aiplatform/v1.predictionserviceclient#_google_cloud_aiplatform_v1_PredictionServiceClient_predict_member_1_
 * An example of a prediction of a custom trained model:
 * https://github.com/googleapis/nodejs-ai-platform/blob/main/samples/predict-custom-trained-model.js
 *
 * HOW TO USE?
 * - Read REAMDE.md
 * - Run:
 *   node -r dotenv/config vertex-ai/PredictionServiceClient-predict.js "text to be predicted"
 */

import { credentials } from "../credentials.js";
import { PredictionServiceClient } from "@google-cloud/aiplatform";

const projectId = "ideta-ai-apis";
const location = "europe-west1";
const endpointId = "8340349850541359104";

async function main(text = "I love you so much!") {
  const buff = new Buffer.from(text);
  const base64encoded = buff.toString("base64");
  console.log(`base64encoded: ${base64encoded}`);

  const clientOptions = {
    credentials,
    apiEndpoint: `${location}-aiplatform.googleapis.com`,
  };

  const predictionServiceClient = new PredictionServiceClient(clientOptions);

  const endpoint = `projects/${projectId}/locations/${location}/endpoints/${endpointId}`;
  console.log(`endpoint: ${endpoint}`);
  // const instances = [
  //   {
  //     data: {
  //       b64: base64encoded,
  //     },
  //   },
  // ];

  // const instances = [
  //   JSON.parse('[{"data":{"b64":"WW91IGFyZW4ndCBraW5kLCBpIGhhdGUgeW91Lg=="}}]'),
  // ];

  const parameters = {
    structValue: {
      fields: {},
    },
  };
  const _instances = {
    data: {
      b64: "WW91IGFyZW4ndCBraW5kLCBpIGhhdGUgeW91Lg==",
    },
  };
  const instance = {
    structValue: {
      fields: {
        data: {
          structValue: {
            fields: { b64: { stringValue: _instances.data.b64 } },
          },
        },
      },
    },
  };
  const instances = [instance];

  // console.log(`instances: ${JSON.stringify(instances, null, 2)}`);
  const request = {
    endpoint,
    instances,
    parameters,
  };
  const [response] = await predictionServiceClient.predict(request);

  console.log("Predict custom trained model response");
  console.log(`\tDeployed model id : ${response.deployedModelId}`);
  const predictions = response.predictions;
  console.log("\tPredictions :");
  for (const prediction of predictions) {
    console.log(`\t\tPrediction : ${JSON.stringify(prediction)}`);
  }
}

process.on("unhandledRejection", (err) => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
