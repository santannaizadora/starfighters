import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

//validate if the fighters are not the same

const schema = joi.object({
  firstUser: joi.string().required(),
  secondUser: joi.string().required()
});

export const checkBattleBody = (req: Request, res: Response, next: NextFunction) => {

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).send({
      message: error.details[0].message,
    });
  }

  if(value.firstUser === value.secondUser){
    return res.status(400).send({
      message: "The fighters cannot be the same",
    });
  }

  next();

}