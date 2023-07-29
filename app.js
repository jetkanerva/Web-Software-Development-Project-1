import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { router } from "./routes/routes.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";

const app = new Application();

app.use(errorMiddleware);
app.use(renderMiddleware);

app.use(router.routes());

app.listen({ port: 7777 });


