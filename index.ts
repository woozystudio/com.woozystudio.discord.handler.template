import { Bot } from "./classes/Bot";
import { ConnectionError } from "./errors/ConnectionError";

async function start() {
  console.log(`Starting the client...`);
  await new Bot().start();
}

start().catch(async (error) => {
  try {
    throw new ConnectionError(error);
  } catch (e) {
    console.error("Failed to send fatal error to monitoring", e);
  }
  console.error(error);
  process.exit(1);
});
