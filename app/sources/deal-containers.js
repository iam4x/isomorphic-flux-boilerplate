import data from 'data/users.json';

const DealContainersSource = alt => {
  return {
    perform: {
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

      success: alt.getActions('deal-containers').fetchSuccess,
      error: alt.getActions('deal-containers').fetchSuccess
    }
  };
};

export default DealContainersSource;
