import { users } from './data.json';

const simplifyUsers = (collection) => collection
  .map(({ user, seed }) => ({ ...user, seed }))
  .map(({ email, name, seed, picture }) => ({ email, name, seed, picture }));

export default function(router) {
  router.get('/users', function *() {
    this.body = simplifyUsers(users.slice(0, 10));
  });

  router.get('/users/:seed', function *() {
    const { seed } = this.params;
    const [ result ] = simplifyUsers(users.filter(user => user.seed === seed));

    if (!result) {
      this.body = { error: { message: 'User not found' } };
    } else {
      this.body = result;
    }
  });
}
