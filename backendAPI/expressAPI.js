// Import required modules
import path from "path";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
//const mongoose = require('mongoose');

dotenv.config();
import { fileURLToPath } from 'url';
// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
// 
//if (process.env.NODE_ENV==="production"){
  console.log("production mode");
  const frontendPath = path.join(__dirname, '..', 'frontend', 'dist');
  app.use(express.static(frontendPath));
  //app.get("*",(req,res)=>{res.sendFile(path.join(frontendPath, 'index.html'));});
  //for reasons, this chokes the routes
//}

//app.use(express.static('dist')); //frontend

//handles login request
app.post('/API/login',async (req, res) =>{
  const{username, password}=req.body;
  console.log(req.body);
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
app.get('/API/license/list', async(req,res)=>{
  try{
    const data = await LicenseListModel.find({}).sort({dateExpired:1});
    console.log("responding");
    res.status(200).json(data);
  } catch (error){
    console.error(error);
  }
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
  const {addLicenseOwnerGmail, licenseType, creationDate, formattedExpirationDate, licenseCreateAmmount} = req.body;
  if(licenseCreateAmmount <= 1){
    await LicenseListModel.create({userGmail: addLicenseOwnerGmail, dateCreated: creationDate, dateExpired: formattedExpirationDate, licenseType: licenseType}).then((data)=>{
      res.status(200).json("created");
    }).catch(error => {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    });
  } else {
    const multipleLicense =Array(licenseCreateAmmount).fill({userGmail: addLicenseOwnerGmail, dateCreated: creationDate, dateExpired: formattedExpirationDate, licenseType: licenseType});
    await LicenseListModel.insertMany(multipleLicense).then((data)=>{res.status(200).json("created");}).catch(error =>{
      res.status(400).json({success: false, message: error.message,});
    });

  }

})

//Allows to search license
app.get('/API/license/searchWho/:username', async (req,res)=>{
  const username = req.params.username;
  if(!username){
    return res.status(400).json({ error: 'Username is required' });
  }
  await LicenseListModel.find({userGmail: {$regex: username, $options: 'i'}}).sort({dateExpired:1}).then((result)=>{
    if(!result.length){
      return res.status(400).json({message: "doesnt exist"});
    } 
    res.status(200).json(result);
  }).catch(error =>{
    res.status(400).json({message: "doesnt exist"});
    console.error(error);
  })})


//Allows to search based on license type
app.get('/API/license/searchWhat/:type', async (req,res)=>{
  const type = req.params.type;
  if(!type){
    await LicenseListModel.find({}).sort({dateExpired:1}).then((documents)=>{
      res.status(200).json(documents);
    }).catch((error)=>{
      console.error(error);
    })
  } else{    
    await LicenseListModel.find({licenseType: type}).sort({dateExpired:1}).then((result)=>{
      if(!result){
        return res.status(200).json("no license found");
      }else{
        res.status(200).json(result);
      }
    }).catch(error =>{
      console.error(error);
    })
  }

})
app.listen(process.env.PORT); //Listens to port