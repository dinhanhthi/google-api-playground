/**
 * For the server side: using firebase-admin package
 * (https://firebase.google.com/docs/database/admin/start)
 * For the Node.js SDK as a client for end-user access -> use firebase package
 * (https://firebase.google.com/docs/database/web/start)
 *
 * Reference: https://firebase.google.com/docs/reference/node/firebase.database.Reference#update
 *
 * How to use?
 * - Read REAMDE.md
 * - Run:
 *   node -r dotenv/config firebase/realtimeDatabaseAdmin.js
 */

import admin from "firebase-admin";

// It works
admin.initializeApp({
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

// It's not working ????
// const serviceAccount = {
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//   privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"), // Escaping for Heroku
// };
// admin.initializeApp(
//   {
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: process.env.FIREBASE_DATABASE_URL,
//   },
//   "platoon"
// );

async function main() {
  // As an admin, the app has access to read and write all data, regardless of Security Rules
  const db = admin.database();
  // var ref = db.ref("restricted_access/secret_document");
  const firebaseDb = db.ref();
  // ref.once("value", function (snapshot) {
  //   console.log(snapshot.val());
  // });
  const botId = "-N2VoV5ZaONwP651nSb_";
  const service = "dialogflow";
  const type = "entities";

  const entitiesToUpdate = {
    idetaOne: { serviceId: "abc" },
    idetaTwo: { serviceId: "xyz" },
    idetaThree: { serviceId: "123" },
  };

  const otherEntitiesToUpdate = {
    idetaFour: { serviceId: "xxx" },
    idetaFive: { serviceId: "yyy" },
    idetaSix: { serviceId: "zzz" },
  };

  const path = `lexicons/${botId}/serviceIds/${service}/${type}`;
  // await firebaseDb.child(path).update(entitiesToUpdate);
  await firebaseDb.child(path).update(otherEntitiesToUpdate);
  console.log("🥳 Done!");
  process.exit(0);
}

main();
