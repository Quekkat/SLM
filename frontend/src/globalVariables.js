import {create} from "zustand";
import axios from "axios";
export const useGlobalStore = create((set,get)=>({
    licenseList: [],
    licenseCreateAmmount: 1,
    addLicenseOwnerGmail:"",
    expirationDate:"",
    licenseType:"",
    activeLicense:0,
    expiredLicense:0,
    totalLicense:0,
    filter:"", //What license to filter
    findLicense:"", //the person
    loginName:"",
    loginPassword:"",
    respondResult:"",
    
    deleteLicense: async(id)=>{
        const {refreshEvent} = get();
        console.log('deleting-license-with-id:'+id);
        await axios.delete('API/license/delete/'+id)
        .then((response)=>{
          refreshEvent();
          console.log(response.data);
        })
        .catch((error)=>{
          //console.error(error);
        })
    },
    createLicense: async()=>{
        const {addLicenseOwnerGmail, licenseType, licenseCreateAmmount, expirationDate, refreshEvent} = get();
        const formattedExpirationDate = new Date(expirationDate).toISOString();
        const creationDate = new Date().toISOString();
        console.log(formattedExpirationDate);
        console.log(creationDate);
        if(licenseType==""){
            //TODO: toast warn to choose license
        }else{
            await axios.post('/API/create/license',{addLicenseOwnerGmail, licenseType, creationDate, formattedExpirationDate, licenseCreateAmmount })
            .then(result =>{
                console.log("license created");
                set({
                    addLicenseOwnerGmail:"",
                    licenseType:"",
                    expirationDate:"",
                    licenseCreateAmmount:1,
                });
                refreshEvent();
            }).catch(err=>{
                console.log(err);
            })
        }
    },
    loginEvent: async()=>{
        const {loginName, loginPassword} = get();
        await axios.post('/API/login', {username:loginName,password:loginPassword})
        .then(result =>{
            set({respondResult: result.data})
            console.log("Loginge: result is:", result.data);
        })
        .catch(err=>{
            console.log(err);
        })
    },

    refreshEvent: async()=>{
        console.log("refresh global event");
        try{
            await axios.get('/API/license/list')
            .then (response =>{
                set({licenseList: response.data});
                console.log("refresh global event: changing licenselist to res.data");
              }).catch(error => {
                //console.error(error);
              });
        }catch(error){
            console.log("refresh global event error");
        }
    },
    setFilterLicense:async (selected)=>{
        set({filter: selected});
        const {filter,refreshEvent} = get();
        if(filter==""){
            await refreshEvent();
        } else{
            await axios.get('/API/license/searchWhat/'+filter)
            .then(response=>{
                set({licenseList: response.data});
            });
        }
    },
    createAdminEvent: async()=>{},

    incrementAddLicense:()=>{
        set((state)=>({licenseCreateAmmount: state.licenseCreateAmmount + 1}));
    },

    decrementAddLicense:()=>{
        const {licenseCreateAmmount} = get();
        if(licenseCreateAmmount>1){
            set((state)=>({licenseCreateAmmount: state.licenseCreateAmmount -1}));
        }
    },

    setAddLicenseGmail:(gmail)=>{
        set({addLicenseOwnerGmail: gmail});
    },

    setExpirationDate:(expiration)=>{
        set({expirationDate: expiration});
    },

    setLicenseType:(licenseT)=>{
        set({licenseType: licenseT});
    },

    createAdminRouteButton: ()=>{
        navigate("/AdminPage");

    },
    setLoginName:(name)=>{
        set({loginName: name});

    },
    setLoginPassword:(password)=>{
        set({loginPassword: password});

    },

    setFindLicense: (value)=>{
        set({findLicense:value});
    },
    findLicenseEvent: async()=>{
        const {findLicense, refreshEvent} = get();
        if(findLicense ==""){
            await refreshEvent();
            console.log("empty");
        } else {
            try{
                console.log("fetching-license-event");
                const response = await axios.get('/API/license/searchWho/'+findLicense);
                set({licenseList: response.data});
                console.log(response.data);
            }catch(error){
                console.log("error");
                await refreshEvent();
            }
        }
    }
}))