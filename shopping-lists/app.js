import { serve, configure } from "./deps.js";

import * as ShoppingListController from "./controllers/ShoppingListController.js"
import * as MainPageController from "./controllers/MainPageController.js"
import * as ItemController from "./controllers/ItemController.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const RedirectFunctionality = (path) => {
  return new Response(`Redirecting to /.`, {
    status: 303,
    headers: {"Location": path,},});
};


const handleRequest = async (request) => {
  const url = new URL(request.url);
  const id = url.pathname.split("/")[2];

  // Show mainpage
  if (url.pathname === "/" && request.method === "GET") {
    return await MainPageController.ShowMainPage(request);

  // Create shoppinglist
  } else if (url.pathname === "/lists" && request.method === "POST" ){
    return await ShoppingListController.CreateNewList(request);

  // Show shopping lists
  } else if (url.pathname === "/lists" && request.method === "GET"){
    return await ShoppingListController.ShowLists(request);
    
  // Deactivate shopping list
  } else if (url.pathname === `/lists/${id}/deactivate` && request.method === "POST" ) {
    return await ShoppingListController.DeactivateList(request)

  // Show items
  } else if (url.pathname === `/lists/${id}/items` && request.method === "GET" ) {
    return await ItemController.ShowItems(request);

  // Add new item
  } else if (url.pathname === `/lists/${id}/items` && request.method === "POST" ) {
    return await ItemController.AddItem(request);

  // Redirect back to mainpage
  } else {
    return RedirectFunctionality("/");
  }

};

serve(handleRequest, { port: 7777 });