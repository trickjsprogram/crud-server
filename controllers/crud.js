const Task = require("../models/crud");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { task } = req.body;
    console.log("task", task);
    const taskCreate = await new Task({ task, slug: slugify(task) }).save();
    console.log("taskCreate", taskCreate);
    res.json(taskCreate);
  } catch (err) {
    res.status(400).send("Create task failed");
  }
};

exports.list = async (req, res) => {
  try {
    const result = await Task.find({}).sort({ createdAt: -1 }).exec();
    res.json(result);
  } catch (err) {
    res.status(400).send("Listing task failed");
  }
};

exports.read = async (req, res) => {
  let task = await Task.findOne({ slug: req.params.slug }).exec();
  res.json(task);
};

exports.update = async (req, res) => {
  const { task } = req.body;
  try {
    const updated = await Task.findOneAndUpdate(
      { slug: req.params.slug },
      { task, slug: slugify(task) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Task update failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Task delete failed");
  }
};
