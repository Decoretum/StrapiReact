"use strict";

/**
 * restaurant controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::restaurant.restaurant", ({ strapi }) => ({
    async index(ctx){
        //ctx is the REQUEST QUERY Params

        // @ts-ignore
        const {data, meta} = await super.find(ctx)
        // @ts-ignore
        // we sanitize the query to not leak confidential data
        const sanitizedQuery = await this.sanitizeQuery(ctx);
        if (sanitizedQuery !== null || sanitizedQuery !== undefined){
            return {data, result: 'No result'}
        }

        
        const objects = data;
        console.log(sanitizedQuery)
        for (let object of objects){
            if (object.attributes.Name.trim().toUpperCase() === sanitizedQuery.name.trim().toUpperCase()){
                return {result: object}
            }
        }

        return {result: 'No result'}
    }
}))
