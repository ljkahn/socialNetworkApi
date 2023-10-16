const express = require('express');
const db = require('./config/connection');
// Require model


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());