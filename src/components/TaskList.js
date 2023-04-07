import { Card } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './TaskList.scss'

export default function TaskList() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const loadTasks = async () => {
    const response = await fetch('https://pruebaback.up.railway.app/tasks')
    const data = await response.json()
    setUser(data)
  }

  const handleDelete = async (id) => {
    try {
      await fetch(`https://pruebaback.up.railway.app/tasks/${id}`, {
        method: "DELETE",
      });
      setUser(user.filter((task) => task.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadTasks()
  }, [])
console.log("pase por el effect")
  return (
    <div className='mainContent'>
      <div className='content'>
        <div className='colums'>
          <span>Id</span>
          <span>Name</span>
          <span className='date'>Date</span>
          <span className='in'>Punch In</span>
          <span className='out'>Punch Out</span>
        </div>


        {user.map((user) => (
          <Card className='filas'>
            { }

            <div className='divFilas'>
              <span>{user.user_id} </span>
            </div>
            <div className='divFilasName'>
              <span> {user.user_name} </span>
            </div>
            <span> {user.date?.slice(0, 10)} </span>
            <span> {user.punch_in} </span>
            <span> {user.punch_out} </span>

            <div>
              <button
                className='botonEdit'
                onClick={() => navigate(`/tasks/${user.id}/edit`)}
              >
                Edit
              </button>
              <button
                className='boton'
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
            </div>

          </Card>
        ))}
      </div>
    </div>
  )
}
