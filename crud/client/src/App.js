

import Axios from 'axios'
import { useEffect, useState } from 'react';
import './index.css'
// import Post from './ubdate'

function App() {
  const [user, setUser] = useState([])
  const [filter, setFilter] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [details, setDetails] = useState({ Name: "", Age: "", City: "" })

  // Filtering
  const Search = (e) => {
    const check = e.target.value.toLowerCase()
    const hello = user.filter((value) =>
      value.Name.toLowerCase().includes(check) || value.City.toLowerCase().includes(check) || value.Age.includes(check))
    setFilter(hello)
  }


  // PostData & Ubdate Data Axios
  const userAdd = async (e) => {

    e.preventDefault();
    if (details._id) {
      try {
        await Axios.put(`http://localhost:7000/Put/${details._id}`, details)

          .then((res) => {
            console.log(res)
          })
      }
      catch (error) {
        console.log(error)
      }
    }
    else {
      await Axios.post('http://localhost:7000/Post', details)
    }
    setIsOpen(false)
    fetch()
  }

  //For AddUser_Page 
  const addUser = async () => {
    setDetails({ Name: "", Age: "", City: "" })
    setIsOpen(true)
  }

  const value = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value })
  }
  //For Button
  const close = () => {
    setIsOpen(false)

  }
  // Get Data 
  const fetch = async () => {
    try {
      let get = await Axios.get('http://localhost:7000/Get')
        .then((res) => {
          setUser(res.data)
          setFilter(res.data)

        })
    }
    catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetch()
  }, [])


  //Ubdate_data
  const handleUbdate = (user) => {
    setIsOpen(true)
    setDetails(user)
    console.log(user);
  }

  // Delete Option 
  const handleDelete = async (id) => {
    const isConfirm = window.confirm("Are You sure Want to Delete")

    if (isConfirm) {
      try {
        await Axios.delete(`http://localhost:7000/Delete/${id}`)
        fetch();

      }
      catch (error) {
        console.log(error)
      }
    }
  }

  return (

    <div className='container'>
      <h3 style={{ marginTop: "50px" }}>CRUD Applications With React.js in Front-End & Node.js in Backend</h3>
      <div className='input-search'>
        <input type="search" placeholder=" Search" onChange={Search} />
        <button onClick={addUser} className='btn green'>Add User</button>
      </div>
    
        <table className='table'>
          <thead>
            <tr>
              <th>S.NO</th>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>

            {filter && filter.map((value, index) => {
              return (
                <tr key={value._id}>
                  <td>{index + 1}</td>
                  <td>{value.Name}</td>
                  <td>{value.Age}</td>
                  <td>{value.City}</td>
                  <td> <button className='btn green ' onClick={() => handleUbdate(value)}>Edit</button>  </td>
                  <td> <button className='btn red' onClick={() => handleDelete(value._id)}>Delete</button> </td>
                </tr>
              )
            })}



          </tbody>
        </table>

        {isOpen && (
          <div className='modal'>
            <div className='modal-content'>
              <span className='close' onClick={close}>&times;</span>
              <h2>User Record</h2>

              <div className='input-group'>
                <label htmlFor='Name'>Name </label>
                <input type='text' name='Name' value={details.Name} onChange={value} />
              </div>

              <div className='input-group'>
                <label htmlFor='Age'>Age</label>
                <input type='number' name='Age' value={details.Age} onChange={value} />
              </div>

              <div className='input-group'>
                <label htmlFor='City'>City </label>
                <input type='text' name='City' value={details.City} onChange={value} />
              </div>
             <div > <button onClick={userAdd} className='btn green btns'>Submit</button></div>
            </div>

          </div>
        )}
     
    </div>


  )
}

export default App;