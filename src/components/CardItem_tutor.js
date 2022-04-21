import React from 'react'
import { Link } from 'react-router-dom'

function CardItem(props) {
  let sub = props.text;
  console.log(sub);
  return (
    <>
      <li className="cards__item__tutor">
        <Link 
        className="cards__item__link" 
        to={props.path}
        state={{subject: sub}}
        >
          {/* <figure className="cards__item__pic-wrap" data-category={props.label}> */}
          <div className="cards__item__pic-wrap">
            {/* <div className="image-wrapper"> */}
            <img
              className="cards__item__img"
              alt="Travel Image"
              src={props.src}
            />
            {/* </div> */}
          </div>
          <div className="cards__item__info">
            <h5 className="cards__item__text">{props.text}</h5>
          </div>
        </Link>
      </li>
    </>
  )
}

export default CardItem
