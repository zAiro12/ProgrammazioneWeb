const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
      title: 'API SPOTIFY',
      description: 'progetto per esame',
    },
    host: 'localhost:3000',
    schemes: ['http'],
  };

  const outputFile = 'swagger-output.json'
  const endpointsFiles = ['index.js']

  swaggerAutogen(outputFile, endpointsFiles, doc);