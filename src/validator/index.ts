import Joi from "joi"
import {NextFunction} from "express";
import {logger} from "../utils/logger";
import InvariantError from "../exception/invariant-error";
export enum ValidationSource {
    BODY = 'body',
    HEADER = 'headers',
    QUERY = 'query',
    PARAM = 'params',
}
export default (
    schema: Joi.AnySchema,
    source: ValidationSource = ValidationSource.BODY,
) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            // @ts-ignore
            const { error } = schema.validate(req[source]);

            if (!error) return next();

            const { details } = error;
            const message = details
                .map((i) => i.message.replace(/['"]+/g, ''))
                .join(',');
            logger.error(message);

            next(new InvariantError(message));
        } catch (error) {
            next(error);
        }
    };