import { ormConnection } from "./startup/db";
import { getApp } from "./startup/server";

const DEFAULT_TIMEOUT = 5 * 60 * 1000; // minutes

export function start() {
  console.log(
    `Starting server in mode: ${process.env.NODE_ENV || "development"}`
  );

  const app = getApp();

  const { PORT, NODE_ENV, SERVER_TIMEOUT = DEFAULT_TIMEOUT } = process.env;

  const SERVER_PORT = PORT || 7500;

  const server = app.listen(SERVER_PORT, async () => {
    if (NODE_ENV !== "test") {
      const dbConn = await ormConnection();
      if (dbConn) {
        console.log(
          `Server listening on PORT ${SERVER_PORT}, visit http://localhost:${SERVER_PORT}`
        );
      }
    }
  });

  server.setTimeout(parseInt(SERVER_TIMEOUT as string));

  return server;
}
