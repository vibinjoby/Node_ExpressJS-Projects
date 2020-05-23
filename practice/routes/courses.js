const express = require("express");
const router = express.Router();
const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
  { id: 4, name: "course4" }
];

//Get
router.get("/", (req, res) => {
  //res.send(courses);
  res.render("index", { title: "My app", message: "Hey there" });
});

//Get
router.get("/:id", (req, res) => {
  const result = courses.find(m => m.id === parseInt(req.params.id));
  if (!result) res.status(404).send("the course id was not found");
  res.send(result);
});

//Post
router.post("/", (req, res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };

  const { error } = validateCourse(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  course.name = req.body.name;
  res.send(course);
});

//Put
router.put("/:id", (req, res) => {
  const course = courses.find(m => m.id === parseInt(req.params.id));
  if (!course) res.status(404).send("the course id was not found");
  const { error } = validateCourse(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  course.name = req.body.name;
  res.send(course);
});

//Delete
router.delete("/:id", (req, res) => {
  const course = courses.find(m => m.id === parseInt(req.params.id));
  if (!course) res.status(404).send("the course id was not found");

  console.log(course);

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(course, schema);
}

module.exports = router;
