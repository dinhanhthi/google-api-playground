/*
- Ref: https://cloud.google.com/nodejs/docs/reference/service-usage/latest/service-usage/v1.serviceusageclient#_google_cloud_service_usage_v1_ServiceUsageClient_checkEnableServiceProgress_member_1_

HOW TO USE?
- Read REAMDE.md
- Run:
    node -r dotenv/config service-usage/checkEnableServiceProgress.js operationId
*/

import { credentials } from "../credentials.js";
import { ServiceUsageClient } from "@google-cloud/service-usage";

async function main(operationId) {
  const serviceusageClient = new ServiceUsageClient({ credentials });

  async function check() {
    const decodedOperation = await serviceusageClient.checkEnableServiceProgress(`operations/${operationId}`);

    console.log("decodedOperation.result: ", decodedOperation.result);
    console.log("decodedOperation.name: ", decodedOperation.name);
    console.log("decodedOperation.done", decodedOperation.done); // true or false
    console.log("decodedOperation.metadata: ", decodedOperation.metadata);
  }

  await check();
}

main(...process.argv.slice(2)).catch((err) => {
  console.error(err.message);
  process.exitCode = 1;
});
process.on("unhandledRejection", (err) => {
  console.error(err.message);
  process.exitCode = 1;
});

/*
Returned exmaple:

operations/acat.p2-1023630190150-2a980e57-5f96-488e-a26a-d729968bbbbe
operation.name:  operations/acat.p2-1023630190150-2a980e57-5f96-488e-a26a-d729968bbbbe
operation.done true
operation.metadata:  OperationMetadata { resourceNames: [] }
*/