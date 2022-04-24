var logs =  {
    "logins": function (){
        var form = document.forms[0];
        var selectElement = form.querySelector('#UserName');
        var selectElement1 = form.querySelector('#pwd');
        var selectedValue = selectElement.value;
        var selectedValue1 = selectElement1.value;
        console.log("tesg")
        console.log(selectedValue+" "+selectedValue1 )
       
     
      },
      "user": function (){
        var form = document.forms[0];
        var selectElement = form.querySelector('#UserName');
        var selectedValue = selectElement.value;
        console.log("tesg")
        console.log(selectedValue)
      
      },
  
  
  }




buttonElement1 = document.querySelector("#BTSubmit");
buttonElement1.addEventListener("click", function () {
 logs.logins();


});


buttonElement1 = document.querySelector("#UserName");
buttonElement1.addEventListener("click", function () {
 logs.user();


});