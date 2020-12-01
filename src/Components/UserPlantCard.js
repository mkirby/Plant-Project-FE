import React from 'react'

function UserPlantCard(props) {
  const plantData = props.plant.plant
  return (
    <div className="plant-card">
      <p>User Plant Card: "{props.nickname}"</p>
      {/* <h3>{plant.common_name}</h3>
      <p>Scientific Name: ({plant.scientific_name})</p>
      <p>Genus: {plant.genus}</p>
      <p>Slug: {plant.slug}</p> */}
    </div>
  )
}

export default UserPlantCard