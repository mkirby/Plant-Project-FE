import React from 'react'

function PlantCard({ plant }) {
  return (
    <div className="plant-card">
      <h3>{plant.common_name}</h3>
      <p>Scientific Name: ({plant.scientific_name})</p>
      <p>Genus: {plant.genus}</p>
      <p>Slug: {plant.slug}</p>
    </div>
  )
}

export default PlantCard