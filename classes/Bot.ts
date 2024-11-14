import { Client, GatewayIntentBits } from "discord.js";
import { Configuration } from "../types/Configuration";
import { ConnectionError } from "../errors/ConnectionError";
import "colors";

export class Bot extends Client {
  config: Configuration;

  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });

    this.config = require(`${process.cwd()}/config.json`);
  }

  async start() {
    this.login(this.config.token)
      .then(() => {
        console.log(`Logged as ${this.user?.tag}`.green);
      })
      .catch((err) => {
        throw new ConnectionError(err);
      });
  }
}
