import React, { useMemo } from 'react'
import { getHeroByPublisher } from '../../selectors/getHeroByPublisher'
import { HeroCard } from './HeroCard';
import PropTypes from 'prop-types';

export const HeroList = ({ publisher }) => {

    const hero = useMemo( () => getHeroByPublisher( publisher ), [ publisher ]);

    return (
        <div className="card-columns animate__animated animate__fadeInRight">
            {
                hero.map( hero => (
                    <HeroCard 
                        key={ hero.id }
                        { ...hero }
                    />
                ))
            }  
        </div>
    )
}

HeroList.propTypes = {
    publisher: PropTypes.string.isRequired
}
