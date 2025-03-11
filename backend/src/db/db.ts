import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "../dbnotes.sqlite", // Настроить правильную директорию
  logging: false, // Отключить логи SQL-запросов
});

export default sequelize;