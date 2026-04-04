const Record = require("../models/Records");

exports.createRecords = async (req, res) => {
  try {
    const { amount, type, category, date, notes } = req.body;

    const record = await Record.create({
      user: req.user.id,
      amount,
      type,
      category,
      date,
      notes
    });

    res.status(201).json({
      message: "Record created successfully",
      record
    });

  } catch (error) {
    res.status(500).json({ message: "Error creating record" });
  }
};

exports.getRecords = async (req, res) => {
  try {
    const { type, category, startDate, endDate, page = 1, limit = 5 } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    let filter = { user: req.user.id };

    if (type) filter.type = type;
    if (category) filter.category = category;

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    // Pagination 
    const skip = (pageNumber - 1) * limitNumber;

    // total records count
    const totalRecords = await Record.countDocuments(filter);

    // fetch paginated data
    const records = await Record.find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limitNumber);

    res.json({
      totalRecords,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalRecords / limitNumber),
      data: records
    });

  } catch (error) {
    res.status(500).json({ message: "Error fetching records" });
  }
};

exports.updateRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    // ownership check
    if (record.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updatedRecord = await Record.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Record updated successfully",
      updatedRecord
    });

  } catch (error) {
    res.status(500).json({ message: "Error updating record" });
  }
};


exports.deleteRecords = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    // ownership check
    if (record.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await record.deleteOne();

    res.json({ message: "Record deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error deleting record" });
  }
};