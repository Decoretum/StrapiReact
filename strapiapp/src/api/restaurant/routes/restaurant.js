'use strict';

// @ts-ignore
const { find } = require('../../../../config/middlewares');

/**
 * restaurant router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;



module.exports = createCoreRouter('api::restaurant.restaurant');
