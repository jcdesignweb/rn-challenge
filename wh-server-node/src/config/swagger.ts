import { NODE_ENV } from '../config'
const baseDir = NODE_ENV === 'prod' ? '/' : __dirname + '/../'

export const options = {
    info: {
        version: '1.0.0',
        title: 'Aycron challenge API',
        description: 'Challenge Swagger API',
        license: {
            name: 'MIT'
        }
    },
    security: {
        BearerAuth: {
            type: 'http',
            scheme: 'bearer'
        }
    },
    baseDir,
    // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
    filesPattern: './**/*.ts',
    // URL where SwaggerUI will be rendered
    swaggerUIPath: '/api-docs',
    // Expose OpenAPI UI
    exposeSwaggerUI: true,
    // Expose Open API JSON Docs documentation in `apiDocsPath` path.
    exposeApiDocs: false,
    // Open API JSON Docs endpoint.
    apiDocsPath: '/v3/api-docs',
    // Set non-required fields as nullable by default
    notRequiredAsNullable: false,
    // You can customize your UI options.
    // you can extend swagger-ui-express config. You can checkout an example of this
    // in the `example/configuration/swaggerOptions.js`
    swaggerUiOptions: {}
}
