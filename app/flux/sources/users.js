import data from 'data/users.json';

const UsersSource = alt => {
  return {
    performUsers: {
      remote() {
        return new Promise( (resolve) => {
          setTimeout( () => {
            resolve(data);
          }, 1000);
        });
      },

      local(state) {
        return state.users ? state.users : null;
      },

      success: alt.getActions('users').fetchSuccess,
      error: alt.getActions('users').remove
    }
  };
};

export default UsersSource;
