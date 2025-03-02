const mongoose = require("mongoose");

require("dotenv").config();

const connectDB= async() =>{
           try {
          await mongoose.connect("mongodb+srv://priyamurali30193:prajesh2108@cluster0.udhfp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
          .then(() => {
            console.log("Database is connected Successfully")
          })
    
        } catch (err) {
          console.error("MongoDB connection error:", err);
          process.exit(1); // Exit process with failure
        }
      };

      

const gameSchema = new mongoose.Schema({
  roomId: { type: String, required: true },
  moves: [{ type: String }], // Array of moves in SAN notation
  winner: { type: String ,enum: ["white", "black", "draw"] }, // "white" or "black" or "draw"
  createdAt: { type: Date, default: Date.now },
});

const Game = mongoose.model("Game", gameSchema);



      
      module.exports = {connectDB,Game};
      
