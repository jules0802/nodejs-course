const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'info.log',
      level: 'info',
      format: format.combine(format.uncolorize(), format.json())
    })
  ]
});

module.exports = (req, res, next) => {
  const { url, query, body } = req;
  logger.log(
    'info',
    `${url} ${JSON.stringify(query)} "body": ${JSON.stringify(body)}`
  );
  next();
};
