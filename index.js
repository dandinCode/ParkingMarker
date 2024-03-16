const express = require("express");
const exphbs = require("express-handlebars");
const conn = require("./db/conn");

const Client = require("./models/Client");
const Automobile = require("./models/Automobile");

const app = express();

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.post("/delete/:clientId", async (req, res)=>{
    const {clientId} = req.params;
    
    await Automobile.destroy({where: {ClientId: clientId}});
    await Client.destroy({where: {id: clientId}});

    res.redirect("/");
});

app.get("/automobilesData/:clientId", async (req, res)=>{
    const {clientId} = req.params;

    const client = await Client.findOne({raw: true, where: {id: clientId}});

    const automobile = await Automobile.findOne({raw: true, where: {ClientId: clientId}});
    const createdAt = (automobile.createdAt).toString();
    const date = createdAt.slice(4, 15);
    const hour = createdAt.slice(16, 24);

    res.render("automobilesData", {client, automobile, date,hour});
});


app.post("/registerAutomobile", async (req, res)=>{
    const automobile = {
        ClientId: req.body.client,
        Model: req.body.model,
        Plate: req.body.plate,
        Brand: req.body.brand,
        Type: req.body.type
    };

    await Automobile.create(automobile);
    res.redirect("/");
});

app.get("/registerAutomobile", async(req, res)=>{

    const client = await Client.findAll({raw: true});
    
    res.render("registerAutomobile", {client});
});

app.post("/registerClient", async (req, res)=>{
    const client = {
        Name : req.body.name,
        CPF : req.body.cpf,
        Telephone : req.body.telephone,
        Address : req.body.address
        }

    await Client.create(client);

    res.redirect("/registerAutomobile");
})

app.get("/registerClient", (req, res)=>{
    res.render("registerClient");
});

app.get("/viewTime/:clientId", async (req, res)=>{
    const {clientId} = req.params;
    const automobile = await Automobile.findOne({raw: true, where: {ClientId: clientId}});
   
    let hours = calcStopedTime(automobile);
    let price = calcPrice(hours, automobile.Type);
    hours = Math.floor(hours)
    res.render("timeOfAutomobiles", {hours, price});
});

app.get("/", async (req, res)=>{       
    const automobile = await Automobile.findAll({raw: true});
    res.render("home", {automobile});
});

conn.sync().then(()=>{
    app.listen(8080)
}).catch(error=>console.log(error));


function calcStopedTime(automobile){
    timeBegin = Date.parse(automobile.createdAt);
    let atualTime = Date.parse(new Date());
    var differenceInMs = Math.abs(atualTime - timeBegin);
    let hours = (differenceInMs / 3.6) / 1000000;
    return hours;
}

function calcPrice(hours, type){
    if (type == "car"){
        return (hours * 8.3).toFixed(2);
    } else{
        return (hours * 5.5).toFixed(2);
    }
    
}
