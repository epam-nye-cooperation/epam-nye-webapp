import { NextFunction, Response, Request, Router } from "express";
import * as Yup from "yup";

export interface UserLogin {
  username: string;
  password: string;
}

const schema = Yup.object().shape({
  username: Yup.string().ensure()
    .required("Please enter your username")
    .max(100, "Too long username"),
  password: Yup.string().ensure()
    .required("Please enter your password")
    .min(8, "Your password is too short"),
});

export const createUsersMiddleware = (rootPath: string): Router => {
  const router = Router();

  router.post(`${rootPath}/login`, async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body as UserLogin);
      next();
    } catch(error) {
      res.status(400).json(error);
    }
  });

  router.post(`${rootPath}/login`, (req: Request, res: Response) => {
    const { username, password } = req.body as UserLogin;
    if (username === "admin" && password === "password") {
      return res.json({
        status: "logged in"
      });
    }
    res.status(401).json({
      error: "invalid username or password"
    });
  });

  return router;
};
