import { Router } from "express";
import { 
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    addMembersToProject,
    getProjectMembers,
    updateMemberRole,
    deleteMember
} from "../controllers/project.controllers.js";
import { validate } from '../middlewares/validator.middleware.js';
import { 
    addMemberToProjectValidatorSchema,
    createProjectValidatorSchema
} from "../validators/validator.js";
import { check, checkSchema } from "express-validator";
import { 
    verifyJWT, 
    validateProjectPermission 
} from "../middlewares/auth.middleware.js";
import { AvailableUserRole, UserRolesEnum } from "../utils/constants.js";

const router = Router();

router.use(verifyJWT);

router
    .route('/')
    .get(getProjects)
    .post(checkSchema(createProjectValidatorSchema), validate, createProject);

router
    .route('/:projectId')
    .get(validateProjectPermission(AvailableUserRole) ,getProjectById)
    .put(
        validateProjectPermission([UserRolesEnum.ADMIN]),
        checkSchema(createProjectValidatorSchema),
        validate,
        updateProject
    )
    .delete(
        validateProjectPermission([UserRolesEnum.ADMIN]),
        deleteProject
    );

router
    .route('/:projectId/members/')
    .get(
        validateProjectPermission(AvailableUserRole),
        getProjectMembers
    )
    .post(
        validateProjectPermission([UserRolesEnum.ADMIN]),
        checkSchema(addMemberToProjectValidatorSchema),
        validate,
        addMembersToProject
    )

router
    .route('/:projectId/members/:userId')
    .put(
        validateProjectPermission([UserRolesEnum.ADMIN]),
        updateMemberRole
    )
    .delete(
        validateProjectPermission([UserRolesEnum.ADMIN]),
        deleteMember
    );



export default router;