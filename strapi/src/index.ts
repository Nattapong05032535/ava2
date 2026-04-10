import type { Core } from '@strapi/strapi';

const PUBLIC_PRODUCT_ACTIONS = [
  'api::product.product.find',
  'api::product.product.findOne',
] as const;

async function ensurePublicProductPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
    where: {
      type: 'public',
    },
  });

  if (!publicRole) {
    return;
  }

  const existingPermissions = (await strapi
    .query('plugin::users-permissions.permission')
    .findMany({
      where: {
        role: publicRole.id,
      },
    })) as Array<{ action?: string | null }>;

  const existingActions = new Set(
    existingPermissions
      .map((permission) => permission.action)
      .filter((action): action is string => Boolean(action))
  );

  const missingActions = PUBLIC_PRODUCT_ACTIONS.filter(
    (action) => !existingActions.has(action)
  );

  if (missingActions.length === 0) {
    return;
  }

  await Promise.all(
    missingActions.map((action) =>
      strapi.query('plugin::users-permissions.permission').create({
        data: {
          action,
          role: publicRole.id,
        },
      })
    )
  );

  strapi.log.info(
    `Granted public product permissions: ${missingActions.join(', ')}`
  );
}

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      await ensurePublicProductPermissions(strapi);
    } catch (error) {
      strapi.log.warn(
        `Unable to ensure public product permissions: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  },
};
