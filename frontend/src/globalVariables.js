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
    filter:null,
    findLicense:"",
    
    deleteLicense: async()=>{},
    createLicense: async()=>{
        const {addLicenseOwnerGmail, licenseType, licenseCreateAmmount, expirationDate} = get();
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
                //TODO: refresh event call here
            })
            .catch(err=>{
                console.log(err);
            })
        }
    },
    loginEvent: async()=>{},
    logoutEvent: async()=>{},
    refreshEvent: async()=>{},
    filterEvent: async()=>{},
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
}))