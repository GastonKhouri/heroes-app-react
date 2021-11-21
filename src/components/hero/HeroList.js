import React, { useMemo } from 'react'
import { getHeroByPublisher } from '../../selectors/getHeroByPublisher'
import HeroCard from './HeroCard';

const HeroList = ({ publisher }) => {

    const heroes = useMemo(() => getHeroByPublisher(publisher), [ publisher ]);

    return (
        <div className='card-columns animate__animated animate__fadeIn'>
            {
                heroes.map(hero => (
                    <HeroCard 
                        key={ hero.id } 
                        { ...hero } 
                    />
                ))  
            } 
        </div>
    )
}

export default HeroList
