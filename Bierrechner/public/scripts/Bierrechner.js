///!!!!!!!_Test_Betrieb_!!!!!!!!!!!!///
///addWieselburger sendet zu Ort:FH
///addKaiser sendet zu Ort:Home
///getUserData empfängt { "firstName": "John", "lastName": "Doe" }


///changes 23.04.2202 Philipp
///add socket concept
/// socket listen on host 8080
/// ##ws

///changes 24.04.2202 Philipp
///Bug fix for Mobile Device addEventListener => after window.addEventListener load


///changes 24.04.2202 Philipp
///add IP find for finding Localhost => ipToServer 




console.log(window.location.hostname)
console.log(window.location.host)

const ipToServer = "http://" + window.location.host
console.log(ipToServer)
const ws = new WebSocket("ws://"+window.location.hostname+":8080");
ws.addEventListener("open", () => {
  console.log("We are connected");
  ws.send("How are you?");
});

ws.addEventListener('message', function (event) {
  console.log(event.data);
});

var Bierrechner = {
  "UserID": 9999,
  "UserJson": null,


  "addKaiser": function () {
    var serverKommunikation = new XMLHttpRequest();
    console.log("Kaiser +1")
    const bierKonsum = { "Art": "Kaiser", "User": 0, "Ort": "Home" }
    serverKommunikation.open("POST", ipToServer + "/drinkBier", true);
    serverKommunikation.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    serverKommunikation.send(JSON.stringify(bierKonsum));
  },
  "addWieselburger": function () {
    var serverKommunikation = new XMLHttpRequest();
    console.log("Wieselburger +1")
    const bierKonsum = { "Art": "Wieselburger", "User": 0, "Ort": "FH" }
    serverKommunikation.open("POST", ipToServer + "/drinkBier", true);
    serverKommunikation.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // Bierrechner.getUserData();
    serverKommunikation.send(JSON.stringify(bierKonsum));
    ws.send("I am drunk");
  },
  "getUserData": function () {
    var serverKommunikation = new XMLHttpRequest();

    serverKommunikation.addEventListener("load", function () {
      var jsonObjekt = JSON.parse(this.responseText);
      console.log(jsonObjekt)
    });
    serverKommunikation.open('POST', ipToServer + "/UserData");
    serverKommunikation.send();

  },


}



window.addEventListener('load', function () {
  buttonElement = document.querySelector("#BTWieselburger");

  buttonElement.addEventListener("click", function () {
    Bierrechner.addWieselburger();
  });

  buttonElement = document.querySelector("#BTKaiser");

  buttonElement.addEventListener("click", function () {
    Bierrechner.addKaiser();
  });
  Bierrechner.getUserData()
});

