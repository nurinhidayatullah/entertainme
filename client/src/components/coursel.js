import React from 'react'
// import ReactDom from 'react-dom'
import "react-responsive-carousel/lib/styles/carousel.css";
import {Carousel} from 'react-responsive-carousel'

const Poster = ({filtered}) => {
    return (
        <div className="posters">
            <Carousel showThumbs={false} autoPlay={true} interval={3000} showStatus={false} showArrows={false} infiniteLoop={true}>
                {filtered.map(movie => (
                    <img src={movie.poster_path} alt="..." />
                ))}
            </Carousel>
        </div>
    )
}


export default Poster