import React from 'react'
import connect from 'connect-alt'

function AccountPage(props: { session: ?{ username: string } }) {
  const { session: { username } } = props

  return (
    <div className='container'>
      <h1>Welcome, { username }!</h1>
    </div>
  )
}

const reducer = ({ session: { session } }) => ({ session })
export default connect('session', reducer)(AccountPage)
