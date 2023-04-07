import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function TaskForm() {

  const [user, setUser] = useState({
    user_id: "",
    user_name: "",
    date: "",
    punch_in: "",
    punch_out: "",
  })

  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false);


  const navigate = useNavigate()
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      loadTask(params.id);
    }
  }, [params.id]);

  const loadTask = async (id) => {
    const res = await fetch("https://pruebaback.up.railway.app/tasks/" + id);
    const data = await res.json();
    setUser({ user_id: data.user_id, user_name: data.user_name, date: data.date, punch_in: data.punch_in, punch_out: data.punch_out });
    setEditing(true);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      if (editing) {
        const response = await fetch(
          "https://pruebaback.up.railway.app/tasks/" + params.id,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
          }
        );
        await response.json();
      } else {
        const response = await fetch('https://pruebaback.up.railway.app/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        })
        await response.json();
      }

      setLoading(false)
      navigate('/tasks/view')
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  return (

    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={3}>
        <Card
          sx={({ mt: 5 })}
          style={{
            padding: "1px"
          }}
        >
          <Typography varaiant='5' textAlign='center'> Create User </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant='filled'
                label='Id'
                sx={{
                  display: "bock",
                  margin: ".5rem 0"
                }}
                name="user_id"
                onChange={handleChange}
                value={user.user_id}
              />

              <TextField
                variant='filled'
                label='Name'
                sx={{
                  display: "bock",
                  margin: ".5rem 0"
                }}
                name="user_name"
                onChange={handleChange}
                value={user.user_name}

              />

              <TextField
                variant='filled'
                label='Date'
                sx={{
                  display: "bock",
                  margin: ".5rem 0"
                }}
                name="date"
                onChange={handleChange}
                value={user.date.slice(0, 10)}
              />

              <TextField
                variant='filled'
                label='Punch In'
                sx={{
                  display: "bock",
                  margin: ".5rem 0"
                }}
                name="punch_in"
                onChange={handleChange}
                value={user.punch_in}

              />

              <TextField
                variant='filled'
                label='Punch Out'
                sx={{
                  display: "bock",
                  margin: ".5rem 0"
                }}
                name="punch_out"
                onChange={handleChange}
                value={user.punch_out}

              />
              <Button variant='contained' color='primary' type='submit' disabled={!user.user_id || !user.user_name || !user.date || !user.punch_in || !user.punch_out}>
                {loading ? (
                  <CircularProgress />
                ) : (
                  "Save"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>

    </Grid>
  )
}
