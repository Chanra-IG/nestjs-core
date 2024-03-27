# Winston Logger

### 1. Quick Start

Import Winston logger module from `@lib/winston-logger` into the root AppModule `app.module.ts`. 
Afterward, the winston instance will be available to inject across entire project (and in your feature modules, being WinstonModule a global one)

**Replacing the Nest logger:**

This module also provides the WinstonLogger class (custom implementation of the LoggerService interface) to be used by Nest for system logging. This will ensure consistent behavior and formatting across both Nest system logging and your application event/message logging.

```typescript
  // main.ts

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
```

### 2. Usage

```typescript
  constructor(
    private readonly logger: Logger
  ) {}

  this.logger.log('Calling getHello()', AppController.name);
  this.logger.debug('Calling getHello()', AppController.name);
  this.logger.verbose('Calling getHello()', AppController.name);
  this.logger.warn('Calling getHello()', AppController.name);

  try {
    throw new Error()
  } catch (e) {
    this.logger.error('Calling getHello()', e.stack, AppController.name);
  }
```

### 3. Log Level

Winston supports six `log levels` by default. It follows the order specified by the `RFC5424`  document. Each level is given an integer priority with the most severe being the lowest number and the least one being the highest.

```json
{
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
}
```

The six log levels above each correspond to a method on the logger:

```typescript
  logger.error('error');
  logger.warn('warn');
  logger.info('info');
  logger.verbose('verbose');
  logger.debug('debug');
  logger.silly('silly');
```

### 4. Formatting log message

Winston outputs its logs in JSON format by default, but it also supports other formats which are accessible on the `winston.format` object.

```typescript
  format: format.combine(format.timestamp(), format.splat(), format.json()),
```

The formats available in winston.format are defined in the [logform module](https://github.com/winstonjs/logform). This module provides the ability to customize the format used by Winston to your heart's content. You can create a completely custom format or modify an existing one to add new properties.

### 5. Log rotation

The main purpose of log rotation is to restrict the size of your log files and create new ones based on some predefined criteria. For example, you can create a new log file every day and automatically delete those older than a time period (say 30 days).

```bash
  $ npm install winston-daily-rotate-file
```

### 6. Configuring transports

Transports in Winston refer to the storage location for your log entries. Winston provides great flexibility in choosing where you want your log entries to be outputted to. The following transport options are available in Winston by default:

  - [Console](https://github.com/winstonjs/winston/blob/master/docs/transports.md#console-transport) : output logs to the Node.js console.
  - [File](https://github.com/winstonjs/winston/blob/master/docs/transports.md#file-transport) : store log messages to one or more files.
  - [HTTP](https://github.com/winstonjs/winston/blob/master/docs/transports.md#http-transport) : stream logs to an HTTP endpoint.
  - [Stream](https://github.com/winstonjs/winston/blob/master/docs/transports.md#stream-transport) : output logs to any Node.js stream.

```typescript
  transports: [
    new transports.DailyRotateFile({
      filename: `logs/%DATE%-error.log`,
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false,
      maxFiles: '30d',
      maxSize: '20m'
    }),
    new transports.DailyRotateFile({
      filename: `logs/%DATE%-combined.log`,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false,
      maxFiles: '30d',
      maxSize: '20m'
    })
  ]
```

In a production application, it may not be ideal to log every single message into a single file as that will make filtering critical issues harder since it will be mixed together with inconsequential messages. A potential solution would be to use two `File` transports, one that logs all messages to a `combined.log` file, and another that logs messages with a minimum severity of `error` to a separate file.

### 7. Adding metadata to your logs

Winston supports the addition of metadata to log messages. You can add default metadata to all log entries, or specific metadata to individual logs. 

```typescript
  defaultMeta: { service: 'nestjs-core' },
```
