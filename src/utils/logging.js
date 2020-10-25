const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: true,
      colorize: true
    }),
    new transports.File({
      filename: 'info.log',
      level: 'info',
      handleExceptions: true,
      json: true,
      format: format.combine(format.uncolorize(), format.json())
    })
  ]
});

logger.stream = {
  write(message) {
    logger.info(message);
  }
};

module.exports = (req, res, next) => {
  // const { url, query, body } = req;
  /* logger.log(
    'info',
    `${url} ${JSON.stringify(query)} "body": ${JSON.stringify(body)}`
  );*/

  next();
};
