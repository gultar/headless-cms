import { Router } from "https://deno.land/x/oak/mod.ts";
import { 
    getArticlesHandler, 
    getOneArticleHandler, 
    postArticleHandler, 
    updateArticleHandler, 
    deleteArticleHandler } from './route-handler.ts'
import httpErrorHandler from "./error-middleware.ts";

//Instead of hardcoding routes, add to config file, which is then 

const router = new Router();

router
    
    .get("/", (ctx) => {
        ctx.response.body = "RESTful API\nVERSION: 0.1"
    })
    .use(httpErrorHandler)
    .get("/articles", async (ctx) => await getArticlesHandler(ctx))
    .get("/articles/:id", async (ctx) => await getOneArticleHandler(ctx))
    .post("/articles", async (ctx)=> await postArticleHandler(ctx))
    .put("/articles/:id", async (ctx)=> await updateArticleHandler(ctx))
    .delete("/articles/:id", async (ctx)=> await deleteArticleHandler(ctx))
    

export default router;