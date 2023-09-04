import React from 'react'
import style from './Card.module.css'



const Card = (): JSX.Element => {
    return (
        <div className={style.card}>
            <div className={style.cardImage}>
                <img src="https://i.ibb.co/Dzcss1F/1616605965-1.jpg" alt="1616605965-1" />
            </div>
            <div className={style.cardDescription}>
                <div className={style.textContainer}>
                    <p className={style.textTitle}>Jardin</p>
                    <p className={style.textBody}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                </div>
            </div>
        </div>
    )
}

export default Card
