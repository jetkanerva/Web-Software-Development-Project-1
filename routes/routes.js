import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import * as shoppingApi from "./controllers/shoppingController.js";

// Deno router to handle API requests

const router = new Router();

router.get('/', shoppingApi.main)
router.get('/lists', shoppingApi.getLists)
router.get('/lists/:id', shoppingApi.getListById)

router.post('/lists', shoppingApi.addList)
router.post('/lists/:id/deactivate', shoppingApi.deactivateList)
router.post('/lists/:id/items', shoppingApi.addListItem);
router.post('/lists/:id/items/:item_id/collect', shoppingApi.isCollected);

export { router };