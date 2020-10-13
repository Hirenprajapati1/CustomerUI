// import {jwtutility} from './jwtutility'
// import {isDevMode} from '@angular/core';

// declare var swal:any;
// declare var toastr:any;



// export class CommonFunc {

//     public static ErrorMessage:string="Internal error occured. please Contact your admin and try again.";

//     // public static GetUserType(){

//     //      if (sessionStorage.getItem("token")!=null) {

//     //         let userData=Jwtutility.GetDataFromToken((sessionStorage["token"]));
//     //         return userData["UserType"];
//     //       }else{
//     //           return null;
//     //       }
//     // }

//   //public static dateFormat = "mm/dd/yyyy";
//   //public static dateFormatForList = "MM/DD/YYYY";
//   public static dateFormat = "MM/DD/YYYY";

//     public static GetSalesRegions()
//     {
//         var salesRegions = sessionStorage.getItem("SalesRegions");
//         return salesRegions;        
//     }

//     public static GetUserType()
//     {
//         var userType = sessionStorage.getItem("UserType");
//         return userType;
//     }

//     public static GetLoginUserName(){

//         if (sessionStorage.getItem("token")!=null) {
//             let userData=jwtutility.GetDataFromToken((sessionStorage["Authtoken"]));
//             return userData["Name"];//userData["UserName"];
//         }else{
//             return null;
//         }


//     }

//     public static GetLoginUsrID(){
//         if (sessionStorage.getItem("token")!=null) {
//             let userData=Jwtutility.GetDataFromToken((sessionStorage["token"]))["Table"][0];
//             return userData["tid"];//userData["userid"];
//         }else{
//             return null;
//         }

//     }

//     public static GetAvateOFLoginUser(){
//         if (sessionStorage.getItem("token")!=null) {
//             let userData=Jwtutility.GetDataFromToken((sessionStorage["token"]));
//             let FullPath="/assets/Avtar/avatar"+userData["Avatar"]+".png"
//             return FullPath;
//         }else{
//             return null;
//         }
//     }

//     public static GetFullNameOfLoggedInUser(){
//         if (sessionStorage.getItem("Authtoken")!=null) {
//            let userData=Jwtutility.GetDataFromToken((sessionStorage["Authtoken"]));
//              return userData["name"];
//             // let t=userData["Table"][0];
//             // let fullname:string=t["FirstName"]+" "+t["LastName"];
//             //return fullname;
//             //return userData.Name;
//         }else{
//             return null;
//         }
//     }

//     public static GetLoggedInUser(){
//         if (sessionStorage.getItem("Authtoken")!=null) {
//             let userData=Jwtutility.GetDataFromToken((sessionStorage["token"]));
//             return userData;
//         }else{
//             return null;
//         }
//     }
//     // public static Menulist(){

//     //     if (localStorage.getItem("token2")!=null) {
//     //         let userData=Jwtutility.GetDataFromToken(localStorage["token2"]);
//     //         return userData["Table"];
//     //     }else{
//     //         return null;
//     //     }
//     // }

//     public static ShowLoader(){

//         let lnumber:number=Math.floor(Math.random()*(11-1+1)+1);

//         var img = document.createElement("img");
//      img.src="/assets/Loader/loader_"+lnumber+".GIF";



//     var tt=swal({
//       html: true,
//       title: "Please Wait....",
//       content: img,
//       buttons: false,
//       closeOnClickOutside:false,
//       closeOnEsc: false,
//       closeModal:false
//   });
//     }

//   public static ShowCreateDatabaseLoader() {
//     let lnumber: number = Math.floor(Math.random() * (11 - 1 + 1) + 1);

//     var img = document.createElement("img");
//     img.src = "/assets/Loader/loader_" + lnumber + ".GIF";



//     var tt = swal({
//       html: true,
//       title: "Please Wait..Database creation process may take some time",
//       content: img,
//       buttons: false,
//       closeOnClickOutside: false,
//       closeOnEsc: false,
//       closeModal: false
//     });
//   }



//     public static CloseLoader(DialogType,Message,Title=""){

//         setTimeout(() => {
//             if (swal.getState()["isOpen"]) {
//                 swal.close();
//             }

//             this.ShowDialog(DialogType,Message,Title);

//         }, 1000);
//     }

//     public static HideLoader(){
//         setTimeout(() => {
//             if (swal.getState()["isOpen"]) {
//                 swal.close();
//             }
//         }, 1000);
//     }

//     public static Logg(Message,AdditionalMessage=null){
//      if (isDevMode()) {
//       if(AdditionalMessage ==null){
//         console.log(Message);
//       }else{
//         console.log(Message,AdditionalMessage);
//       }
//      }
//     }

//     public static ShowDialog(_dgType,msg,title=""){
//         switch (_dgType) {
//             case DialogType.Error:
//                 swal("Oppssss...",msg,"error");
//                 break;

//             case DialogType.Success:
//                 swal("Success....!", "Operation Done Successfully.....!", "success");
//                 break;

//             case DialogType.ToastError:
//                 CommonFunc.ShowToast(title,msg,DialogType.ToastError);
//                 break;

//             case DialogType.ToastInfo:
//                 CommonFunc.ShowToast(title,msg,DialogType.ToastInfo);
//                 break;

//             case DialogType.ToastSuccess:
//                 CommonFunc.ShowToast(title,msg,DialogType.ToastSuccess);
//                 break;

//             case DialogType.ToastWarning:
//                 CommonFunc.ShowToast(title,msg,DialogType.ToastWarning);
//                 break;

//             case DialogType.ToastWaits:
//                 CommonFunc.ShowToast(title,msg,DialogType.ToastWaits);
//                 break;

//             default:
//                 break;
//         }
//     }

//     private static ShowToast(Title,Msg,type){

//         if (type==DialogType.ToastWaits) {
//             toastr.options = {
//                 timeOut: 0,
//                 "closeButton": false,
//                 "debug": false,
//                 "newestOnTop": true,
//                 "progressBar": false,
//                 "positionClass": "toast-top-right",
//                 "preventDuplicates": true,
//                 "onclick": null,
//                 "showDuration": "300",
//                 "hideDuration": "1000",
//                 "extendedTimeOut": "0",
//                 "showEasing": "swing",
//                 "hideEasing": "linear",
//                 "showMethod": "fadeIn",
//                 "hideMethod": "fadeOut",
//                 "tapToDismiss": false
//                 }
//         } else {
//             toastr.options = {
//                 timeOut: 5000,
//                 "closeButton": true,
//                 "debug": false,
//                 "newestOnTop": true,
//                 "progressBar": true,
//                 "positionClass": "toast-top-right",
//                 "preventDuplicates": true,
//                 "onclick": null,
//                 "showDuration": "300",
//                 "hideDuration": "1000",
//                 "extendedTimeOut": "2500",
//                 "showEasing": "swing",
//                 "hideEasing": "linear",
//                 "showMethod": "fadeIn",
//                 "hideMethod": "fadeOut",
//                 "tapToDismiss": false

//             }
//         }



//         switch (type) {

//             case DialogType.ToastSuccess:
//             toastr.success(Msg,Title);
//                 break;

//             case DialogType.ToastInfo:
//             toastr.info(Msg,Title);
//                 break;

//             case DialogType.ToastWarning:
//             toastr.warning(Msg,Title);
//                 break;

//             case DialogType.ToastError:
//             toastr.error(Msg,Title);
//                 break;

//             case DialogType.ToastWaits:
//             toastr.info(Msg,Title);
//                 break;

//             default:
//                 break;
//         }


//     }

//   public static scrollTo(elementList): void {
//     //const elementList = document.querySelectorAll(refName);
//     const element = elementList[0] as HTMLElement;
//     element.scrollIntoView({ behavior: 'smooth' });
//   }


//     public static ShowDecisionDialog(title="Are you sure?",text="Are you sure you want to perform this Action!"){
//       return new Promise (resolve =>{
//        swal({
//         title: title,
//         text: text,
//         icon: "warning",
//         buttons: true,
//         dangerMode: true,
//       })
//       .then((willDelete) => {
//         if (willDelete) {
//           resolve(true);
//         } else {
//           resolve(false);
//         }
//       });
//     });
//     }

//     public static ClearToast(){
//         toastr.clear();
//     }

//     public static ShowErrorMessage(){
//         swal("Error","Some error occured. please Contact your admin and try again.","error");
//     }

//     public static ShowWaitMsg(){
//         this.ShowDialog(DialogType.ToastWaits,"Please Wait.....");
//     }

//     public static ShowUnderConstructionMessage(){
//         this.ShowDialog(DialogType.ToastInfo,"Either you are not authorize or this feature is in working... Cool right?","Awesome...")
//     }

//     public static CheckForNull(variable){
//         if (variable==null || variable==undefined || variable=="") {
//             return true;
//         } else {
//             return false;
//         }
//     }

//     public static validatePhone(phone) {
//         var error = "";
//         var stripped = phone.replace(/[\(\)\.\-\ ]/g, '');

//        if (stripped == "") {
//             error = "You didn't enter a phone number.";
//         } else if (isNaN(stripped)) {
//             phone = "";
//             error = "The phone number contains illegal characters.";

//         } else if (!(stripped.length == 10)) {
//             phone = "";
//             error = "The phone number is the wrong length. Make sure you Enter Valid one.";
//         }
//         return error;
//     }

// }

// export enum DialogType{
//     None,
//     Success,
//     Error,
//     ToastSuccess,
//     ToastError,
//     ToastInfo,
//     ToastWarning,
//     ToastWaits
// }
