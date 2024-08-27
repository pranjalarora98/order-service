import app from "./src/app";
import config from "config";
import logger from "./src/config/logger";
import connectDB from "./src/config/db";
import { KafkaProducerBroker } from "./src/common/factories/KafkaFactory";

const startServer = async () => {
  const PORT = config.get("server.port") || 5503;
  const broker =  KafkaProducerBroker();

  try {
    await connectDB();
    await broker.connect(); 
    await broker.consumeMessage(['products']);
    app
      .listen(PORT, () => console.log(`Listening on port ${PORT}`))
      .on("error", (err) => {
        console.log("err", err.message);
        process.exit(1);
      });
  } catch (err) {
    logger.error("Error happened: ", err.message);
    process.exit(1);
  }
};

void startServer();
