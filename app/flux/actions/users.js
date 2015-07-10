import alt from 'utils/alt';

const UsersActions = alt
  .generateActions(
    'fetchSuccess', 'fetchBySeedSuccess',
    'addSuccess', 'remove'
  );

export default UsersActions;
