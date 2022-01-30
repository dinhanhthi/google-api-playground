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
    node -r dotenv/config service-usage/enableService.js projectId service

- Services:
    - dialogflow.googleapis.com
    - cloudresourcemanager.googleapis.com
*/

import { credentials } from "../credentials.js";
import { ServiceUsageClient } from "@google-cloud/service-usage";

async function main(projectId, service='dialogflow.googleapis.com') {
  const name = `projects/${projectId}/services/${service}`;
  const serviceusageClient = new ServiceUsageClient({ credentials });

  async function callEnableService() {
    // https://cloud.google.com/nodejs/docs/reference/service-usage/latest/service-usage/protos.google.api.serviceusage.v1.ienableservicerequest
    const request = { name };

    const [operation] = await serviceusageClient.enableService(request);

    console.log("------------")
    console.log(operation.name); // unique name
    console.log("------------")
    console.log(operation.done); // true or false
    console.log("------------")
    console.log(operation.metadata); // current value of the metadata (often contains progress %)
    console.log("------------")
    console.log(operation.result); // only if operation is completed

    const [response] = await operation.promise();
    console.log("response: ");
    console.log(response);
    console.log("operation.done: ", operation.done)
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

/*
Return:

EnableServiceResponse {
  service: Service {
    name: 'projects/820337555778/services/dialogflow.googleapis.com',
    config: ServiceConfig {
      apis: [],
      endpoints: [],
      monitoredResources: [],
      name: 'dialogflow.googleapis.com',
      title: 'Dialogflow API',
      documentation: [Documentation],
      quota: [Quota],
      authentication: [Authentication],
      usage: [Usage],
      monitoring: [Monitoring]
    },
    state: 2,
    parent: 'projects/820337555778'
  }
}
*/