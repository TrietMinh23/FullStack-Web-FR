import {userReport} from "../models/userReportModel.js";

export const getUserReport = async (req, res) => {
  try {
    var page = parseInt(req.query.page) || 1;
    var limit = parseInt(req.query.limit) || 5;
    var searchQuery = req.query.searchQuery || "";
    const skip = (page - 1) * limit;

    const report = await userReport
      .find()
      .populate("id_reporter", "name isBlocked")
      .populate("id_reported", "name isBlocked")
      .skip(skip)
      .limit(limit)
      .exec();
    var searchQuery = req.query.searchQuery || "";

    if (searchQuery) {
      report.forEach((item) => {
        item.id_reporter.name === searchQuery;
      });
    }
    console.log("search",searchQuery);
    const total = await userReport
      .find();
    const totalPages= Math.ceil(total.length/limit);

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const totalPending = await userReport.countDocuments({status: "Pending"});
    const totalDone = await userReport.countDocuments({status: "Done"});
    const totalPendingToday = await userReport.countDocuments({
      status: "Pending",
      createdAt: {$gte: currentDate},
    });
    const totalDoneToday = await userReport.countDocuments({
      status: "Done",
      updatedAt: {$gte: currentDate},
    });
    console.log(totalPendingToday, totalDoneToday);
    res.status(200).json({
      report,
      totalPending,
      totalDone,
      total,
      totalPages,
      totalPendingToday,
      totalDoneToday,
    });
  } catch (err) {
    res.status(404).json({error: err.message});
  }
};
export const createReport = async (req, res) => {
  try {
    console.log("no see", req.body);
    const newReport = new userReport(req.body);
    console.log("already save");
    await newReport.save();
  } catch (err) {
    res.status(400).json({error: err.message});
  }
};
export const deleteReport = async (req, res) => {
  try {
  } catch (err) {
    res.status(400).json({error: err.message});
  }
};

export const updateReport = async (req, res) => {
  try {
    const filter = {_id: req.body};
    const update = {status: "Done"};
    const report = await userReport.findOneAndUpdate(filter, update);
    console.log(report);
    res.status(200).json(report);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
};
