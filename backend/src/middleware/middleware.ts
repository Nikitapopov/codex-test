import {Middleware, ExpressMiddlewareInterface} from 'routing-controllers';
import {configure, getLogger} from 'log4js';

configure({
    'appenders': {
        'app': {
            'type': 'file',
            'filename': 'log/app.log',
            'maxLogSize': 10485760,
            'numBackups': 3
        },
    },
    categories: { default: { appenders: ['app'], level: "info" } }
});

@Middleware({type: 'before'})
export class LoggingMiddleware implements ExpressMiddlewareInterface {
    use(request: any, response: any, next: (err?: any) => any): void {
        const logger = getLogger();
        logger.level = 'debug';
        logger.info({
            query: request.headers.host + request.url,
            id_source: request.connection?.remoteAddress
        });
        next();
    }
}