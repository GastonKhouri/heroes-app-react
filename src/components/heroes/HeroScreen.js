import React, { useMemo } from 'react'
import { Redirect, useParams } from 'react-router'
import { getHeroById } from '../../selectors/getHeroById';

const heroImages = require.context('../../assets/heroes', true);

export const HeroScreen = ({ history }) => {

    const { heroId } = useParams();

    const hero = useMemo(() => getHeroById(heroId), [heroId]);

    if(!hero) {
        return <Redirect to="/" />
    }

    const handleReturn = () => {
        if(history.length <= 2) {
            history.push('/');
        } else {
            history.goBack();
        }
    }

    const { 
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters 
    } = hero;

    return (
        <div className="row mt-5">
            <div className="col-4">
                <img 
                    // src={ `../assets/heroes/${heroId}.jpg` } 
                    src={ heroImages(`./${heroId}.jpg`).default }
                    alt={ superhero }
                    className="img-thumbnail animate__animated animate__fadeInLeft"
                />
            </div>

            <div className="col-8">
                <h3> { superhero } </h3>
                <ul className="list-group list-group-flush animate__animated animate__fadeIn">
                    <li className="list-group-item">
                        <b> Alter ego: </b> { alter_ego }
                    </li>
                    <li className="list-group-item">
                        <b> Publisher: </b> { publisher }
                    </li>
                    <li className="list-group-item">
                        <b> First appearance: </b> { first_appearance }
                    </li>
                    <li className="list-group-item">
                        <b> Characters: </b> { characters }
                    </li>
                </ul>

                <br/>
                <button onClick={ handleReturn }
                        className="btn btn-outline-info">
                    Return
                </button>
            </div>
        </div>
    )
}
