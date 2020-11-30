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
        .then(d => this.setState({plant: d.api_data.data}, () => console.log(this.state.plant)))
    }

    render() {
        const plant = this.state.plant
        return (
            <>
                {this.state.plant ? 
                    <>
                        {plant.image_url ? <img src={plant.image_url} alt={plant.common_name} width="200" /> : null}
                        <h3>{plant.common_name}</h3>
                        <p>Scientific Name: ({plant.scientific_name})</p>
                        <p>Genus: {plant.main_species.genus}</p>
                        <p>Year discovered: {plant.year}</p>
                        
                        <h4>Common names</h4>
                            <ul>
                                {this.renderPlantNames()}
                            </ul>
                        
                        <h4>Native to</h4>
                            <ul>
                                {this.renderplantNativeTo()}
                            </ul>
                    </>
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