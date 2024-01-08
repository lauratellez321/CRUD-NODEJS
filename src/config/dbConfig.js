const { Pool } = require("pg");
const pool = new Pool({
  user: "andreyherrera",
  host: "localhost",
  database: "crud_node",
  password: "",
  port: 5432,
});
module.exports = pool;
