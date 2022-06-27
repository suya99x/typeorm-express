import { deleteUserAction } from "./controller/DeleteUser";
import { getAllUserAction } from "./controller/GetAllUser";
import { postAllUserAction } from "./controller/PostAllUser";

export const AppRoutes = [{ 
      method: "get", 
      path: "/users", 
      action: getAllUserAction
   },
    { 
      method: "post", 
      path: "/users", 
      action: postAllUserAction
   }, { 
      method: "delete", path: "/users/:id", 
      action: deleteUserAction
}];