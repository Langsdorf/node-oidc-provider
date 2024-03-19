import instance from "../../helpers/weak_cache";

/*
 * Loads the End-User's account referenced by the session.
 */
export default async function loadAccount(ctx, next) {
  const { accountId } = ctx.oidc.session;

  if (accountId) {
    const account = await ctx.oidc.provider.Account.findAccount(ctx, accountId);
    ctx.oidc.entity("Account", account);
  }

  const middleware = instance(ctx.oidc.provider).configuration("middleware");

  const middlewareResult = await middleware(ctx);

  if (!middlewareResult) {
    const renderError = instance(ctx.oidc.provider).configuration("renderError");
    await renderError(ctx, out, err);

    return;
  }

  return next();
}
