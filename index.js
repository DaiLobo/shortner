const express = require("express");
const crypto = require ("crypto"); //vê pq n pode fazer import

// COMMON JS ->
// IMPORT -> const express = require("express")
// EXPORT -> module.export = {express: 123}

// ESMODULES import express from 'express'
// IMPORTEXPORT -> export {express: 123}

const app = express();

const users = [
    {
        id: crypto.randomUUID(),
        name: "Marcos",
        email: "Marcos123@hotmail.com",
    }
    
];

app.use(express.json()); //conseguir acessar a informação do json no body

app.get("/api/user", (request, response) => { ///api/user/ "/" cria a rota url
    response.status(200).send(users);
})


app.get("/api/user/:id", (request, response) => {
    
    const id = request.params.id; //normalizar

    const user = users.find((user) => user.id === id);

    if(user){
        return response.send({user});
    }

    response.status(404).send({ message: "User not exist" })

})


app.post("/api/user", (request, response) => { // "/" cria a rota url
    
    const name = request.body.name;
    const email = request.body.email;
  
    users.push({name, email, id: crypto.randomUUID()});
    response.send(users);

})


app.put("/api/user/:id", (request, response) => { // "/" cria a rota url
    //retornar o usuario atualizado

    const id = request.params.id; //normalizar
    console.log(id);

    const name = request.body.name;
    const email = request.body.email;

    const userIndex = users.findIndex((user) => user.id === id);
   
    if (userIndex === -1){
        response.status(404).send({ message: "User not exist" })
    }

    users[userIndex] = {
        id,
        name,
        email,
    };

    response.send({ user: users[userIndex] });


})


app.delete("/api/user/:id", (request, response) => { // "/" cria a rota url
    //retornar status 200

    const id = request.params.id;

    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1){
        response.status(404).send({ message: "User not exist" })
    }

    users.splice(userIndex, 1);

    response.send({ message: "User deleted" });


    //response.send("Hello DELETE")
})


app.listen(3000, () => {
    console.log("Server Running on PORT 3000")
});