import React from 'react';
import '@coreui/coreui/dist/css/coreui.min.css'
import "./CSS/Grimoire.css"
import { CCarousel, CCarouselCaption, CCarouselItem, CImage } from '@coreui/react'
import ISpell from '../types/ISpell';
import { fetchAllSpells } from '../services/spellService';
import ESpellTypes from '../types/ESpellType';
import ESpellAffinities from '../types/ESpellAffinity';

export const Grimoire = () => {

    let spellList : ISpell[];
    //spellList = await fetchAllSpells();

    spellList = [
      {
        id: 1,
        name: 'Flame Burst',
        description: 'Unleashes a burst of flames that engulfs enemies.',
        dmg: 75,
        type: ESpellTypes.AILMENT,
        affinity: ESpellAffinities.FIRE,
        difficulty: 3,
      },
      {
        id: 2,
        name: 'Aqua Shield',
        description: 'Creates a water barrier to block incoming attacks.',
        dmg: 0,
        type: ESpellTypes.ATTACK,
        affinity: ESpellAffinities.NEUTRAL,
        difficulty: 2,
      },
      {
        id: 3,
        name: 'Stone Spike',
        description: 'Summons a sharp spike of earth to impale enemies.',
        dmg: 90,
        type: ESpellTypes.HEAL,
        affinity: ESpellAffinities.FIRE,
        difficulty: 4,
      },
      {
        id: 4,
        name: 'Gale Force',
        description: 'Releases a powerful gust of wind to knock back enemies.',
        dmg: 50,
        type: ESpellTypes.AILMENT,
        affinity: ESpellAffinities.NEUTRAL,
        difficulty: 3,
      },
      {
        id: 5,
        name: 'Radiant Heal',
        description: 'A bright light restores health to allies.',
        dmg: 0,
        type: ESpellTypes.DEFENCE,
        affinity: ESpellAffinities.WIND,
        difficulty: 2,
      },]

    return (
      <div className="container">
        <CCarousel controls indicators dark interval={false} className="c-carousel">
        {spellList.map((item) => (
          <CCarouselItem key={item.id}>
            {/* <CImage className="d-block w-100 c-image" src={"/images/"+item.name+".mp4"} /> */}
            <CImage className="d-block w-100 c-image" src={"/images/patronus.jpg"} />
            <CCarouselCaption className="d-none d-md-block ccarousel-caption">
              <h5> {item.name}</h5>
              <p>{item.description}</p>
              <p>Type : {item.type}</p>
              <p>Affinity : {item.affinity}</p>
              <p>Damage : {item.dmg}</p>
              <p>Difficulty : {item.difficulty}</p>
            </CCarouselCaption>
          </CCarouselItem>
      ))}
        </CCarousel>
      </div>
    )
  }