import {sql} from "../database/database.js";

// This page runs SQL queries to fetch, update, or add data to database

const statisticsQuery = async () => {
    const listsCount = await sql`SELECT COUNT(*) FROM shopping_lists`;
    const itemsCount = await sql`SELECT COUNT(*) FROM shopping_list_items`;
    return {
        listsCount: listsCount[0].count,
        itemsCount: itemsCount[0].count,
    };
};

const getListsQuery = async () => {
    const lists = await sql`SELECT * FROM shopping_lists WHERE active = true`;
    console.log(lists);
    return lists;
};

const addListQuery = async (name) => {
    return await sql`INSERT INTO shopping_lists (name, active) VALUES (${name}, true)`;
};

const deactivateListQuery = async (id) => {
    return await sql`UPDATE shopping_lists SET active = false WHERE id = ${id}`;
};

const getNameByIdQuery = async (id) => {
    const names = await sql`SELECT name FROM shopping_lists WHERE id = ${id}`;
    return names[0].name;
}

const getListByIdQuery = async (id) => {
    const listById = await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${id}`;
    console.log(listById);
    return listById;
};

const addListItemQuery = async (id, name) => {
    return await sql`INSERT INTO shopping_list_items (shopping_list_id, name) VALUES (${id}, ${name})`;
};

const isCollectedQuery = async (item_id, id) => {
    return await sql`UPDATE shopping_list_items SET collected = true WHERE id = ${item_id} AND shopping_list_id = ${id}`;
};

export { getListsQuery, addListQuery, getListByIdQuery, deactivateListQuery, isCollectedQuery, addListItemQuery, statisticsQuery, getNameByIdQuery };