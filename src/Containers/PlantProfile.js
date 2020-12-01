import React from 'react'

class PlantProfile extends React.Component {
    state = {
        plant: null
    }

    componentDidMount() {
        const token = localStorage.getItem("token")
        fetch(`http://localhost:3000/api/v1/search/${this.props.slug}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(d => this.setState({plant: d.api_data.data}))
    }

    render() {
        const plant = this.state.plant
        console.log(plant)
        return (
            <>
                {this.state.plant ? 
                    <div id="plant-profile">
                        {plant.image_url ? <img src={plant.image_url} alt={plant.common_name} width="200" /> : null}
                        <h3>{plant.common_name}</h3>
                        <p>Scientific Name: {plant.scientific_name}</p>
                        {plant.genus ? <p>Genus: {plant.genus.name}</p> : null }
                        {plant.family ? <p>Family: {plant.family.name}</p> : null }
                        {plant.year ? <p>Year discovered: {plant.year}</p> : null }
                        
                        { plant.main_species ?
                            <>
                                <h4>Common names</h4>
                                <ul>
                                    {this.renderPlantNames()}
                                </ul>
                            </>
                        :
                            null }
                        { plant.main_species ?    
                            <>
                                <h4>Native to</h4>
                                <ul>
                                    {this.renderplantNativeTo()}
                                </ul>
                            </>
                        :
                            null }
                    </div>
                :
                <p>Loading...</p> }
            </>
        )
    }

    renderPlantNames = () => {
        return this.state.plant.main_species.common_names.en.map((name, index) => <li key={index}>{name}</li>)
    }

    renderplantNativeTo = () => {
        return this.state.plant.main_species.distribution.native.map((locale, index) => <li key={index}>{locale}</li>)
    } 
}
    
export default PlantProfile