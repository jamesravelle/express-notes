// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require('fs');
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3001;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))
// Variable
var notes = [];

// Routes
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function(req, res) {
  res.json(notes);
});

app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    notes.push(newNote);
    let data = JSON.stringify(notes)
    fs.writeFile("db/db.json", data, (err) => { 
      if (err) 
        console.log(err); 
      else { 
        res.json(data);
      } 
    }); 
});

app.delete('/api/notes/:id', function(req, res) {
  var chosen = req.params.id;
  console.log(chosen);
  let data = notes.filter(notes => notes['id'] !== chosen)
  fs.writeFile("db/db.json", JSON.stringify(data), (err) => { 
    if (err) 
      console.log(err); 
    else { 
      res.json(data);
    } 
  }); 
  // Render the new object that was printed. Maybe export the renderNoteList from index.js and use it here?
  // renderNoteList(data);
  res.status(200);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});