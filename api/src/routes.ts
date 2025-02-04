import { Router } from "express";
import { ensureAuth } from "./middleware/ensureAuth";
import { AuthController } from "./routes/auth/AuthController";
import { CreateUserController } from "./routes/users/create/CreateUserController";
import { DeleteUserController } from "./routes/users/delete/DeleteUserController";
import { ListUserController } from "./routes/users/list/ListUserController";
import { UpdateUserController } from "./routes/users/update/UpdateUserController";
import { PasswordChangeController } from "./routes/password/change/PasswordChangeController";
import { PasswordResetController } from "./routes/password/reset/PasswordResetController";
import { ensureSystemAdmin } from "./middleware/ensureSystemAdmin";
import { CreateInstitutionController } from "./routes/institutions/create/CreateInstitutionController";
import { UpdateInstitutionController } from "./routes/institutions/update/UpdateInstitutionController";
import { ListInstitutionController } from "./routes/institutions/list/ListInstitutionController";
import { DeleteInstitutionController } from "./routes/institutions/delete/DeleteInstitutionController";
import { CreateSubjectController } from "./routes/subjects/create/CreateSubjectController";
import { CreateTaskController } from "./routes/tasks/create/CreateTaskController";
import { CreateQuestionController } from "./routes/questions/create/CreateQuestionController";
import { CreateUserSubjectsController } from "./routes/userSubjects/create/CreateUserSubjectsController";
import { CreateUserTaskQuestionsController } from "./routes/userTaskQuestions/create/CreateUserTaskQuestionsController";
import { ListUserTasksController } from "./routes/userTasks/list/ListUserTasksController";
import { ReadTasksController } from "./routes/tasks/read/ReadTasksController";

const router = Router();

//Auth
router.post("/auth", new AuthController().handle);

//Password
router.post("/password-reset", new PasswordResetController().handle);
router.put("/password-change", new PasswordChangeController().handle);

//Users
router.post("/users", [ensureAuth, ensureSystemAdmin], new CreateUserController().handle);
router.put("/users/:id", [ensureAuth, ensureSystemAdmin], new UpdateUserController().handle);
router.get("/users", [ensureAuth, ensureSystemAdmin], new ListUserController().handle);
router.delete("/users/:id", [ensureAuth, ensureSystemAdmin], new DeleteUserController().handle);

//Institutions
router.post("/institutions", [ensureAuth, ensureSystemAdmin], new CreateInstitutionController().handle);
router.put("/institutions/:id", [ensureAuth, ensureSystemAdmin], new UpdateInstitutionController().handle);
router.get("/institutions", [ensureAuth, ensureSystemAdmin], new ListInstitutionController().handle);
router.delete("/institutions/:id", [ensureAuth, ensureSystemAdmin], new DeleteInstitutionController().handle);

//Subjects
router.post("/subjects", ensureAuth, new CreateSubjectController().handle);

//Tasks
router.get("/tasks/:id", new ReadTasksController().handle);
router.post("/tasks", ensureAuth, new CreateTaskController().handle);

//Questions
router.post("/tasks/:taskId/questions", ensureAuth, new CreateQuestionController().handle);

//UserSubjects
router.post("/user-subjects", ensureAuth, new CreateUserSubjectsController().handle);

//UserTasks
router.get("/user-tasks", new ListUserTasksController().handle);

//UserTaskQuestions
router.post("/user-task/:userTaskId/questions", new CreateUserTaskQuestionsController().handle);

export { router };
