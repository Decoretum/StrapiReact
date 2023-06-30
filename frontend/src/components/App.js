import './App.css';

import {useLocation, Link} from 'react-router-dom'
import { useEffect } from 'react';
import { useState } from 'react';

import axios, * as others from 'axios'

axios.defaults.baseURL = 'http://localhost:1337'


function App() {
  const [data, setData] = useState([])
  useEffect(() => {
    axios('/api/restaurant/hello?populate=*')
    .then((res) => {
      let arr = res.data.data
      arr.forEach(element => {
        console.log(element.attributes.categories)
      });

      setData(res.data.data)
    })
  }, [])


  return (
    <div className="App">
      <Link to={'/restaurants'}> Restaurants! </Link> <br/><br/>
      <Link to={'/restaurants/new'}> Make New! </Link> <br/><br/>
      {
        data.map((datum) => {
          return (
            <>
              Restaurant ID:{datum.id} <br/>
              Name: {datum.attributes.Name} <br/>
              Description: {datum.attributes.Description} <br/><br/>
              {
                datum.attributes.categories.data.map((el) => {
                  return <> Category ID:{el.id}, <b>{el.attributes.Name}</b>, <span style={{marginLeft: '1vw'}}></span> </> 
                })
              }
              <br/><br/>
            </>
          )
        })
      }
    </div>
  );
}

export default App;
