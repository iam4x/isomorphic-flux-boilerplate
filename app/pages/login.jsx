import React, { Component, PropTypes } from 'react'

class LoginPage extends Component {

  static contextTypes = {
    flux: PropTypes.object.isRequired,
    i18n: PropTypes.func.isRequired
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { flux } = this.context
    // Use `refs` it fixes `null` values from state when field has
    // been autocompleted from the browser on first render or using
    // autofill from browser on click into input
    flux.getActions('session').login({
      username: this.$username.value,
      password: this.$password.value
    })
  }

  render() {
    const { i18n } = this.context

    return (
      <form onSubmit={ this.handleSubmit }>
        <p className='alert alert-info'>{ i18n('login.help') }</p>
        <div className='form-group'>
          <label htmlFor='username'>
            { i18n('login.username.label') }
          </label>
          <input
            ref={ (el) => { this.$username = el } }
            type='text'
            name='username'
            className='form-control'
            placeholder={ i18n('login.username.placeholder') }
            required={ true } />
        </div>
        <div className='form-group'>
          <label htmlFor='username'>
            { i18n('login.password.label') }
          </label>
          <input
            ref={ (el) => { this.$password = el } }
            type='password'
            name='password'
            className='form-control'
            required={ true } />
        </div>
        <div className='form-group'>
          <button className='btn btn-primary'>
            { i18n('login.submit') }
          </button>
        </div>
      </form>
    )
  }

}

export default LoginPage
