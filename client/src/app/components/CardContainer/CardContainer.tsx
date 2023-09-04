import React from 'react'
import Card from '../Card/Card'
import style from './CardContainer.module.css'

export const CardContainer = ():JSX.Element => {
  return (
    <div className={style.container}>
        <Card/>
    </div>
  )
}
