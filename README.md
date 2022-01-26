# google-dialogflow-api-playground

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