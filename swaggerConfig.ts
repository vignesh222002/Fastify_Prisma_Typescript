const swaggerConfig = {
    swagger: {
        info: {
            title: 'Swagger Test',
            description: 'Swagger Description',
            version: '0.1.0',
        },
        externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here'
        },
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [
            { name: 'user', description: 'User APIs' },
        ],
    }
}

export default swaggerConfig;