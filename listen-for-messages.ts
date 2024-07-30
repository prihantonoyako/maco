import { RabbitMQService } from './src/rabbitmq/rabbitmq.service';

(async () => {
  const rabbitMQService = new RabbitMQService();
  await rabbitMQService.onModuleInit();

  await rabbitMQService.consumeQueue((msg) => {
    if (msg) {
      console.log('Received message:', msg.content.toString());
    }
  });
})();
