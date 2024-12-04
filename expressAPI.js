// Import required modules
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
//Express init
const app = express();

// Use middleware to parse JSON and handle CORS (allow requests from React frontend)
app.use(express.json());                          //Parse data to JSON so I dont have to every request
/*--------------------------------MONGODB------------------------------------------------------------------------------ */
mongoose.connect(process.env.MONG_URI);

const loginSchema = new mongoose.Schema({username: String, password: String});
const LoginModel = new mongoose.model("LoginModel", loginSchema, "loginCollection");

const licenseListSchema = new mongoose.Schema({userGmail: String, dateCreated: Date, dateExpired: Date, licenseType: String});
const LicenseListModel = new mongoose.model("licenseListModel", licenseListSchema, "licenseCollection" );

/*--------------------------------HANDLES REQUEST---------------------------------------------------------------------- */
// Handles base request, delete once done
app.use(express.static('dist'));
app.get('/API/', async (req, res) =>{
  LoginModel.findOne().then( user => {
    res.json(user);
  })
  //TODO:Delete after test 
});

//handles login request
app.post('/API/login',async (req, res) =>{
  const{username, password}=req.body;
  //checks for users and if it exist
  LoginModel.findOne({username: username})
  .then(user =>{
    if(user){
      if(user.password===password){
        res.json("success");
      } else{
        res.json("incorrect credentials");
      }
    } else{
      res.json("incorrect credentials");
    }
  }
  )


});

//Gets license list
app.get('/API/license/list', (req,res)=>{
  LicenseListModel.find({}).sort({dateExpired:1}).then((documents)=>{
    res.json(documents);
  }).catch((error)=>{
    console.error(error);
  })
});

//Deletes license
app.delete('/API/license/delete/:id', async (req, res)=>{
  const id = req.params.id;
  await LicenseListModel.findByIdAndDelete(id).then(()=>{
    //returns the list after delete
    LicenseListModel.find({}).sort({dateExpired:1}).then((documents)=>{
      res.json(documents);
    }).catch((error)=>{
      console.error(error);
    })
  })
})

//allows to add new license
app.post('/API/create/license', async (req, res)=>{
  const {gmail, licenseType, creationDate, formattedExpirationDate} = req.body;
  await LicenseListModel.create({userGmail: gmail, dateCreated: creationDate, dateExpired: formattedExpirationDate, licenseType: licenseType}).then((data)=>{
    res.status(200).json("created");
  }).catch(error => {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  });
})
//Allows to search license
app.get('/API/license/searchWho/:username', async (req,res)=>{
  const username = req.params.username;
  if(!username){
    return res.status(400).json({ error: 'Username is required' });
  }
  await LicenseListModel.find({userGmail: username}).sort({dateExpired:1}).then((result)=>{
    if(!result){
      return res.status(200).json("hello");
    }
    res.status(200).json(result);
  }).catch(error =>{
    console.error(error);
  })})

//Allows to search based on license type
app.get('/API/license/searchWhat/:type', async (req,res)=>{
  const type = req.params.type;
  if(!type){
    return res.status(400).json({ error: 'huh' });
  }
  await LicenseListModel.find({licenseType: type}).sort({dateExpired:1}).then((result)=>{
    if(!result){
      return res.status(200).json("hello");
    }else{
      res.status(200).json(result);
    }
  }).catch(error =>{
    console.error(error);
  })

})
app.listen(process.env.PORT); //Listens to port