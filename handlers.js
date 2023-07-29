import { sql } from "./database/database.js";

export async function getLists() {
    return await sql`SELECT * FROM shopping_lists`;
}

export async function postList(ctx) {
    const body = await ctx.request.body().value;
    const newList = await sql`
    INSERT INTO shopping_lists (name, active)
    VALUES (${body.name}, true)
    RETURNING *`;
    ctx.response.redirect('/lists');
}

export async function getListById(ctx) {
    const id = ctx.params.id;
    const list = await sql`
    SELECT * FROM shopping_lists
    WHERE id = ${id}`;
    ctx.response.body = list;
}

export async function postDeactivateList(ctx) {
    const id = ctx.params.id;
    await sql`
    UPDATE shopping_lists
    SET active = false
    WHERE id = ${id}`;
    ctx.response.redirect('/lists');
}

export async function getListItem(ctx) {
    const id = ctx.params.id;
    const items = await sql`
    SELECT * FROM shopping_items
    WHERE list_id = ${id}`;
    ctx.response.body = items;
}

export async function postListItem(ctx) {
    const id = ctx.params.id;
    const body = await ctx.request.body().value;
    await sql`
    INSERT INTO shopping_items (list_id, name)
    VALUES (${id}, ${body.name})`;
    ctx.response.redirect(`/lists/${id}`);
}