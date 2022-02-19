import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import Moment from 'moment'

function Restaurant(){
    const [restaurant, setRestaurant] = useState(null)
    const [Loading, setLoading] = useState(true);
    let { id } = useParams();

    useEffect(()=>{
        setLoading(true);
        fetch(`https://fast-sea-25287.herokuapp.com/api/restaurants/${id}`)
        .then(response=>response.json())
        .then(data=>{
            setLoading(false);
            if(data.hasOwnProperty("_id")){
                setRestaurant(data);
            }else{
                setRestaurant(null);
            }
        })
    }, [id]);

    return (
        <>
        {Loading ? (
            <>
            <br />
            <Card bg="light">
                <Card.Body>
                <Card.Text>Loading Restaurants...</Card.Text>
                </Card.Body>
            </Card>
            </>
        ) : restaurant ?(
          <>
            <br />
            <Card>
                <Card.Header>
                    <h5>{restaurant.name}</h5>
                    {restaurant.address.building} {restaurant.address.street}
                </Card.Header>
            </Card>
            <br />
            <MapContainer style={{"height": "400px"}} center={[restaurant.address.coord[1], restaurant.address.coord[0]]} zoom={13} scrollWheelZoom={false}> 
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> 
                <Marker position={[ restaurant.address.coord[1], restaurant.address.coord[0]]}></Marker> 
            </MapContainer>
            <br />
            <h4>Ratings</h4>
            <hr />
            <CardDeck>
              {restaurant.grades.map((grade, index) => {
                return (
                  <Card key={index}>
                    <Card.Header>
                      <h5>Grade: {grade.grade}</h5>
                    </Card.Header>
                    <Card.Body>
                      Completed: {Moment(grade.date).format("M/D/YYYY")}
                    </Card.Body>
                  </Card>
                );
              })}
            </CardDeck>
            </>
        ) : (
            <>
            <br />
            <Card bg="light">
                <Card.Body>
                <Card.Text>Unable to find Restaurant with id : {id}</Card.Text>
                </Card.Body>
            </Card>
          </>
        )}
    </>
    );
}

export default Restaurant;


