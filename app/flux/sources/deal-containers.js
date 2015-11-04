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

      success: alt.getActions('dealContainers').fetchSuccess,
      error: alt.getActions('dealContainers').fetchSuccess
    }
  };
};

export default DealContainersSource;
