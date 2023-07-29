import {Application} from "https://deno.land/x/oak@v11.1.0/mod.ts";
import {router} from "./routes/routes.js";
import { serve } from "./deps.js";

const app = new Application();
app.use(router.routes());

const handleRequest = async (request) => {
    return await app.handle(request);
};

serve(handleRequest, { port: 7777 });


