import expressJSDocSwagger from "express-jsdoc-swagger";
import path from "path";

const options = {
	info: {
		version: "1.0.0",
		title: "Praxy Chatbot",
		description: "API Praxy Chatbot",
	},
	baseDir: path.resolve(process.cwd()),
	filesPattern: "src/**/*.router.ts",
	swaggerUIPath: "/api-docs",
	exposeApiDocs: true,
	apiDocsPath: "/api-map",
};

/**
 * Swagger middleware factory
 * @param {object} app Express application
 * @returns {object} Express JSDoc Swagger middleware that create web documentation
 */
export default (app: any) => expressJSDocSwagger(app)(options);
