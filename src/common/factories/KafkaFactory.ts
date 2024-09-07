import {KafkaConsumer} from '../../config/kafka';
import { Kafka,Consumer } from 'kafkajs';

let kafkaProducer;

export const KafkaProducerBroker = () => {
  if(!kafkaProducer){
    kafkaProducer = new KafkaConsumer('orders-service',['localhost:9092']);
  }
  return kafkaProducer;
}

