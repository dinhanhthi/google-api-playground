/*
Modified from: https://github.com/googleapis/nodejs-resource-manager/blob/main/samples/generated/v3/projects.create_project.js
SDK: https://cloud.google.com/nodejs/docs/reference/resource-manager/latest/resource-manager/v3.projectsclient#_google_cloud_resource_manager_v3_ProjectsClient_createProject_member_1_
What is "options" inside ProjectsClient? Read this:
  https://googleapis.dev/nodejs/resource/latest/v3.ProjectsClient.html
  https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#creating-the-client-instance

HOW TO USE?
- Read REAMDE.md
- Run:
    node -r dotenv/config resource-manager/createProject.js id-of-project "Display Name"
*/

import { credentials, parent as defaultParent } from "../credentials.js";
import { ProjectsClient } from "@google-cloud/resource-manager";

async function main(projectId, displayName = "New Project", parent=defaultParent) {
  const resourcemanagerClient = new ProjectsClient({ credentials });

  // https://cloud.google.com/nodejs/docs/reference/resource-manager/latest/resource-manager/protos.google.cloud.resourcemanager.v3.iproject
  // or: https://googleapis.dev/nodejs/resource/latest/google.cloud.resourcemanager.v3.Project.html
  const project = { parent, projectId, displayName };

  async function callCreateProject() {
    // https://cloud.google.com/nodejs/docs/reference/resource-manager/latest/resource-manager/protos.google.cloud.resourcemanager.v3.createprojectrequest
    const request = { project };
    const [operation] = await resourcemanagerClient.createProject(request);
    console.log("operation.name: ", operation.name); // unique name
    console.log("operation.done", operation.done); // true or false

    const [response] = await operation.promise();
    console.log("response: ");
    console.log(response);
    console.log("operation.done: ", operation.done)

    // const check = await resourcemanagerClient.checkCreateProjectProgress(
    //   operation.name
    // );
    // console.log("check: ", check);

    // operation.promise().then(res => {
    //   console.log("res: ", res);
    // }).catch(err => {
    //   console.log("err: ", err);
    // }).finally(console.log("finally"));

    // resourcemanagerClient
    //   .checkCreateProjectProgress(operation.name)
    //   .then((check) => {
    //     console.log("check: ", check);
    //   })
    //   .catch((err) => {
    //     console.log("err: ", err);
    //   })
    //   .finally(console.log("finally"));
  }

  callCreateProject();
  // .catch((err) => console.log(err))
  // .then(async () => {
  //   // Check
  //   // https://cloud.google.com/nodejs/docs/reference/resource-manager/latest/resource-manager/v3.projectsclient#_google_cloud_resource_manager_v3_ProjectsClient_checkCreateProjectProgress_member_1_
  //   // https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#long-running-operations
  //   const check = await checkCreateProjectProgress(operation.name);
  //   console.log("check: ", check);
  // });

  // async function checkOperation(operationName) {
  //   const check = await checkCreateProjectProgress(operationName);
  //   console.log("check: ", check);
  // }

  // async function run() {
  //   try {
  //     await callCreateProject();
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     await checkOperation(operation.name);
  //   }
  // }

  // run();
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

==========
operation output:

------------
operations/cp.6690787122843194301
------------
false
------------
null
------------
null
Error!


========== ERRORS ==========
🐞 err: {
  "code": 13,
  "details": "Received RST_STREAM with code 0",
  "metadata": {}
}
Error: 13 INTERNAL: Received RST_STREAM with code 0
    at Object.callErrorFromStatus (/Users/thi/git/OTHERS/google-api-playground/node_modules/@grpc/grpc-js/build/src/call.js:31:26)
    at Object.onReceiveStatus (/Users/thi/git/OTHERS/google-api-playground/node_modules/@grpc/grpc-js/build/src/client.js:180:52)
    at Object.onReceiveStatus (/Users/thi/git/OTHERS/google-api-playground/node_modules/@grpc/grpc-js/build/src/client-interceptors.js:336:141)
    at Object.onReceiveStatus (/Users/thi/git/OTHERS/google-api-playground/node_modules/@grpc/grpc-js/build/src/client-interceptors.js:299:181)
    at /Users/thi/git/OTHERS/google-api-playground/node_modules/@grpc/grpc-js/build/src/call-stream.js:160:78
    at processTicksAndRejections (node:internal/process/task_queues:76:11) {
  code: 13,
  details: 'Received RST_STREAM with code 0',
  metadata: Metadata { internalRepr: Map(0) {}, options: {} }
}
13 INTERNAL: Received RST_STREAM with code 0
👆 May help: https://github.com/grpc/grpc-node/issues/1532
*/
