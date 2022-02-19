import { useEffect, useState } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination'

function Restaurants(){
    const [restaurants, setRestaurants] = useState(null)
    const [page, setPage] = useState(1)
    const [Loading, setLoading] = useState(true);
    const perPage = 10;
    let location = useLocation();
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(location.search);
    let boroughName = urlParams.get("borough");

    
    useEffect(() => {
        if(boroughName==null){
        fetch(`https://fast-sea-25287.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}`)
        .then(response=>response.json())
        .then(data=>{setRestaurants(data.result);
            setLoading(false);
         })
        }
        else{
        fetch(`https://fast-sea-25287.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}&borough=${boroughName}`)
        .then(response=>response.json())
        .then(data=>{setRestaurants(data.result);
            setLoading(false);
        })
        }
    }, [boroughName, page]);

    function previousPage(){
        if(page>1)
        setPage(page=>page-1);
    }

    function nextPage(){
        setPage(page=>page+1);
    }

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
        ) : restaurants != null && restaurants.length > 0 ? (
          <>
            <Card>
            <Card.Header><h5>Restaurants list</h5>
            Full list of restaurants. Optionally sorted by borough</Card.Header>
            </Card>
            <br/>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Borough</th>
                  <th>Cuisine</th>
                </tr>
              </thead>
              <tbody>
                {restaurants.map((restaurant, index) => {
                  return (
                    <tr
                      key={index}
                      onClick={() => {
                        navigate(`/Restaurant/${restaurant._id}`);
                      }}
                    >
                      <td>{restaurant.name}</td>
                      <td>{restaurant.address.building} {restaurant.address.street}</td>
                      <td>{restaurant.borough}</td>
                      <td>{restaurant.cuisine}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
  
            <Pagination>
              <Pagination.Prev onClick={() => previousPage()} />
              <Pagination.Item>{page}</Pagination.Item>
              <Pagination.Next onClick={() => nextPage()} />
            </Pagination>
          </>
        ) : (
            <>
            <br />
            <Card bg="light">
                <Card.Body>
                <Card.Text>No Restaurants Found</Card.Text>
                </Card.Body>
            </Card>
            </>
        )}
      </>
    );
}

export default Restaurants;

// ----------------------------------------------------------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import { Card, Pagination, Table } from "react-bootstrap";
// import { useNavigate, useLocation } from "react-router-dom";

// function Restaurants() {
//   const [restaurants, setRestaurants] = useState(null);
//   const [page, setPage] = useState(1);
//   const [Loading, setLoading] = useState(true);
//   let location = useLocation();
//   const perPage = 10;
//   const urlParams = new URLSearchParams(location.search);

//   const Borough = urlParams.get("borough");

//   const navigate = useNavigate();
//   function previousPage() {
//     if (page > 1) {
//       setPage((page) => page - 1);
//     }
//   }

//   function nextPage() {
//     setPage((page) => page + 1);
//   }

//   useEffect(() => {
//     if (Borough == null) {
//       fetch(
//         `https://fast-sea-25287.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}`
//       )
//         .then((res) => res.json())
//         .then((data) => {
//           setRestaurants(data.result);
//           setLoading(false);
//         });
//     } else {
//       fetch(
//         `https://fast-sea-25287.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}&borough=${Borough}`
//       )
//         .then((res) => res.json())
//         .then((data) => {
//           setRestaurants(data.result);
//           setLoading(false);
//         });
//     }
//   }, [Borough, page]);

//   return (
//     <>
//       <Card bg="light">
//         <Card.Header>
//           <h5>Restaurants query: {Borough ? Borough : "None"}</h5>
//           Full list of restaurants. Optionally sorted by borough
//         </Card.Header>
//       </Card>
//       <br />
//       {Loading ? (
//         <Card bg="light">
//           <Card.Body>
//             <Card.Text>Loading Restaurants...</Card.Text>
//           </Card.Body>
//         </Card>
//       ) : restaurants != null && restaurants.length > 0 ? (
//         <>
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Address</th>
//                 <th>Borough</th>
//                 <th>Cuisine</th>
//               </tr>
//             </thead>
//             <tbody>
//               {restaurants.map((restaurant, index) => {
//                 return (
//                   <tr
//                     key={index}
//                     onClick={() => {
//                       navigate(`/Restaurant/${restaurant._id}`);
//                     }}
//                   >
//                     <td>{restaurant.name}</td>
//                     <td>
//                       {restaurant.address.building} {restaurant.address.street}
//                     </td>
//                     <td>{restaurant.borough}</td>
//                     <td>{restaurant.cuisine}</td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </Table>

//           <Pagination>
//             <Pagination.Prev onClick={() => previousPage()} />
//             <Pagination.Item>{page}</Pagination.Item>
//             <Pagination.Next onClick={() => nextPage()} />
//           </Pagination>
//         </>
//       ) : (
//         <Card bg="light">
//           <Card.Body>
//             <Card.Text>No Restaurants Found</Card.Text>
//           </Card.Body>
//         </Card>
//       )}
//     </>
//   );
// }

// export default Restaurants;


