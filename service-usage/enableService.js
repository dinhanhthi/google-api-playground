/*
- Source: https://cloud.google.com/nodejs/docs/reference/service-usage/latest/service-usage/v1.serviceusageclient#_google_cloud_service_usage_v1_ServiceUsageClient_enableService_member_1_
- Ref: the same as above


HOW TO USE?
- Read REAMDE.md
- Run:
    node -r dotenv/config service-usage/enableService.js
*/

import { private_key, client_email, parent } from "../credentials.js";
import { ServiceUsageClient } from "@google-cloud/service-usage";

// Imports the Serviceusage library
const { ServiceUsageClient } = require("@google-cloud/service-usage").v1;

// Instantiates a client
const serviceusageClient = new ServiceUsageClient();

async function callEnableService() {
  // Construct request
  const request = {};

  // Run request
  const [operation] = await serviceusageClient.enableService(request);
  const [response] = await operation.promise();
  console.log(response);
}

callEnableService();
