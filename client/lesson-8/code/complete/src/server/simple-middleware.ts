import { Response, Request, Router } from "express";

export const createSimpleMiddleware = (rootPath: string): Router => {
  const router = Router();

  router.get(`${rootPath}/`, (req: Request, res: Response) => {
    const { query } = req.query;

    if (typeof query === "string") {
      res.json({
        myParam: "this was my query",
        query,
      });
    }
    res.status(400).json({
      error: `unexpected type for "query": ${typeof query}`
    });
  });

  router.get(`${rootPath}/:routeParam`, (req: Request, res: Response) => {
    const param = req.params.routeParam;
    return res.json({
      param: `route param was: ${param}`
    });
  });

  return router;
};
