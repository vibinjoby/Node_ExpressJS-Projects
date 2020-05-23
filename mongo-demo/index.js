const mongo = require("mongoose");
mongo
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to mongodb..."))
  .catch(err => console.log("Unable to connnect to mongodb", err));

const coursesSchema = new mongo.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now() },
  isPublished: Boolean
});

const Course = mongo.model("Course", coursesSchema);

async function createCourse() {
  try {
    const course = new Course({
      //name: "React JS Course",
      author: "Vibin",
      tags: ["react", "frontend"],
      isPublished: true
    });

    const result = await course.save();
    console.log(result);
  } catch (ex) {
    console.log(ex.message);
  }
}

async function findCourse() {
  const pageNumber = 1;
  const pageSize = 10;
  const result = await Course
    //.find({ author: "Vibin" })
    //.find({ price: { $gte: 10, $lte: 20 } })
    .find()
    //.find({ price: { $in: [10, 15, 20] } })
    .and([{ author: /.*vibin.*/i }, { isPublished: true }])
    .skip((pageNumber - 1) * pageSize)
    .limit(10)
    .sort({ name: -1 })
    //.select({ name: 1, tags: 1 });
    .count();
  console.log(result);
}

//findCourse();
createCourse();
