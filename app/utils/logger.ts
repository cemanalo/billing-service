import { createLogger, format, transports } from 'winston'

export default function getLogger() {
  const logger = createLogger({
    level: 'error',
    format: format.json(),
    defaultMeta: { service: 'billing-service' },
    transports: [
      new transports.File({ filename: 'error.log', level: 'error' }),
      new transports.File({ filename: 'combined.log' }),
    ],
  })
  
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
      format: format.simple(),
    }));
  }

  return logger
}