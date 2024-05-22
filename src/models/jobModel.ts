import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    jobType: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    workMode: {
      type: String,
      required: false,
    },
    experience: {
      type: String,
      required: false,
    },
    salaryFromRange: {
      type: Number,
      required: false,
    },
    salaryToRange: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

// delete old model
if (mongoose.models.jobs) {
  const jobModel = mongoose.model("jobs");
  mongoose.deleteModel(jobModel.modelName);
}

// create new model
const Job = mongoose.model("jobs", jobSchema);
export default Job;
