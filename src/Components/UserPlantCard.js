import React from 'react'

function UserPlantCard(props) {
  const plantData = props.plant

  const removePlant = () => {
    const token = localStorage.getItem("token")
    console.log("plant id?", plantData.id)
    fetch(`http://localhost:3000/api/v1/user_plants/${plantData.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(resp => resp.json())
    .then(() => {
      console.log("user plant deleted")
      props.updateUser()
    })
  }

  return (
    <div className="plant-card">
      <p>Nickname: "{plantData.nickname}"</p>
      <p>plant id: {plantData.plant_id}</p>
      <p>slug: {plantData.plant.slug}</p>
      {/* <h3>{plant.common_name}</h3>
      <p>Scientific Name: ({plant.scientific_name})</p>
      <p>Genus: {plant.genus}</p>
      <p>Slug: {plant.slug}</p> */}
      <button onClick={removePlant}> Remove from Collection</button>
    </div>
  )
}

export default UserPlantCard