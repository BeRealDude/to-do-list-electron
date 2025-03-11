import { DataTypes, Model } from "sequelize";
import sequelize from "../db/db";

class Note extends Model {
  declare id: number;
  declare title: string;
  declare content: string;
}

Note.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
  },
  { sequelize, modelName: "note" }
);

export default Note;