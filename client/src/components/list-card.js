import React from 'react'


const CardList = ({list}) => {
    let stars = []

    const Stars = () => {
        const starsNum = Math.floor(list.popularity/2)
        for (let i = 0; i < starsNum; i++) {
            stars.push(<span key={i+2} className="fa fa-star checked"></span>)
        }
        for (let i = 0; i < (5-starsNum); i++) {
            stars.push(<span key={i} className="fa fa-star"></span>)
        }
        return stars
    }

    return (
        <div className="list-item">
            <div className="list-image">
                <img src={list.poster_path} height="100%" alt="..."/>
            </div>
            <div className="list-content">
                <div className="content-title">
                    <h4>{list.title}</h4>
                    {list.tags.map((tag, idx) => (
                        <small className="tags" key={idx}>{tag}</small>
                    ))}
                </div>
                <div className="description">
                    <h5>Rating: {Stars()} {list.popularity}</h5>
                    <p><b>Overview</b>: {list.overview}</p>
                </div>
            </div>
        </div>
    )
}

export default CardList