/*
- Source: https://github.com/googleapis/nodejs-service-usage/blob/main/samples/quickstart.js
- SDK: https://cloud.google.com/nodejs/docs/reference/service-usage/latest/service-usage/v1.serviceusageclient
What is "options" inside ServiceUsageClient? Read this:
  https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#creating-the-client-instance


Services enabled by default: https://cloud.google.com/service-usage/docs/enabled-service#default

HOW TO USE?
- Read REAMDE.md
- Run:
    node -r dotenv/config service-usage/listServicesAsync.js parent

"parent" can be:
  - "projects/<project-id>"
  - "folders/<folder-id>"
  - "organizations/<organization-id>"
*/


import { credentials, parent } from "../credentials.js";
import { ServiceUsageClient } from "@google-cloud/service-usage";

async function main(prnt=parent) {
  const client = new ServiceUsageClient({ credentials });

  // Ref of request:
  // https://cloud.google.com/nodejs/docs/reference/service-usage/latest/service-usage/protos.google.api.serviceusage.v1.ilistservicesrequest
  const request = {
    parent: prnt,
    filter: "state:ENABLED",
  };

  async function listServices() {
    for await (const service of client.listServicesAsync(request)) {
      console.info(service.name);
    }
  }
  listServices();
}

main(...process.argv.slice(2)).catch((err) => {
  console.error(err.message);
  process.exitCode = 1;
});
process.on("unhandledRejection", (err) => {
  console.error(err.message);
  process.exitCode = 1;
});
