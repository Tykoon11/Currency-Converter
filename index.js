const PORT = 3001;
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());

app.listen(PORT, () => console.log(`server is running on ${PORT}`));

app.get("/convert", (req, res) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  axios
    .get(BASE_URL)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
});
