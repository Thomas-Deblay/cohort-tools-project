// ./models/Students.model.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
// CREATE SCHEMA
// Schema - describes and enforces the structure of the documents
const cohortSchema = new Schema({
    
        inProgress: {type :Boolean, default:false},
        cohortSlug: {type :String, unique: true, required:true},
        cohortName: {type :String , required:true},
        program: {type :String , enum : ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"]},
        campus: {type :String, enum :["Madrid", "Barcelona", "Miami", "Paris", "Berlin", "Amsterdam", "Lisbon", "Remote"]},
        startDate:{type :Date, default:Date.now},
        endDate: {type: Date},
        programManager: {type :String, required:true},
        leadTeacher: {type: String, required:true},
        totalHours: {type :Number, default:360},
        format : {type: String, enum:["Full Time", "Part Time"]}      
});
 
// CREATE MODEL
// The model() method defines a model (Book) and creates a collection (books) in MongoDB
// The collection name will default to the lowercased, plural form of the model name:
//                          "Book" --> "books"
const Cohort = mongoose.model("Cohort", cohortSchema);

module.exports = Cohort;