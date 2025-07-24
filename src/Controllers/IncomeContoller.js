const IncomeModel = require("../Models/Income");
const xlsx = require("xlsx");

exports.addIncome = async (req, res) => {
    const userId = req.id;

    try {
        const { icon, source, amount, date } = req.body;

        if (!source || !amount) {
            return res.status(400).json({ message: "Source & Amount filds are required" });
        };

        const newIncome = new IncomeModel({ userId, icon, source, amount, date });
        await newIncome.save();

        res.status(201).json(newIncome)

    } catch (error) {
        return res.status(500).json({ message: "Server Error , Income Not added", err: error?.message });
    }

};


exports.getAllIncome = async (req, res) => {
    const userId = req.id;

    try {

        const income = await IncomeModel.find({ userId }).sort({ date: -1 });

        res.status(200).json({ income });

    } catch (error) {
        return res.status(500).json({ message: "Server error , All Income not Found" });
    }

};

exports.deleteIncome = async (req, res) => {
    try {
        await IncomeModel.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Income deleted Successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Income Deleted Success" });
    }
};

exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.id;

    try {
        const income = await IncomeModel.find({ userId }).sort({ date: -1 });

        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Data: item.date
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, 'Income');
        xlsx.writeFile(wb, "income_details.xlsx");
        res.download('income_details.xlsx');


    } catch (error) {
        return res.status(500).json({ message: "Income download Faild , Server error" });
    }

};