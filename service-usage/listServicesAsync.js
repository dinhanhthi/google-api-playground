/*
- Source: https://github.com/googleapis/nodejs-service-usage/blob/main/samples/quickstart.js
- SDK: https://cloud.google.com/nodejs/docs/reference/service-usage/latest/service-usage/v1.serviceusageclient
What is "options" inside ServiceUsageClient? Read this:
  https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#creating-the-client-instance

HOW TO USE?
- Read REAMDE.md
- Run:
    node -r dotenv/config service-usage/listServicesAsync.js
*/

// 'use strict';

import { private_key, client_email, parent } from "../credentials.js";
import { ServiceUsageClient } from "@google-cloud/service-usage";

async function main(
  // parent = "folders/fleet-gamma-338300", // Project to list service usage for.
  // filter = "state:ENABLED" // Service to filter on.
) {
  // const parent = 'projects/my-project', // Project to list service usage for.
  // filter = 'state:ENABLED' // Filter when listing services.

  // Creates a client
  const client = new ServiceUsageClient({
    credentials: { private_key, client_email },
  });

  // Ref of request:
  // https://cloud.google.com/nodejs/docs/reference/service-usage/latest/service-usage/protos.google.api.serviceusage.v1.ilistservicesrequest
  const request = {
    parent,
    filter: "state:ENABLED",
  };

  async function listServices() {
    for await (const service of client.listServicesAsync(request)) {
      console.info(service.name);
    }
  }
  listServices();
  // [END serviceusage_quickstart]
}

// main(...process.argv.slice(2)).catch((err) => {
main().catch((err) => {
  console.error(err.message);
  process.exitCode = 1;
});
process.on("unhandledRejection", (err) => {
  console.error(err.message);
  process.exitCode = 1;
});
