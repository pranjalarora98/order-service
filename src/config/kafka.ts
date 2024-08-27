import { Consumer,EachMessagePayload,Kafka } from "kafkajs";
import kafkaInterface from "./kafkaInterface";
import { handleProductUpdate } from "../productCache/productUpdateHandler";
import { handleToppingUpdate } from "../toppingCache/toppingUpdateHandler";

export class KafkaConsumer implements kafkaInterface {
  
    private consumer:Consumer;

    constructor(clientId:string,brokers:string[]) {
     const kafka = new Kafka({clientId,brokers});
     this.consumer = kafka.consumer({groupId:clientId});
    }

    async connectConsumer() {
      await this.consumer.connect()
    }

    async disconnectConsumer() {
        await this.consumer.disconnect()
    }
    
    async consumeMessage(topics: string[],fromBeginning:boolean=false) {
      
       await this.consumer.subscribe({topics,fromBeginning});

        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
              switch(topic){
                case "product":
                    await handleProductUpdate(message.value.toString());
                    break;
                case "topping":
                    await handleToppingUpdate(message.value.toString());   
                    break;  
              }
              console.log(partition);

            },
          })
    }

}