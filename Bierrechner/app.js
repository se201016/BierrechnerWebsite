///!!!!!!!_Test_Betrieb_!!!!!!!!!!!!///


/*  changes
    changes 23.04.2202 Philipp
    addWieselburger sendet zu Ort:FH
    addKaiser sendet zu Ort:Home
    getUserData empfängt { "firstName": "John", "lastName": "Doe" }


    changes 23.04.2202 Philipp
    add socket concept
    ##wss.on => (function)
    ## wst=true => message send (Queue=>not implement)  
    WebSocket=> run on port 8080


    changes 23.04.2202 Philipp
    login error improvement 
    ##app.post('/user', (req, res) => {

    changes 24.04.2202 Philipp
    updateUser change input ** IndexUser => UserName 
    updateUser add ** user drinks assignment
    ##function updateUser(Getreank, UserName, Ort)
    to do check ** drink place available 


    changes 24.04.2202 Philipp
    change var x=>clientData
    change parameter transfer from **updateUser(x.Art, x.User, x.Ort) => updateUser(clientData.Art, req.session.user, clientData.Ort)
    app.post("/drinkBier", function (req, res) {



    changes 24.04.2202 Philipp
    BUG wrong Name after Server restart on Client fixed  => var user = {firstName: req.session.user,
    app.get('/', (req, res) => {

    changes 24.04.2202 Philipp
    add Helper functions clearAllSession()
    activate clearAllSession() by Server Startup

    changes 24.04.2202 Philipp
    Structuring code
*/


///require Modules
const fs = require("fs")
const path = require('path')
const bodyParser = require('body-parser')
const WebSocketServer = require('ws');
const express = require('express')
const session = require("express-session")// Importing express-session module
const filestore = require("session-file-store")(session)// Importing file-store module



///Const variable
const sessionsFolder = './sessions';
const pathToJSONFile = 'test.json'
const app = express()
const port = 3000
const oneDay = 1000 * 60 * 60 * 24;
const wss = new WebSocketServer.Server({ port: 8080 })// Creating a new websocket server



///variables
var wst = false



///set ejs engine
app.set('view engine', 'ejs')


///clear old Sessions from server
clearAllSession()




/// Creating connection using websocket
wss.on("connection", function connection(ws, req) {
    console.log("new client connected");
    const ip = req.socket.remoteAddress;
    req.socket.po
    console.log("our ip", ip)
    // sending message
    ws.on("message", data => {
        console.log(`Client has sent us: ${data}`)
    });

    // handling what to do when clients disconnects from server
    ws.on("close", () => {
        console.log("the client has connected");
    });
    // handling client connection error
    ws.onerror = function () {
        console.log("Some Error occurred")
    }
    if (wst) {
        ws.send("test")
        wst = false
    }

});
console.log("The WebSocket server is running on port 8080");





///app use
app.use(session({
    name: "session-id",
    secret: "GFGEnter", // Secret key,
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: oneDay },
    store: new filestore(),  ///{path : './sessions'}
    reapInterval: 10,
}))
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))




//// Prototypeing remove in work
const posts = [
    { title: 'Wieselburger', body: 'Menge', stk: '10' },
    { title: 'Title 2', body: 'Menge:' },
    { title: 'Title 3', body: 'Body 3' },
    { title: 'Title 4', body: 'Body 4' },
]
var user = {
    firstName: 'Test',
    lastName: 'Test',
}





/// render landing Page (login or index) !!!!!!!!!! Prototyping => change to real Home Landingpage
app.get('/', (req, res) => {


    if (req.session.auth) {
        var user = {
            firstName: req.session.user,
            lastName: 'Test',
        }
       
        res.render('pages/index', {
            user,
            title: "drunk with friends"
        })
        console.log("session aktiv")
    }
    else {

        res.render('pages/login', { user, title: "Login Page" })
        console.log("go to login")
    }




/// login point 
    app.post('/user', (req, res) => {

        if (req.session.auth) {
            res.render('pages/index', {

                title: "Home"
            })
            console.log("session aktiv")
        }
        else {
            LandingPage = false
            user1 = {
                firstName: '',
            }
            const rawdata = fs.readFileSync(pathToJSONFile)
            let obj = JSON.parse(rawdata);
            var count = Object.keys(obj.User).length;
            console.log(count);
            for (let i = 0; i < count; i++) {
                console.log(obj.User[i].Name);
                console.log(obj.User[i].PSW);
                if (req.body.username == obj.User[i].Name && req.body.password == obj.User[i].PSW) {
                    console.log("Okay")

                    console.log("login button")
                    // session=req.session;
                    // session.userid=req.body.username;
                    user1.firstName = obj.User[i].Name
                    req.session.user = obj.User[i].Name
                    req.session.auth = true
                    console.log(req.session.cookie)
                    // res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
                    LandingPage = true
                    break
                }
                else {
                    // res.render('pages/login', {user,title: "drunk with friends"})
                    // res.send('Invalid username or password');
                    console.log("Nicht vorhanden")
                    continue
                }


            }
            if (LandingPage) {
                user = user1
                res.render('pages/index', { user, title: "drunk with friends" })
                console.log("error")
                //res.redirect('/');
                // res.render('pages/articles', {articles: posts,
                //     title: "articles"});
                // res.render('pages/login', {user,title: "drunk with friends"})  
            }
            else {
                res.render('pages/login', { user, title: "drunk with friends" })
            }
        }


    })

/// logout point
    app.get('/logout', (req, res) => {
        if (req.session.auth) {
            if (req.session.auth) {
                console.log("authen")
            }
            var authHeader1 = req.headers.authorization;
            console.log(req.session.cookie);
            // res.clearCookie('connect.sid')
            // req.session.destroy()
            req.session.destroy() // Delete session
            res.clearCookie('session-id') // delete cookie
            res.render('pages/login', { user, title: "Login Page" })
            console.log("logaut")
        }
        else {
            // res.render('pages/login', {user,title: "Login Page"})
            res.render('pages/login', { user, title: "Login Page" })
            console.log("wrong password")
        }
    });


})


/// render articles   !!!!!!!!!! Prototyping wrong => remove or change
app.get('/articles', (req, res) => {
    if (req.session.auth) {
        res.render('pages/articles', {
            articles: posts,
            title: "articles"
        })
        console.log("session aktiv")
    }
    else {

        res.render('pages/login', { user, title: "Login Page" })
        console.log("go to login")
    }


})


/// render login
app.get('/login', (req, res) => {
    res.render('pages/login', {
        user,
        title: "login"
    })
})


/// add drink to User
app.post("/drinkBier", function (req, res) {

    console.log(req.session.user)

    console.log(req.get('Content-Type'), req.header)
    console.log("hier bier", req.body)
    clientData = req.body
    updateUser(clientData.Art, req.session.user, clientData.Ort)


    res.end()

});


///send UserData to Client  !!!!!!!!!! Prototyping wrong => send default Obj to Cielent
app.post("/UserData", function (req, res) {
    console.log("send USer Data")
    res.send({ "firstName": "John", "lastName": "Doe" });
});

/// log listen port
app.listen(port, () => {
    console.log(`App listening at port ${port}`)
})




/// add static order to Client
app.use(express.static("public"));





/////Helper functions//////




/// clear All Sessions from Server 
function clearAllSession(){

fs.readdir(sessionsFolder, (err, files) => {
    files.forEach(file => {
      console.log(file);
      fs.unlink(sessionsFolder+"/"+file, function (err) {
        if (err) throw err;
        // if no error, file has been deleted successfully
        console.log('File deleted!');
    });
    });
});
}





///update User Drinks to Json
function updateUser(Getreank, UserName, Ort) {
    console.log("data to update", Getreank, UserName, Ort)
    ///Getreank :Kaiser,Wieselburger
    ///User : index von User
    ///Ort  : FH,Home

    let UserIndex = 0
    const rawdata = fs.readFileSync(pathToJSONFile)
    let obj = JSON.parse(rawdata);
    var count = Object.keys(obj.User).length;
    for (let i = 0; i < count; i++) {
        console.log(UserName == obj.User[i].Name, i)
        if (UserName == obj.User[i].Name) {
            // console.log("user ID",i)
            UserIndex = i
            console.log(obj.User[i].Orte[Ort][Getreank]);
            obj.User[i].Orte[Ort][Getreank] = obj.User[i].Orte[Ort][Getreank] + 1
            obj.User[i].Orte[Ort].Gesamt = obj.User[i].Orte[Ort].Gesamt + 1
            obj.User[i].Gesamt = obj.User[i].Gesamt + 1
            // console.log(obj.User[UserIndex].Orte[Ort][Getreank]);
            fs.writeFile(pathToJSONFile, JSON.stringify(obj), (err) => {
                if (err) throw err;
                console.log('Data written to file');
            });
            break
        }
    }
}

