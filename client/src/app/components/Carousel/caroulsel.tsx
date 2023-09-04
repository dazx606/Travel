"use client"
import React, { useEffect, useState } from 'react'
import style from './Carousel.module.css'
//made by fr


function Carousel() {

  const images:string[] = [
    "https://i.ibb.co/HFws3z6/DF4-IPTXH6-RAJHBKE3-MUA25-REQU-1.jpg",
    "https://i.ibb.co/YyPPrsr/LS7-MDTSQLJG3-LIINYRK3-L743-FY-2-1.jpg",
    "https://i.ibb.co/N6FTRpm/2-Santafe-de-Antioquia-Puente-De-Occidente.jpg",
    "https://i.ibb.co/Yh3Q1dx/lugares-turisticos-de-antioquia.jpg",
  ]
  const [img, setImg] = useState<number>(0)

  function next():void {
    if (img < images.length - 1) setImg(img + 1)
    else setImg(0)
  }

  function back():void {
    if (img > 0) setImg(img - 1)
    else setImg(images.length - 1)
  }

  useEffect(() => {
    const time = setTimeout(next, 6000)
    return () => clearTimeout(time)
  }, [img])

  return (
    <div>
      <div className={style.slideshowContainer}>

        <img key={img} src={images[img]} className={`${style.img} ${style.fade}`} />

        <a className={style.prev} onClick={back}>&#10094;</a>
        <a className={style.next} onClick={next}>&#10095;</a>
        <div className={style.dotContainer}>
          {images.length ?
            images.map((e, k) =>
              <span key={k + 1} className={img !== k ? style.dot : style.activeDot} onClick={() => setImg(k)}></span>
            )
            :
            <p>Image not found</p>
          }
        </div>
      </div>


    </div>
  )
}

export default Carousel