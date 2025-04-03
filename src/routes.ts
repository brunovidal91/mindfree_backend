import { Router } from "express";

const router = Router();

// ------------- Controllers --------------

//Middlewares
import { authToken } from "./middlewares/authToken";

//Users
import { GetUsersController } from "./controllers/users/GetUsersController";
import { CreateUserController } from "./controllers/users/CreateUserController";
import { DeleteUserController } from "./controllers/users/DeleteUserController";
import { UpdateUserController } from "./controllers/users/UpdateUserController";
import { UpdatePasswordController } from "./controllers/users/UpdatePasswordController";

//Login
import { SignInUserController } from "./controllers/login/SignInUserController";

//Logout
import { LogoutController } from "./controllers/logout/LogoutController";

//Categories
import { CreateCaregoryController } from "./controllers/categories/CreateCaregoryController";
import { GetCategoriesController } from "./controllers/categories/GetCategoriesController";
import { DeleteCategoryController } from "./controllers/categories/DeleteCategoryController";

//Transactions
import { CreateTransactionController } from "./controllers/transactions/CreateTransactionController";
import { GetTransactionsController } from "./controllers/transactions/GetTransactionsController";
import { DeleteTransactionController } from "./controllers/transactions/DeleteTransactionController";

//Me
import { MeController } from "./controllers/me/MeController";

//Recovery
import { RecoveryController } from "./controllers/recovery/RecoveryController";

//Config

import { UpdateConfigController } from "./controllers/config/UpdateConfigController";
import { GetConfigController } from "./controllers/config/GetConfigController";

// ------------- Routes ------------------

//Users
router.get('/users', authToken, new GetUsersController().handle);
router.post('/users/add', new CreateUserController().handle);
router.delete('/users/delete/:id', authToken, new DeleteUserController().handle);
router.put('/users/update/:id', authToken, new UpdateUserController().handle);
router.put('/users/update', authToken, new UpdatePasswordController().handle);

//Login
router.post('/login', new SignInUserController().handle);

//Logout
router.get('/leave', authToken, new LogoutController().handle);

//Categories
router.post('/categories/add', authToken, new CreateCaregoryController().handle);
router.get('/categories', authToken, new GetCategoriesController().handle);
router.delete('/categories/:id', authToken, new DeleteCategoryController().handle);

//Transactions
router.post('/transactions', authToken, new CreateTransactionController().handle);
router.get('/transactions', authToken, new GetTransactionsController().handle);
router.delete('/transactions', authToken, new DeleteTransactionController().handle);

//Me
router.get('/me', authToken, new MeController().handle);

//Recovery
router.post('/recovery', new RecoveryController().handle);

//Config
router.put('/config', authToken, new UpdateConfigController().handle);
router.get('/config', authToken, new GetConfigController().handle);


export { router };
