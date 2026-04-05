const Record = require("../models/Records");

exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    //  get all records of 
    const records = await Record.find({ user: userId });

    //  calculate totals
    let totalIncome = 0;
    let totalExpense = 0;

    records.forEach((rec) => {
      if (rec.type === "income") totalIncome += rec.amount;
      else totalExpense += rec.amount;
    });

    const netBalance = totalIncome - totalExpense;

    //  categorywise breakdown
    const categoryTotals = {};

    records.forEach((rec) => {
      if (!categoryTotals[rec.category]) {
        categoryTotals[rec.category] = 0;
      }
      categoryTotals[rec.category] += rec.amount;
    });

    //  recent transactions (last 5)
    const recentTransaction = await Record.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5);

    //  final response
    res.json({
      totalIncome,
      totalExpense,
      netBalance,
      categoryTotals,
      recentTransaction
    });

  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard data" });
  }
};
