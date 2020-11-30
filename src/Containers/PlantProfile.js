import React from 'react'

function PlantProfile({ plant }) {
    const plantNamesArray = plant.main_species.common_names.en.map(name => {
        return <li>{name}</li>
    })
      
      const plantNativeTo = plant.main_species.distribution.native.map(locale => {
            return <li>{locale}</li>
        })
        
      
    return (
        <>
        {plant.img_url ? <img src={plant.img_url} alt={plant.common_name} width="200" /> : null}
        <h3>{plant.common_name}</h3>
        <p>Scientific Name: ({plant.scientific_name})</p>
        <p>Genus: {plant.genus}</p>
        <p>Year discovered: {plant.year}</p>
        
        <h4>Common names</h4>
            <ul>
            {plantNamesArray}
            </ul>
          
        <h4>Native to</h4>
            <ul>
                {plantNativeTo}
            </ul>
        </>
    )
}
    
export default PlantProfile