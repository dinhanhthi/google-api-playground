/*
SDK: https://cloud.google.com/nodejs/docs/reference/resource-manager/latest/resource-manager/v3.projectsclient#_google_cloud_resource_manager_v3_ProjectsClient_checkCreateProjectProgress_member_1_
Another: https://googleapis.dev/nodejs/resource/latest/v3.ProjectsClient.html#checkCreateProjectProgress

HOW TO USE?
- Read REAMDE.md
- Run:
    node -r dotenv/config resource-manager/checkCreateProjectProgress.js operationId

    example of operation-id: "cp.8192811214189484896"
    // Things to test (for me only):
    node -r dotenv/config resource-manager/checkCreateProjectProgress.js cp.8776114049695473904
*/

import { credentials } from "../credentials.js";
import { ProjectsClient } from "@google-cloud/resource-manager";

async function main(operationId) {
  const resourcemanagerClient = new ProjectsClient({ credentials });

  async function check() {
    const decodedOperation = await resourcemanagerClient.checkCreateProjectProgress(
      `operations/${operationId}`
    );
    console.log("decodedOperation.result: ", decodedOperation.result);
    console.log("decodedOperation.name: ", decodedOperation.name);
    console.log("decodedOperation.done", decodedOperation.done); // true or false
    console.log("decodedOperation.metadata: ", decodedOperation.metadata);
  }

  await check();
}

main(...process.argv.slice(2)).catch((err) => {
  console.error(err.message);
  // process.exitCode = 1;
});
process.on("unhandledRejection", (err) => {
  console.error(err.message);
  // process.exitCode = 1;
});
// Wanna understand "slice" above? https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/

/*
Returned exmaple:
*/
