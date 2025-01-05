const { db } = require("../db/readingsdb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

class User {
  constructor(userId) {
    this.userId = userId;
  }


}

module.exports = User;
