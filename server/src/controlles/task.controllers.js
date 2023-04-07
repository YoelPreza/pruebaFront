const pool = require("../db");
const format = require('pg-format');

const postFile = async (req, res, next) => {
    const jsonData = req.body;
  
    const values = jsonData.map(({ user_id, user_name, date, punch_in, punch_out }) => {
      return [user_id, user_name, date, punch_in, punch_out];
    });
  
    try {
      const queryText = 'INSERT INTO task (user_id, user_name, date, punch_in, punch_out) VALUES %L RETURNING *';
      const result = await pool.query(format(queryText, values));
      res.json(result.rows);
    } catch (error) {
      next(error);
    }
  };


// const postFile = async (req, res, next) => {
//     const values = jsonData.map(({ user_id, user_name, date, punch_in, punch_out }) => {
//         return [user_id, user_name, date, punch_in, punch_out];
//       });
      
//       // Ejecutar la consulta SQL
//       const query = {
//         text: 'INSERT INTO task (user_id, user_name, date, punch_in, punch_out) VALUES ($1, $2, $3, $4, $5)',
//         values: values
//   };
// const postFile = async (req, res, next) => {
//     const jsonData = req.body;
  
//     // Convierte cada objeto del array JSON en un array con los valores correspondientes
//     const values = jsonData.map(({ user_id, user_name, date, punch_in, punch_out }) => {
//       return [user_id, user_name, date, punch_in, punch_out];
//     });
  
//     try {
//       // Usa el método multirow para insertar varias filas a la vez
//       const query = format('INSERT INTO task (user_id, user_name, date, punch_in, punch_out) VALUES %L RETURNING *', values);
//       const result = await pool.query(query);
  
//       res.json(result.rows);
//     } catch (error) {
//       next(error);
//     }
//   };
// const postFile = async (req, res, next) => {
//         const jsonData = req.body;
        
//         const values = jsonData.map(({ user_id, user_name, date, punch_in, punch_out }) => {
//             return [user_id, user_name, date, punch_in, punch_out];
//         });
        

//         try {
//             const result = await pool.query('INSERT INTO task (user_id, user_name, date, punch_in, punch_out) VALUES ($1, $2, $3, $4, $5) RETURNING *', values);
//             res.json(result.rows[0]);
//         } catch (error) {
//             next(error)
//         }
//     };
    
    const postTask = async (req, res, next) => {
    
        const { user_id, user_name, date, punch_in, punch_out } = req.body
    
        try {
    
            const result = await pool.query(
                "INSERT INTO task (user_id, user_name, date, punch_in, punch_out) VALUES ($1, $2, $3, $4, $5) RETURNING *",
                [user_id, user_name, date, punch_in, punch_out]
            );
            res.json(result.rows[0]);
        } catch (error) {
            next(error)
        }
    }



const getAllTasks = async (req, res, next) => {
    try {
        const allTask = await pool.query("SELECT * FROM task");
        res.json(allTask.rows)
    } catch (error) {
        next(error)
    }
}

const getTask = async (req, res, next) => {

    try {
        const { id } = req.params
        const result = await pool.query("SELECT * FROM task WHERE id = $1", [id])

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "task not found" })
        }

        res.json(result.rows[0]);

    } catch (error) {
        next(error)
    }

}


const deleteTask = async (req, res, next) => {

    try {
        const { id } = req.params;

        const result = await pool.query("DELETE FROM task WHERE id = $1", [id])

        if (result.rowCount === 0)
            return res.status(404).json({
                message: "Task not found"
            })
        return res.sendStatus(204);
        
    } catch (error) {
        next(error)
    }
}

const updateTask = async (req, res, next) => {
   try {
    const { id } = req.params;
    const { user_id, user_name, date, punch_in, punch_out } = req.body;

    const result = await pool.query(
        "UPDATE task SET user_name = $1, date = $2, punch_in = $3, punch_out = $4, user_id = $5 WHERE id = $6 RETURNING *",
        [user_name, date, punch_in, punch_out, user_id, id])

    if (result.rows.length === 0)
        return res.status(404).json({
            message: "task not found"
        });

    return res.json(result.rows[0]);
   } catch (error) {
    next(error)
   }
}

module.exports = {
    postFile,
    getAllTasks,
    getTask,
    postTask,
    deleteTask,
    updateTask
};