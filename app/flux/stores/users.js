class UsersStore {

  constructor() {
    this.bindActions(this.alt.getActions('users'))

    this.collection = []
    this.error = null
  }


  onIndexSuccess(users: Object[]) {
    this.collection = users
    this.error = null
  }

  onIndexFail({ error }: { error: ?Object }) {
    this.error = error
  }

  onShowSuccess(user: { seed: string }) {
    const index = this.collection.findIndex(({ seed }) => seed === user.seed)

    if (index > -1) {
      this.collection = this.collection.map((u, idx) => (idx === index ? user : u))
    } else {
      this.collection = [ ...this.collection, user ]
    }

    this.error = null
  }

  onShowFail({ error }: { error: ?Object }) {
    this.error = error
  }

  onRemove(index: number) {
    this.collection = this.collection.filter((user, idx) => idx !== index)
  }

}

export default UsersStore
