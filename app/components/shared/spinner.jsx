import React from 'react'
import cx from 'classnames'

function Spinner(props: { active: boolean }) {
  const { active } = props
  return (<div className={ cx('app--spinner', { active }) } />)
}

export default Spinner
