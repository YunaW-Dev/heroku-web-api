
// // import express
// const express = require("express");
// const app = express();

// // configure express to accept data from the client as JSON format
// app.use(express.json())


// // specify the port that your server will run on
// const HTTP_PORT = process.env.PORT || 1234;


// // ----------------------------------
// let items = [
//     {
//        "name": "Magpie", 
//        "rarity": "common",
//        "description": "Gives 9 gold every 4 spins",
//        "goldPerTurn": -1
//     },
//     {
//         "name": "King Midas",
//         "rarity": "rare",
//         "description": "Adds 1 Gold each turn. Adjacent Gold gives 3x more gold.",
//         "goldPerTurn": 2
//      },    
//      {
//         "name": "Goose",
//         "rarity": "common",
//         "description": "Has a 1% chance of adding a Golden Egg",
//         "goldPerTurn": 1
//      },    
//      {
//         "name": "Bee",
//         "rarity": "uncommon",
//         "description": "Adjacent Flowers give 2x more gold",
//         "goldPerTurn": 1
//      },    
//      {
//         "name": "Golden Egg",
//         "rarity": "rare",
//         "description": "",
//         "goldPerTurn": 3
//      },
//      {
//         "name": "Cat",
//         "rarity": "common",
//         "description": "",
//         "goldPerTurn": 1
//      },
//      {
//         "name": "Void Stone",
//         "rarity": "uncommon",
//         "description": "",
//         "goldPerTurn": 0
//      },
// ]


// app.get("/api/items", (req,res) => {
//     res.send(items);
// });

// app.get("/api/items/:item_name", (req,res) => {
//    console.log(req.params)
//    let item_name = req.params.item_name
//    for (let i =0; i< items.length; i++){
//       let cur_item = items[i]
//       if (cur_item.name === item_name){
//          return res.send(cur_item)
//       }
//    }
//    res.status(404).send({msg:`Sorry, could not find item with name: ${item_name}`})    

// });

// app.post("/api/items", (req, res) => {
//    let itemToInsert = req.body
//    if ("name" in req.body && "rarity" in req.body){
//       items.push(itemToInsert)
//       res.status(201).send({"msg":"item inserted SUCCESSFULLY"})
//    }
//    res.status(401).send({"msg":"FAILED to insert the item"})
// });


// app.delete("/api/items/:item_name", (req, res) => {
//    const itemNameFromUser = req.params.item_name

//    let pos = undefined
//    for (let i = 0; i< items.length; i++){
//       if (items[i].name === itemNameFromUser){
//          pos = i
//          break
//       }
//    }

//    if (pos === undefined){
//       res.status(404).send({"msg":"cant find the item with this name"})
//       return 
//    }

//    items.splice(pos, 1)
//    res.status(200).send({"msg": `${itemNameFromUser} has been deleted`})

// })

// app.put("/api/items/:item_name", (req, res)=>{
//    res.status(501).send({"msg":"the put feature will be implemented at a later day (per requirement)"})
// })


// app.get('*', function(req, res){
//    res.status(404).send({"msg": "This page route is NOT VALID"});
//  });



// const onHttpStart = () => {
//     console.log(`Server has started and is listening on port ${HTTP_PORT}`)
//    }

//    app.listen(HTTP_PORT, onHttpStart);

const mongoose = require("mongoose")

// const {Schema} = mongoose
const Schema = mongoose.Schema;


const DB_URL = "mongodb+srv://dbUser:password!!@cluster0.as6qw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const connectionOptions = {useNewUrlParser: true, useUnifiedTopology: true}

// mongoose.connect(DB_URL, connectionOptions).then(
//    () => {
//        console.log("Connected successfully to your database")
//    }
// ).catch(
//    (err) => {
//        console.log("Error connecting to the database")
//        console.log(err)
//    }
// )

const connectToDb = () => {
   return mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
}


var ItemSchema = new Schema({
   name: {
      type: String,
      unique: true
   }, 
   rarity: String,
   description: String,
   goldPerTurn: Number
},
{
   versionKey: false,
});

var Item = mongoose.model("items_table", ItemSchema)


// import express
const express = require("express");
const app = express();

// configure express to accept data from the client as JSON format
app.use(express.json())


// specify the port that your server will run on
const HTTP_PORT = process.env.PORT || 1234;


function loadInitialItems() {
   const i1 = new Item(
      {
      "name": "Magpie", 
      "rarity": "common",
      "description": "Gives 9 gold every 4 spins",
      "goldPerTurn": -1
   })
   const i2 = new Item(
      {
      "name": "King Midas",
      "rarity": "rare",
      "description": "Adds 1 Gold each turn. Adjacent Gold gives 3x more gold.",
      "goldPerTurn": 2
   })
   const i3 = new Item(
      {
      "name": "Goose",
      "rarity": "common",
      "description": "Has a 1% chance of adding a Golden Egg",
      "goldPerTurn": 1
   })
   const i4 = new Item(
      {
      "name": "Bee",
      "rarity": "uncommon",
      "description": "Adjacent Flowers give 2x more gold",
      "goldPerTurn": 1
   })
   const i5 = new Item(
      {
      "name": "Golden Egg",
      "rarity": "rare",
      "description": "",
      "goldPerTurn": 3
   })
   const i6 = new Item(
      {
      "name": "Cat",
      "rarity": "common",
      "description": "",
      "goldPerTurn": "1"
   })
   const i7 = new Item(
      {
      "name": "Void Stone",
      "rarity": "uncommon",
      "description": "",
      "goldPerTurn": 0
   })
   
   Item.create([i1,i2,i3,i4,i5,i6,i7])
};

// ----------------------------------
let items = [
    {
       "name": "Magpie", 
       "rarity": "common",
       "description": "Gives 9 gold every 4 spins",
       "goldPerTurn": -1
    },
    {
        "name": "King Midas",
        "rarity": "rare",
        "description": "Adds 1 Gold each turn. Adjacent Gold gives 3x more gold.",
        "goldPerTurn": 2
     },    
     {
        "name": "Goose",
        "rarity": "common",
        "description": "Has a 1% chance of adding a Golden Egg",
        "goldPerTurn": 1
     },    
     {
        "name": "Bee",
        "rarity": "uncommon",
        "description": "Adjacent Flowers give 2x more gold",
        "goldPerTurn": 1
     },    
     {
        "name": "Golden Egg",
        "rarity": "rare",
        "description": "",
        "goldPerTurn": 3
     },
     {
        "name": "Cat",
        "rarity": "common",
        "description": "",
        "goldPerTurn": 1
     },
     {
        "name": "Void Stone",
        "rarity": "uncommon",
        "description": "",
        "goldPerTurn": 0
     },
]

// 1. MONGO GET ALL
app.get("/api/items", (req, res) => {
   // 1. search the database for students and return them
   Item.find().exec().then(
       (results) => {
           console.log(results)
           res.send(results)
       }
   ).catch(
       (err) => {
           console.log(error)
           res.status(500).send("Error when getting students from database.")
       }
   )
   
})
// app.get("/api/items", (req,res) => {
//     res.send(items);
// });

// 2. MONGO GET INDIVIDUAL
app.get("/api/items/:item_name", (req,res) => {
   Item.find({name:req.params.item_name}).exec().then(
         (result) => {
            console.log(req.params.item_name)
            console.log(result)
            if (result == null){
               const msg = {
                  statusCode: 404,
                  msg: "item not found"
               }
               res.status(404).send(msg)
            }
            else{
               res.send(result)
            }
         }
      ).catch(
         (err) => {
            console.log(err)
            const msg = {
               statusCode: 500,
               msg: "error fetching item"
            }
            res.status(500).send(msg)
         }
      )
})

// EXPRESS GET INDIVIDUAL

// app.get("/api/items/:item_name", (req,res) => {
//    console.log(req.params)
//    let item_name = req.params.item_name
//    for (let i =0; i< items.length; i++){
//       let cur_item = items[i]
//       if (cur_item.name === item_name){
//          return res.send(cur_item)
//       }
//    }
//    res.status(404).send({msg:`Sorry, could not find item with name: ${item_name}`})    

// });



//3. POST ITEM
app.post("/api/items", (req, res) => {
   console.log(req.body)
   if ("name" in req.body && "rarity" in req.body){
      Item.create(req.body).then(
         (result) => {
            console.log("create success")
            console.log(result)
            res.status(201).send({"msg": "insert success"})
         }
      ).catch(
         (err)=> {
            console.log(err)
            const msg = {
               statusCode:500,
               msg: "error insert item"
           }
           res.status(500).send(msg)
         }
      )
   }

})
//EXPRESS POST ITEM
// app.post("/api/items", (req, res) => {
//    let itemToInsert = req.body
//    if ("name" in req.body && "rarity" in req.body){
//       items.push(itemToInsert)
//       res.status(201).send({"msg":"item inserted SUCCESSFULLY"})
//    }
//    res.status(401).send({"msg":"FAILED to insert the item"})
// });



// 4. MONGO DELETE ITEM
app.delete("/api/items/:item_name", (req, res) => {
   Item.findOneAndDelete({name:req.params.item_name}).exec().then(
      (result) => {
         console.log(result)
         if (result == null){
            const msg = {
               statusCode:404,
               msg: "Record not found"
           }
           res.status(404).send(msg)
         }
         else{
            res.status(200).send(result)
         }
      }
   ).catch(
      (err)=> {
         const msg = {
             statusCode:500,
             msg: "Error when getting students from database."
         }
         res.status(500).send(msg)
      }
   )
})


// EXPRESS DELETE ITEM
// app.delete("/api/items/:item_name", (req, res) => {
//    const itemNameFromUser = req.params.item_name

//    let pos = undefined
//    for (let i = 0; i< items.length; i++){
//       if (items[i].name === itemNameFromUser){
//          pos = i
//          break
//       }
//    }

//    if (pos === undefined){
//       res.status(404).send({"msg":"cant find the item with this name"})
//       return 
//    }

//    items.splice(pos, 1)
//    res.status(200).send({"msg": `${itemNameFromUser} has been deleted`})

// })


// 5. UPDATE ITEM
app.put("/api/items/:item_name", (req, res)=>{
   res.status(501).send({"msg":"the put feature will be implemented at a later day (per requirement)"})
})


app.get('*', function(req, res){
   res.status(404).send({"msg": "This page route is NOT VALID"});
 });



const onHttpStart = () => {
    console.log(`Server has started and is listening on port ${HTTP_PORT}`)
   }

   // app.listen(HTTP_PORT, onHttpStart);
connectToDb().then( ()=> {
   // 1. if you were successful in connecting to the database, then
   // ouptut a message
   console.log("Connected to database, loading initial list of items into database")
   loadInitialItems()
   // 2. after you connect to thedb, start the express server
   console.log("Starting server")
   app.listen(HTTP_PORT, onHttpStart)
}).catch( (error) => {
   console.log("Error from database")
   console.log(error)
})
