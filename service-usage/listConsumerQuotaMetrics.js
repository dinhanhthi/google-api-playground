/*
- Modified from: https://cloud.google.com/nodejs/docs/reference/service-usage/latest/service-usage/v1beta1.serviceusageclient#_google_cloud_service_usage_v1beta1_ServiceUsageClient_listConsumerQuotaMetrics_member_1_
- Ref: the same as above

HOW TO USE?
- Read REAMDE.md
- Run:
    node -r dotenv/config service-usage/listConsumerQuotaMetrics.js

- Services:
    - dialogflow.googleapis.com
    - cloudresourcemanager.googleapis.com
*/

import { credentials, folder_id, organization_id } from "../credentials.js";
import { v1beta1 } from "@google-cloud/service-usage";

async function main() {
  const serviceusageClient = new v1beta1.ServiceUsageClient({ credentials });

  async function callGetConsumerQuotaLimit() {
    const request = {
      // parent: `folders/${folder_id}/services/cloudresourcemanager.googleapis.com`,
      parent: `organizations/${organization_id}/services/cloudresourcemanager.googleapis.com`,
    };
    const response = await serviceusageClient.listConsumerQuotaMetrics(request);
    console.log(response);
  }

  callGetConsumerQuotaLimit();
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
Return:

[ [], null, null ] 👈 ?????
*/