# Google API Playground

My playground for Google's APIs.

⭐ [My note](https://dinhanhthi.com/google-dialogflow-api).

## Docs

- [REST API](https://cloud.google.com/dialogflow/es/docs/reference/rest)
- [RPC API](https://cloud.google.com/dialogflow/es/docs/reference/rpc)
- [Node.JS Dialogflow Client SDK](https://googleapis.dev/nodejs/dialogflow/latest/index.html)
- [NodeJS Client Reference](https://cloud.google.com/nodejs/docs/reference) (beautiful version)
- `ClientOptions` inside `SampleClient()` is [described here](https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#creating-the-client-instance).

## How to use?

1. `npm i` firstly
2. Create a `.env` file containing all needed credentials.
3. Create a service account > Download JSON file -- Follow [these steps](https://cloud.google.com/storage/docs/reference/libraries#setting_up_authentication).
4. (Optional) Create a folder (so that we work only on this folder instead of the whole organization)
5. (Optional) Add a custom role on GCP Console (for organization) -- [Understand roles](https://cloud.google.com/iam/docs/understanding-roles#resource-manager-roles).
6. Set the corresponding role to the created service account ([go to console](https://console.cloud.google.com/iam-admin/iam))
7. In `.env`, set the following variables: `CLIENT_EMAIL`, `PRIVATE_KEY`, `ORGANIZATION_ID`, `FOLDER_ID`, ...
8. (optional) Comment/Uncomment lines in file `credentials.js` for a right credential.
9. Normally, we should run `node -r dotenv/config folder/file.js <paramerters>`
10. Depend on the files, you should modify the parameters inside these files.

### Create a service account

This section is the basic steps for you to create a service accoutn (with neccessary roles) to play with SDK's APIs which requires the access of organization / folders.

1. You have to have a domain and full access to DNS.
2. Try 1 month free [Google Workspace](https://workspace.google.com/) (from this, you will have an organization in [GCP](https://console.cloud.google.com/)). **TIP**: After 1 month, you deactivate the subsription but the things on GCP witll work!
3. (You may need to activate again the subscription on GCP with a free 300$). Don't worry, just a test, you lose nothing from this amount.
4. Go to [IAM](https://console.cloud.google.com/iam-admin/iam), choose your organization > ADD > paste the admin email of your organization + set roles for it (*Organization Administrator*, *Owner*, *Folder Creator*). Without this step, you cannot create any folder/project.
5. Go to [Cloud Resource Manager](https://console.cloud.google.com/cloud-resource-manager) > Create a new folder inside your organization.
6. Go to [APIs & Services / Credentials](https://console.cloud.google.com/projectselector2/apis/credentials) > Choose a project > Create Credentials > Service Account > Filling the information > Create and continue > Done. **Don't forget to copy the email of this service account** > Click on the link of that SA > Keys > Add key > Create a new key > JSON > Download a JSON file to your computer.
7. Go to IAM again, this time, choose the fodler / organization you want above service account have the right to manage things > Add > Paste the email of the SA you created above > Set roles to it like *Owner, Organization Administrator, Dialogflow API Admin, Project Creator, Project Deleter, Service Usage Admin* (you can check the [list of all roles here](https://cloud.google.com/iam/docs/understanding-roles?_ga=2.200836974.-1507687642.1642666540#predefined_roles)). You can even create your own custom roles.
8. Now, your SA has the full access you want.
9. On your computer, create a file `.env` withe the keys like in `env.example.txt`.
10. You're good!