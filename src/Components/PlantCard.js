import React from 'react'

function PlantCard({ plant }) {
  return (
    <>
      <h3>{plant.common_name}</h3>
      <p>Scientific Name: ({plant.scientific_name})</p>
      <p>Genus: {plant.genus}</p>
    </>
  )
}

export default PlantCard