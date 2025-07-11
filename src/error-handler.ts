import { Request, Response, NextFunction } from 'express';
import { IErrorResponse } from '@sumaniac28/gigglobal-helper-v1';
import { CustomError } from '@sumaniac28/gigglobal-helper-v1';

export function errorHandler(error: IErrorResponse, _req: Request, res: Response, _next: NextFunction): void {
  if (error instanceof CustomError) {
    res.status(error.statusCode).json(error.serializeErrors());
    return;
  }

  res.status(500).json({
    message: 'Internal Server Error',
    statusCode: 500,
    status: 'error',
    comingFrom: 'Unhandled Exception'
  });
}
