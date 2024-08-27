interface kafkaInterface {
    connectConsumer:()=>Promise<void>;
    disconnectConsumer:()=>Promise<void>;
    consumeMessage:(topic,message)=>Promise<void>;
}

export default kafkaInterface;