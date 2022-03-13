import { createConnection } from "typeorm";

export const ormConnection = async () => {
  try {
    const conn = await createConnection();
    console.log("Connection has been established successfully.");
    return conn;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
};
