/*
Modified from: https://github.com/googleapis/nodejs-resource-manager/blob/main/samples/generated/v3/projects.create_project.js
SDK: https://cloud.google.com/nodejs/docs/reference/resource-manager/latest/resource-manager/v3.projectsclient#_google_cloud_resource_manager_v3_ProjectsClient_createProject_member_1_
What is "options" inside ProjectsClient? Read this:
  https://googleapis.dev/nodejs/resource/latest/v3.ProjectsClient.html
  https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#creating-the-client-instance

HOW TO USE?
- Read REAMDE.md
- Run:
    node -r dotenv/config resource-manager-api/createProject.js id-of-project "Display Name"
*/

// "use strict";

import { private_key, client_email, parent } from "../credentials.js"
import { ProjectsClient } from "@google-cloud/resource-manager";

function main(projectId, displayName) {
  const resourcemanagerClient = new ProjectsClient({
    credentials: { private_key, client_email },
  });

  const project = {
    projectId: projectId,
    displayName: displayName ? displayName : "New Project",
    parent: parent,
  };

  async function callCreateProject() {
    const request = {
      project,
    };

    const [operation] = await resourcemanagerClient.createProject(request);
    const [response] = await operation.promise();
    console.log(response);
  }

  callCreateProject();
}

process.on("unhandledRejection", (err) => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
// Wanna understand "slice" above? https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/
