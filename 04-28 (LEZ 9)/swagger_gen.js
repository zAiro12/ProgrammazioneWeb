const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
      title: 'My API',
      description: 'Description',
    },
    host: 'localhost:3100',
    schemes: ['http'],
  };

  const outputFile = 'swagger-output.json'
  const endpointsFiles = ['index.js']

  swaggerAutogen(outputFile, endpointsFiles, doc);