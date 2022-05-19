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
import { PredictionServiceClient, helpers } from "@google-cloud/aiplatform";

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
  console.log("\n--------------------------\n")
  console.log(helpers.toValue(_instances))
  console.log("\n--------------------------\n")
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

  const request = {
    endpoint,
    instances,
    parameters,
  };
  const [response] = await predictionServiceClient.predict(request);

  console.log("Predict custom trained model response");
  console.log(`Deployed model id : ${response.deployedModelId}`);
  const predictions = response.predictions;
  console.log("Predictions :");
  for (const prediction of predictions) {
    const decodedPrediction = helpers.fromValue(prediction);
    console.log(`- Prediction : ${JSON.stringify(decodedPrediction)}`);
  }
}

process.on("unhandledRejection", (err) => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));


/**
 * Examples of returns
 *
 * Predict custom trained model response
Deployed model id : 3551950323297812480
Predictions :
- Prediction : {"labels":["negative","neutral","positive"],"sequence":"You aren't kind, i hate you.","scores":[0.9942014217376709,0.0030435377266258,0.002755066612735391]}
 */
