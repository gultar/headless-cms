import { Application } from "https://deno.land/x/oak/mod.ts";
import router from './router/router.ts'

const run = async () =>{
    const app = new Application();
    const port = 8000
    
    app.use(router.allowedMethods());
    app.use(router.routes());
    
    app.addEventListener('listen', () => {
      console.log(`Listening on: localhost:${port}`);
    });
    
    await app.listen({ port });
}

export default run
