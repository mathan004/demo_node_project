import express  from "express";
import {registerRole,getRoles,updateRole,deleteRole}from "../controllers/rolecontroller.js"
import { protect, authorize } from  "../controllers/authcontroller.js"


const roleRouter = express.Router();

/**
 * @swagger
 * /api/roles/role_register:
 *   post:
 *     summary: Register a new role
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               status:
 *                 type: boolean
 *                 default: true
 *     responses:
 *       201:
 *         description: Role created successfully
 *       400:
 *         description: Role already exists
 */


roleRouter.post("/role_register", registerRole);


/**
 * @swagger
 * /api/roles/:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of roles
 */


roleRouter.get("/", protect, authorize("admin"), getRoles);



/**
 * @swagger
 * /api/roles/{id}:
 *   patch:
 *     summary: Update an existing role
 *     tags:
 *       - Roles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the role to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: New role name
 *               status:
 *                 type: boolean
 *                 description: Role active status
 *     responses:
 *       200:
 *         description: Role updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Role updated successfully
 *                 role:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 64f123abc4567890def12345
 *                     name:
 *                       type: string
 *                       example: admin
 *                     status:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: Bad request / invalid ID
 *       404:
 *         description: Role not found
 */
roleRouter.patch("/:id", updateRole);



/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     summary: Delete a role by ID
 *     tags:
 *       - Roles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Role ID to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Role deleted successfully
 *                 role:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 64f123abc4567890def12345
 *                     name:
 *                       type: string
 *                       example: admin
 *       404:
 *         description: Role not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Role not found
 */
roleRouter.delete("/:id", deleteRole);






export default roleRouter;
