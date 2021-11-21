import React, { useMemo } from 'react'
import { Navigate, useParams, useNavigate } from 'react-router-dom'
import { heroImages } from '../../helpers/heroImages';
import { getHeroById } from '../../selectors/getHeroById';

const HeroScreen = () => {

    const { heroeId } = useParams();
    const navigate = useNavigate()

    const hero = useMemo(() => getHeroById(heroeId), [ heroeId ]);

    if(!hero) {
        return <Navigate to='/' />
    }

    const {
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters
    } = hero;

    const handleReturn = () => {
        navigate( -1 );
    }

    return (
        <div className="row mt-5">
            <div className="col-4">
                <img 
                    // src={ `../assets/heroes/${ heroeId }.jpg` }
                    src={ heroImages(`./${ heroeId }.jpg`).default }
                    alt={ superhero }
                    className="img-thumbnail animate__animated animate__fadeInLeft"
                />
            </div>

            <div className="col-8 animate__animated animate__fadeIn">
                <h3> { superhero } </h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"> <b> Alter ego: </b> { alter_ego } </li>
                    <li className="list-group-item"> <b> Publisher: </b> { publisher } </li>
                    <li className="list-group-item"> <b> First appearance: </b> { first_appearance } </li>
                </ul>

                <h5> Characters </h5>
                <p> { characters } </p>

                <button 
                    className="btn btn-outline-info"
                    onClick={ handleReturn }
                >
                    Return
                </button>

            </div>

        </div>
    )
}

export default HeroScreen
