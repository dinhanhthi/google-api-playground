/*
- Modified from: https://cloud.google.com/nodejs/docs/reference/service-usage/latest/service-usage/v1.serviceusageclient#_google_cloud_service_usage_v1_ServiceUsageClient_enableService_member_1_
- Ref: the same as above

Enable multiple services on a project? Use `batchEnableServices`
(https://cloud.google.com/nodejs/docs/reference/service-usage/latest/service-usage/v1.serviceusageclient#_google_cloud_service_usage_v1_ServiceUsageClient_batchEnableServices_member_1_)

NOTE THAT, this file is used for enabling only DIALOGFLOW service!

----
NOTE FROM GOOGLE
*  The `EnableService` and `DisableService` methods currently only support
*  projects.
*  Enabling a service requires that the service is public or is shared with
*  the user enabling the service.
----

HOW TO USE?
- Read REAMDE.md
- Run:
    node -r dotenv/config service-usage/enableService.js projectId
*/

import { credentials } from "../credentials.js";
import { ServiceUsageClient } from "@google-cloud/service-usage";

async function main(projectId) {
  const name = `projects/${projectId}/services/dialogflow.googleapis.com`;
  const serviceusageClient = new ServiceUsageClient({ credentials });

  async function callEnableService() {
    // https://cloud.google.com/nodejs/docs/reference/service-usage/latest/service-usage/protos.google.api.serviceusage.v1.ienableservicerequest
    const request = { name };

    const [operation] = await serviceusageClient.enableService(request);
    const [response] = await operation.promise();
    console.log(response);
  }

  callEnableService();
}

main(...process.argv.slice(2)).catch((err) => {
  console.error(err.message);
  process.exitCode = 1;
});
process.on("unhandledRejection", (err) => {
  console.error(err.message);
  process.exitCode = 1;
});
