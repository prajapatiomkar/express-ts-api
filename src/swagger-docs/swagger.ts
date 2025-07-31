/**
 * @openapi
 * openapi: 3.0.0
 * info:
 *   title: Example User API
 *   version: 1.0.0
 *   description: API documentation for User endpoints
 * servers:
 *   - url: http://localhost:3000
 *     description: Development server
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 60d0fe4f5311236168a109ca
 *           description: MongoDB generated unique ID
 *         name:
 *           type: string
 *           example: Alice
 *           description: User's full name
 *         email:
 *           type: string
 *           example: alice@example.com
 *           description: User's email address
 *     UserInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           example: Alice
 *           description: User's full name
 *         email:
 *           type: string
 *           example: alice@example.com
 *           description: User's email address
 */

/**
 * You do NOT place route-level endpoint docs here.
 * Only global info, servers, and reusable component schemas belong here.
 * Route-level docs should be placed in files like src/routes/userRoutes.ts
 * with @openapi comments on each route.
 */
export {}; // needed for module resolution, no imports or exports otherwise
