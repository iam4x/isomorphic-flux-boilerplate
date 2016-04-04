import React, { Component } from 'react'

export default function requireAuth(ChildComponent) {
  class Authenticated extends Component {

    static onEnter(next, redirect: Function<?Object, string>) {
      // Assume user is never authenticated
      // TODO: link with some API for better example
      const isAuthenticated: boolean = false
      if (!isAuthenticated) redirect({}, '/login-info')
    }

    render() {
      return <ChildComponent { ...this.props } { ...this.state } />
    }
  }

  return Authenticated
}
