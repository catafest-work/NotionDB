// console.log(" Hello ! ");
const express = require('express');
const { client, Client } = require('@notionhq/client');
const cors = require('cors');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

const app = express();

app.use(cors());

const PORT = 4000;
const HOST = "localhost";

const notion = new Client({auth:"secret_50OcY92eQLF8v6sRRISTSMFLz6lWPjQy27AzvaJboUN"})

const databaseId = "3a7a77aa971a48e88e1153d44086a96a";

// POST request 
// POST name, phoneNumber, extrainfo 
// Functionality: Make a database entry in a Notion page with the database above
// localhost:4000/submitFromNotion

app.post('/submitFormToNotion', jsonParser, async (req, res) => {
  // req.body 
  // from frontend define
  // {
  //   name:  "",
  //   phoneNumber: "",
  //   extrainfo: "",
  // }
  const name = req.body.name;
  const phoneNumber = req.body.phoneNumber;
  const extraInfo = req.body.extraInfo;
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId},
      properties: {
        Name: {
          title: [
            {
              text: {
                content: name
              }
            }
          ]
        }, 
        "Phone Number": {
          rich_text: [
            {
              text: {
                content: phoneNumber
              }
            }
          ]
        }, 
        "Extra Information": {
          rich_text: [
            {
              text: {
                content: extraInfo
              }
            }
          ]
        }
      }
    })
    console.log(response)
    console.log("SUCCESS!")
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, HOST, () => {
  console.log("Starting proxy at " + HOST + ":" + PORT);
});