const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  //_id: String,
  tags: {
    type: [String],
    enum: ["frontend", "backend"],
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: "Course should have atleast one tag"
    }
  },
  name: { type: String, required: true },
  author: String,
  isPublished: Boolean,
  price: Number,
  date: { type: Date, default: Date.now }
});

mongoose
  .connect("mongodb://localhost/mongo-exercises", { useNewUrlParser: true })
  .then(() => console.log("Connected to DB"))
  .catch(err => console.log("Failed to connect to DB", err.message));

const Course = mongoose.model("Course", schema);

async function createCourse() {
  try {
    const course = await Course.create({
      name: "React JS by Chinchu",
      tags: null,
      author: "Vibin",
      isPublished: true,
      price: 20
    });

    await course.validate();

    const result = await course.save();
    console.log(result);
  } catch (ex) {
    console.log(ex.message);
  }
}

async function queryCourses() {
  //Exercise 2
  /*const result = await Course.find({
    isPublished: true,
    tags: { $in: ["frontend", "backend"] }
  })
    .sort("-price")
    .select("name author price");*/

  //Exercise 3
  const result = await Course.find({ isPublished: true })
    .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
    .sort("-price")
    .select("name author price");
  console.log(result);
}

//Query first
async function updateCourse(id) {
  const courseData = await Course.findById(id);
  if (!courseData) return;

  courseData.isPublished = true;
  courseData.author = "Another Author";

  const result = await courseData.save();
  console.log(result);
}

//Document first
async function updateCourseU(id) {
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        isPublished: false,
        author: "vibin"
      }
    },
    { new: true }
  );
  console.log(course);
}

//Remove Course
async function removeCourse(id) {
  const course = await Course.findByIdAndRemove(id);
  console.log(course);
}

//queryCourses();
//updateCourseU("5a68ff090c553064a218a547");
//removeCourse("5a68ff090c553064a218a547");
createCourse();
