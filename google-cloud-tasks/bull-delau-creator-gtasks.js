// Run
// node -r dotenv/config google-cloud-tasks/bull-delau-creator-gtasks.js

import express from "express";
// const express = require("express");
// Imports the Google Cloud Tasks library.
import { CloudTasksClient } from "@google-cloud/tasks";
const PORT = Number(parseInt(process.env.PORT)) || 8080;

const app = express();

// Instantiates a client.
const client = new CloudTasksClient();

app.use(express.json());

function computeDelayInSeconds(delay) {
  const { days, hours, minutes, seconds } = delay;
  let inSeconds = 0;
  if (days) inSeconds += days * 24 * 3600;
  if (hours) inSeconds += hours * 3600;
  if (minutes) inSeconds += minutes * 60;
  if (seconds) inSeconds += seconds;
  return inSeconds;
}

async function createHttpTask(webhookUrl, body, delay, date) {
  const inSeconds = computeDelayInSeconds(delay);
  const project = "trhs-sandbox1";
  const queue = "tanuqueue";
  const location = "europe-west2";

  const url = webhookUrl;
  let payload;
  try {
    payload = JSON.stringify(body);
  } catch (err) {
    payload = err;
  }

  // Construct the fully qualified queue name.
  const parent = client.queuePath(project, location, queue);

  const task = {};
  task.httpRequest = {
    httpMethod: "POST",
    // httpMethod: "GET",
    url,
  };

  if (payload) {
    task.httpRequest.body = Buffer.from(payload).toString("base64");
    task.httpRequest.headers = {
      "Content-Type": "application/json",
      // "Authorization": process.env.USER_TOKEN,
    };
  }

  if (inSeconds) {
    console.log(`Scheduling task for ${inSeconds} seconds from now.`);
    task.scheduleTime = {
      seconds: inSeconds + Date.now() / 1000,
    };
  }

  const request = { parent: parent, task: task };
  const [response] = await client.createTask(request);
  return response;
}

app.get("/", (req, res) => {
  let obj = {
    success: true,
  };
  obj.subdomain = req.subdomains;
  res.send(obj);
});

app.post("/boomerang", async (req, res) => {
  console.log("req : ", req.body);
  const { webhookUrl, payload, delay, date } = req.body;
  // console.log("payload : ", payload);
  const { authorization } = req.headers;
  if (authorization === `Bearer ${process.env.GTASKS_TOKEN}`) {
    try {
      const resp = await createHttpTask(webhookUrl, payload, delay, date);
      console.log("working : ", resp);
      res.send({ success: true });
    } catch (error) {
      console.log("error : ", error);
      res.send({
        success: false,
        error,
      });
    }
  } else {
    console.log("error : ", "Auth unsuccessful");
    res.send({
      success: false,
      error: "Auth unsuccessful",
    });
  }
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
