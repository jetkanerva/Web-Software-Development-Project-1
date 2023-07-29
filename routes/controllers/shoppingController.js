import {
    addListQuery,
    getListByIdQuery,
    isCollectedQuery,
    getListsQuery,
    deactivateListQuery,
    addListItemQuery,
    statisticsQuery,
    getNameByIdQuery
} from "../../services/shoppingService.js";

// This page handles requests and calls appropriate functions to retrieve data

const main = async ({ render }) => {
    const statistics = await statisticsQuery();
    console.log(statistics)
    render('index.eta', statistics);
};

const getLists = async ({ render }) => {
    const lists = await getListsQuery();
    render('shopping_lists.eta', { lists });
};

const addList = async ({ request, response }) => {
    const body = request.body({ type: "form" });
    const data = await body.value;

    const name = data.get("name");
    await addListQuery(name);

    response.status = 303;
    response.redirect("/lists");
};

const getListById = async ({ params, render }) => {
    const id = params.id;
    console.log(id);
    const name = await getNameByIdQuery(id);
    console.log(name)
    const lists = await getListByIdQuery(id);

    lists.sort((a, b) => {
        if (a.collected && !b.collected) {
            return 1;
        } else if (!a.collected && b.collected) {
            return -1;
        } else {
            return a.name.localeCompare(b.name);
        }
    });

    render('shopping_list.eta', { lists, id, name });
};

const deactivateList = async ({ params, response }) => {
    const id = params.id;
    console.log(id);
    await deactivateListQuery(id);

    response.status = 303;
    response.redirect("/lists");
};

const isCollected = async ({ response, params }) => {
    const itemId = params.item_id;
    const id = params.id;
    console.log(itemId);
    await isCollectedQuery(itemId, id);

    response.status = 303;
    response.redirect(`/lists/${id}`);
};

const addListItem = async ({ params, request, response }) => {
    console.log("addListItem");
    const body = request.body();
    const data = await body.value;

    const name = data.get("name")
    console.log(name);
    console.log(params.id);

    await addListItemQuery(params.id, name);

    response.status = 303;
    response.redirect(`/lists/${params.id}`);
};

export { getLists, addList, getListById, deactivateList, isCollected, addListItem, main };