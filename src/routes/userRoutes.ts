import { Router } from "express";
import { createUser, getUsers } from "../controllers/userController";
import { authenticate } from "../middleware/authMiddleware";
import { validate } from "../middleware/validationMiddleware";
import { userRegistrationSchema } from "../schemas/userSchemas";

const router = Router();
/**
 * @openapi
 * /api/v1/users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       description: User information to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.get("/", getUsers);
router.get("/protected", authenticate, (req, res) => {
  res.json({ message: "shhh... you are in protected route!" });
});
export default router;
