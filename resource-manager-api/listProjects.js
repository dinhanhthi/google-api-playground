/*
Modified from: https://github.com/googleapis/nodejs-resource-manager/blob/main/samples/listProjects.js
SDK: https://cloud.google.com/nodejs/docs/reference/resource-manager/latest/resource-manager/v3.projectsclient#_google_cloud_resource_manager_v3_ProjectsClient_listProjectsAsync_member_1_
What is "options" inside ProjectsClient? Read this:
  https://googleapis.dev/nodejs/resource/latest/v3.ProjectsClient.html
  https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#creating-the-client-instance


HOW TO USE?
- Read REAMDE.md
- Run:
    node -r dotenv/config resource-manager-api/listProjects.js
*/

// "use strict";

import { credentials, parent } from "../credentials.js";
import { ProjectsClient } from "@google-cloud/resource-manager";

async function main() {
  const client = new ProjectsClient({
    credentials: credentials,
  });

  const request = {
    parent: parent,
  };

  async function listProjects() {
    const projects = client.listProjectsAsync(request);
    console.log("Projects:");
    for await (const project of projects) {
      console.info(project);
    }
  }
  listProjects();
}

main().catch(console.error);
process.on("unhandledRejection", (err) => {
  console.error(err.message);
  process.exitCode = 1;
});
