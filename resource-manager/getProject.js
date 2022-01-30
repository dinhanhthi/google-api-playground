// Read the comment section of other files
/*
  https://cloud.google.com/nodejs/docs/reference/resource-manager/latest/resource-manager/protos.google.cloud.resourcemanager.v3.getprojectrequest
  Other: https://googleapis.dev/nodejs/resource/latest/v3.ProjectsClient.html#getProject
*/
// node -r dotenv/config resource-manager/getProject.js projectId

import { credentials } from "../credentials.js";
import { ProjectsClient } from "@google-cloud/resource-manager";

async function main(projectId) {
  const client = new ProjectsClient({ credentials });

  async function get() {
    const request = {
      // eg: projects/415104041262
      name: `projects/${projectId}` || "",
    };
    const [response] = await client.getProject(request);
    console.log(response);
  }

  await get();
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

{
  labels: {},
  name: 'projects/945668609857',
  parent: 'folders/951960025600',
  projectId: 'test-quota-339616',
  state: 'ACTIVE',
  displayName: 'Test Quota',
  createTime: { seconds: '1643387617', nanos: 98000000 },
  updateTime: { seconds: '1643387619', nanos: 0 },
  deleteTime: null,
  etag: 'x7EY0MaCsEMAFcriduWySA=='
}

If there is no project / doesn't have the permission
7 PERMISSION_DENIED: Permission 'resourcemanager.projects.get' denied on resource '//cloudresourcemanager.googleapis.com/projects/test-quota-339617' (or it may not exist).
*/
