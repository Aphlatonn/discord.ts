import Aphlaton from "./classes/Aphlaton.js";
import * as dotenv from "dotenv";

dotenv.config();

const client = new Aphlaton();
client.start(process.env.CLIENT_TOKEN);
