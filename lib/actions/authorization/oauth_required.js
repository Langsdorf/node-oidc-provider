const _ = require('lodash');
const { InvalidRequestError } = require('../../helpers/errors');

/*
 * Validates presence of mandatory OAuth2.0 parameters response_type, client_id and scope.
 *
 * @throws: invalid_request
 */
module.exports = async function oauthRequired(ctx, next) {
  // Validate: required oauth params
  const { params } = ctx.oidc;
  const missing = _.difference([
    'response_type',
    'client_id',
    'scope',
  ], _.keys(_.omitBy(params, _.isUndefined)));

  ctx.assert(_.isEmpty(missing), new InvalidRequestError(
    `missing required parameter(s) ${missing.join(',')}`));

  await next();
};