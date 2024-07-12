import React, { useEffect, useState } from 'react'

const DataTable = () => {

  const [formData ,setformData] = useState({name:"", gender:"", age:""});
  const [data, setData] = useState([]);
  const [editId, seteditId] = useState(false);
  const [searchTerm, setsearchTerm] = useState("");
  const [currentPage, setcurrentPage] = useState(1);
  const itemsPerPage = 5;
  const LastItem = currentPage * itemsPerPage ;
  const indexOfFirstItem = LastItem - itemsPerPage;
  const filteredItems = data.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredData = filteredItems.slice(indexOfFirstItem, LastItem);

  useEffect(() =>{
    setcurrentPage(1);
  },[searchTerm]);

  useEffect(() => {
    if(!editId) return;
    let selectedItem = document.querySelectorAll(`[id='${editId}']`);
    selectedItem[0].focus();
  }, [editId]);

  const handleInputChange = (e) =>{
    setformData({...formData, [e.target.name]: e.target.value});
  };

  const handleAddClick = () => {
    if(formData.name && formData.gender && formData.age){
      const newItem = {
        id:Date.now(),
        name:formData.name,
        gender:formData.gender,
        age:formData.age,
      };
      setData([...data, newItem]);
      setformData({name:"", gender:"", age:""});
    }
  };

  const handleDelete = (id) =>{
    if(filteredData.length === 1 && currentPage !== 1){
      setcurrentPage((prev) => prev-1);
    }
    const updateList = data.filter((item) => item.id!== id);
    setData(updateList);
  }

  const handleEdit = (id, updatedData) => {
    if(!editId || editId !== id){
      return
    }
    const updatedList = data.map((item) => item.id === id ? {...item, ...updatedData} : item );
    setData(updatedList);
  };

  const handleSearch = (e) => {
    setsearchTerm(e.target.value)
  };

  const paginate = (pageNumber) => {
    setcurrentPage(pageNumber);
  }
  return (
    <div className='container'>
        <div className='add-container'>
            <div className='info-container'></div>
            <input
            type='text'
            placeholder='Name'
            name='name'
            value={formData.name}
            onChange={handleInputChange}
            />

            <input
            type='text'
            placeholder='Gender'
            name='gender'
            value={formData.gender}
            onChange={handleInputChange}
            />

            <input
            type='text'
            placeholder='Age'
            name='age'
            value={formData.age}
            onChange={handleInputChange}
            />

            <button className='add' onClick={handleAddClick}>Add</button>
        </div>

        <div className='search-table-container'>
            <input
            type='text'
            placeholder='Search by name'
            value={searchTerm}
            onChange={handleSearch}
            className='search-input'
            />

            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Age</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                  {
                    filteredData.map((item) => (
                    <tr key={item.id}>
                        <td id={item.id} contentEditable = {editId === item.id} onBlur={(e) => handleEdit(item.id, {name:e.target.innerText})}>{item.name}</td>
                        <td id={item.id} contentEditable = {editId === item.id} onBlur={(e) => handleEdit(item.id, {gender:e.target.innerText})}>{item.gender}</td>
                        <td id={item.id} contentEditable = {editId === item.id} onBlur={(e) => handleEdit(item.id, {age:e.target.innerText})}>{item.age}</td>
                        <td className='action'>
                            <button className='edit' onClick={() => seteditId(item.id)}>Edit</button>
                            <button className='delete' onClick={ () => handleDelete(item.id)}>Delete</button>
                        </td>
                    </tr>
                ))
              }
              </tbody>
            </table>

            <div className='pagination'>
              {
                Array.from({length: Math.ceil(filteredItems.length / itemsPerPage)}, (_,index) => (
                  <button key={index+1} onClick={() => paginate(index + 1)} 
                  style={{backgroundcolor: currentPage === index+1 && "lightgreen"}}>
                  {index+1}
                  </button>
                ))
              }
            </div>
        </div>
    </div>
  )
}

export default DataTable;