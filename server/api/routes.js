import { users } from './data.json';
import dealContainers from './deal-containers.json';

const simplifyUsers = (collection) => collection
  .map(({ user, seed }) => ({ ...user, seed }))
  .map(({ email, name, seed, picture }) => ({ email, name, seed, picture }));

export default function (router) {
  router.get('/users', async function (ctx) {
    ctx.body = simplifyUsers(users.slice(0, 10));
  });

  router.get('/users/:seed', async function (ctx) {
    const { seed } = ctx.params;
    const [ result ] = simplifyUsers(users.filter(user => user.seed === seed));

    if (!result) {
      ctx.body = { error: { message: 'User not found' } };
    } else {
      ctx.body = result;
    }
  });

  router.get('/deal_containers', async function (ctx) {
    ctx.body = dealContainers;
  });

  router.get('/deal_containers/:id', async function (ctx) {
    const { id } = ctx.params;
    const [ result ] = dealContainers.filter(dc => dc.id === parseInt(id));

    if (!result) {
      ctx.body = { error: { message: 'DealContainer not found' } };
    } else {
      ctx.body = result;
    }
  });
}
