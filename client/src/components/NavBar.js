import React from 'react'
import movie from '../images/film.png'
import { Link } from 'react-router-dom'
import Ribbon from '../images/ribbon.png'


const NavBar = () => {
    return (
        <nav>
            <ul>
                <span>
                    <img id="film" src={movie} width="46px" alt="..." />
                    <li className="list"><Link to='/home/all'>All</Link></li>
                    <li className="list"><Link to='/home/movies'>Movies</Link></li>
                    <li><Link to='/home/series'>Series</Link></li>
                </span>
                <span className="logo">
                    <div className='the-font'>
                    <   h3>THE</h3>
                    </div>
                    <h1>LANCER</h1>
                    <span>
                        <h4>MOVIE</h4>
                    </span>
                </span>
                <span>
                    <li>
                        <Link to='/watch-list'>
                            <span>
                                <img src={Ribbon} alt="..." width="24px" />
                                <p>Watch List</p>
                            </span>
                        </Link>
                    </li>
                </span>
            </ul>
        </nav>
    )
}

export default NavBar