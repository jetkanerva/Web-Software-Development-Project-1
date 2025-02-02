import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { router } from "./routes/routes.js";
import { serve } from "./deps.js";
import {renderMiddleware} from "./middlewares/renderMiddleware.js";
import {errorMiddleware} from "./middlewares/errorMiddleware.js";

const app = new Application();
app.use(renderMiddleware);
app.use(errorMiddleware);

app.use(router.routes());

const handleRequest = async (request) => {
    return await app.handle(request);
};

serve(handleRequest, { port: 7777 });


