import React, { useEffect, useState } from 'react';
import '@coreui/coreui/dist/css/coreui.min.css'
import "./CSS/Grimoire.css"
import { CCarousel, CCarouselCaption, CCarouselItem, CImage } from '@coreui/react'
import ISpell from '../types/ISpell';
import { fetchAllSpells } from '../services/spellService';

export const Grimoire = () => {
    const [spellList, setSpellList] = useState<ISpell[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchAllSpells();
                setSpellList(result);
            } catch (err) {
                setError('Erreur lors de la récupération des sorts');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    
    if (loading) {
        return <div>Book enchanting...</div>;
    }
    if (error) {
        return <div>{error}</div>;
    }
      
    return (
      <div className="container">
        <CCarousel controls indicators dark interval={false} className="c-carousel">
        {spellList && spellList.length > 0 && spellList.map((item) => (
          <CCarouselItem key={item.id}>
            <CImage className="d-block w-100 c-image" src={"https://img2.wallspic.com/crops/3/1/8/7/5/157813/157813-foret_magique-fee-foret-magie-atmosphere-3840x2160.jpg"} />
            <CCarouselCaption className="d-none d-md-block ccarousel-caption">
              <img 
                  className="w-100 tuto" 
                  src={`/carousel/${item?.name?.toLowerCase() || "default"}.gif`} 
                  alt={`${item?.name || "ascendio"} animation`} 
              />
              <h5> {item.name}</h5>
              <p>{item.description}</p>
              <p>Type : {item.type}</p>
              <p>Affinity : {item.affinity}</p>
              <p>Damage : {item.damage}</p>
              <p>Difficulty : {item.difficulty}</p>
            </CCarouselCaption>
          </CCarouselItem>
      ))}
        </CCarousel>
      </div>
    )
  }