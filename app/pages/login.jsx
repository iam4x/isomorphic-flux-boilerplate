import React, { Component, PropTypes } from 'react';
import { IntlMixin } from 'react-intl';

class LoginPage extends Component {

  static contextTypes = {
    flux: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired
  }

  i18n = IntlMixin.getIntlMessage

  handleSubmit(e) {
    e.preventDefault();
    const { flux } = this.context;
    // Use `refs` it fixes `null` values from state when field has
    // been autocompleted from the browser on first render or using
    // autofill from browser on click into input
    const data = Object.keys(this.refs).reduce((res, input) =>
      ({ ...res, [input]: this.refs[input].value }), {});
    return flux.getActions('session').login(data);
  }

  render() {
    return (
      <form onSubmit={ ::this.handleSubmit }>
        <p className='alert alert-info'>{ this.i18n('login.help') }</p>
        <div className='form-group'>
          <label htmlFor='username'>
            { this.i18n('login.username.label') }
          </label>
          <input
            ref='username'
            type='text'
            name='username'
            className='form-control'
            placeholder={ this.i18n('login.username.placeholder') }
            required />
        </div>
        <div className='form-group'>
          <label htmlFor='username'>
            { this.i18n('login.password.label') }
          </label>
          <input
            ref='password'
            type='password'
            name='password'
            className='form-control'
            required />
        </div>
        <div className='form-group'>
          <button className='btn btn-primary'>
            { this.i18n('login.submit') }
          </button>
        </div>
      </form>
    );
  }

}

export default LoginPage;
