import { NextFunction } from "express";
import { validationResult } from "express-validator";
import express from "express"

export const validation = (req:express.Request, res:express.Response, next:express.NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const errorsExtracted: string[]  = [];
  errors.array().map((err) => errorsExtracted.push(err.msg));
  return res.status(422).json({
    success: false,
    data:{
        statusCode:422,
        value: errorsExtracted
    }
  })
};
