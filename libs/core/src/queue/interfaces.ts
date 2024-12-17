export interface QueueConnection {
    driver: any; // The driver for the queue (e.g., RabbitMQ, Redis, etc.)
    options: any; // Configuration options specific to the queue
  }
  
  // Main QueueOptions interface to manage multiple connections
  export interface QueueOptions {
    default: string;
    connections: Record<string, QueueConnection>;
  }
  
  // Interface for the QueueDriver (generic interface for any queue driver)
  export interface QueueDriver {
    send(pattern: string, data: any): Promise<void>; 
  }
  