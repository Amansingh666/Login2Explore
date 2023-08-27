
var connToken = "90931265|-31949327571041841|90960994";
var RelName = "Student-table";
var DBName = "Student-DB";
var IML = "/api/iml";
var IRL = "/api/irl";
var baseurl ="http://api.login2explore.com:5577" ;
$('#rollNo').focus();

function saveRecNo(jsonObj){
 var stData = JSON.parse(jsonObj.data);
 localStorage.setItem("recno",stData.rec_no);
}


function getRollNoAsJsonObj() {
   var rollno = $('#rollNo').val();
   var jsonStr={
       id : rollno
   };
   return JSON.stringify(jsonStr);
    
    
    
    
}

function fillData(jsonObj){
    saveRecNo(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $('#fullName').val(record.name);
    $('#class').val(record.stdclass);
    $('#birthDate').val(record.birthdate);
    $('#address').val(record.address);
    $('#enrollmentDate').val(record.enrollmentdate);
}


function validateData(){
    var rollno,name,Class,birthdate,address,enrollmentdate;
   rollno = $('#rollNo').val();
   name = $('#fullName').val();
   Class = $('#class').val();
   birthdate = $('#birthDate').val();
   address = $('#address').val();
   enrollmentdate = $('#enrollmentDate').val();
    if(rollno ===  ''){
        $('#rollNo').focus();
        return "";
    }
     if(name ===  ''){
       $('#fullName').focus();
        return "";
    }
     if(Class ===  ''){
        $('#class').focus();
        return "";
    }
     if(birthdate ===  ''){
        $('#birthDate').focus();
        return "";
    }
     if(address ===  ''){
        $('#address').focus();
        return "";
    }
     if(enrollmentdate ===  ''){
        $('#enrollmentDate').focus();
        return "";
    }
    
    
    var jsonStrObj = {
        Rollno : rollno,
        Fullname : name,
        Stdclass : Class,
        Birthdate : birthdate,
        Address : address,
        Enrollmentdate : enrollmentdate
    };
    return JSON.stringify(jsonStrObj);
    
}



function getId(){
   var rolljsonObj = getRollNoAsJsonObj();
   var getRequest = createGET_BY_KEYRequest(connToken,DBName,RelName,rolljsonObj);
    jQuery.ajaxSetup({async:false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest,baseurl,IRL);
    jQuery.ajaxSetup({async:true}); 
    if(resJsonObj.status === 400){
        $('#saveBtn').prop("disabled",false);
        $('#resetBtn').prop("disabled",false);
         $('#fullName').focus();
    }else if(resJsonObj.status === 200){
        $('#rollNo').prop("disabled",true);
        fillData(resJsonObj);
        $('#updateBtn').prop("disabled",false);
        $('#resetBtn').prop("disabled",false);
        $('#rollNo').focus();
        
    }
}



function resetForm(){
    $('#rollNo').val("");
    $('#fullName').val("");
    $('#class').val("");
    $('#birthDate').val("");
    $('#address').val("");
    $('#enrollmentDate').val("");
    $('#rollNo').prop("disabled",false);
    $('#saveBtn').prop("disabled",true);
    $('#updateBtn').prop("disabled",true);
    $('#resetBtn').prop("disabled",true);
    $('#rollNo').focus();
    
}


function saveData(){
    var jsonStrObj = validateData();
    if(jsonStrObj === ''){
        return ""; 
    }
    var putreq = createPUTRequest(connToken,jsonStrObj,DBName,RelName);
    jQuery.ajaxSetup({async:false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putreq,baseurl,IML);
    jQuery.ajaxSetup({async:true});
    resetForm();
    $('#rollNo').focus();
}

function updateData(){
    $('#updateBtn').prop("disabled",true);
    var jsonChg = validateData();
    var updatereq = createUPDATERecordRequest(connToken,jsonChg,DBName,RelName,localStorage.getItem("recno"));
    jQuery.ajaxSetup({async:false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updatereq,baseurl,IML);
    jQuery.ajaxSetup({async:true});
    resetForm();
    $('#rollNo').focus();
    
}