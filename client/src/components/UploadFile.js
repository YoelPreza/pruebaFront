import React, { useState } from 'react';
import { read, utils } from 'xlsx';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Upload.scss'

function UploadFile() {

  const [jsonData, setJsonData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const workbook = read(e.target.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = utils.sheet_to_json(sheet)?.map(item => {
        // console.log(utils.sheet_to_json(sheet))
        // console.log(item.)
        const newItem = {};
        Object.keys(item).forEach(key => {
// console.log(Object.keys(item)[0])
          newItem[key.toLowerCase().replace(/\s+/g, '_')] = item[key];
        });
        newItem.date = convertExcelDate(item.Date);
        newItem.punch_in = convertTime(item['Punch In']);
        newItem.punch_out = convertTime(item['Punch Out']);
        // console.log(newItem)
        return newItem;
      });
      setJsonData(jsonData);

    };
    reader.readAsBinaryString(file);
  };

  const handleFileSubmit = () => {
    axios.post('http://localhost:4000/insert-datos', jsonData)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };


  function convertExcelDate(excelDate) {

  const date = new Date((excelDate - 25568) * 86400 * 1000);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
   
  }
  
  const convertTime = (serialTime) => {
  const hours = Math.floor(serialTime * 24);
  // console.log(hours)
  const minutes = Math.round((serialTime * 24 - hours) * 60);
  // console.log((serialTime * 24 - hours) * 60)

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

// console.log(jsonData)
  return (
    <div className='container'>
    <div className='upload'>  
    <h1>Please Upload Your Excel File!</h1>
      <input className='input' type="file" accept=".xlsx" onChange={handleFileUpload} />
      <Link to={'/tasks/view'}>

      <button 
      className="boton"
      onClick={handleFileSubmit}>Subir archivo</button> 
      </Link>
    </div>
    </div>
  );

}

export default UploadFile;