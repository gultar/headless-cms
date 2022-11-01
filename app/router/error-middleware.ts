import { isHttpError, RouterContext } from "https://deno.land/x/oak/mod.ts";

const httpErrorHandler = async (context: RouterContext<any>, next: any) => {
    try {
      await next();
    } catch (err) {
      if (isHttpError(err)) {
        context.response.status = err.status;
      } else {
        context.response.status = 500;
      }
      context.response.body = { error: err.message };
      context.response.type = "json";
    }

}

export default httpErrorHandler