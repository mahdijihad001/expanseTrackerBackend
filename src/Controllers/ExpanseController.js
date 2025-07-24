const xlsx = require("xlsx");
const expanseModel = require("../Models/Expanse");
const { default: mongoose } = require("mongoose");

exports.addExpanse = async (req, res) => {
    const userId = req.id;

    try {
        const { icon, category, amount, date } = req.body;

        if (!category || !amount) {
            return res.status(400).json({ message: "Category & Amount filds are required" });
        };

        const newExpanse = new expanseModel({ userId, icon, category, amount, date });
        await newExpanse.save();

        res.status(201).json(newExpanse)

    } catch (error) {
        return res.status(500).json({ message: "Server Error , Expanse Not added", err: error?.message });
    }

}
exports.getAllIExpanse = async (req, res) => {
    const userId = req.id;

    try {

        const expanse = await expanseModel.find({ userId }).sort({ date: -1 });

        res.status(200).json({ expanse });

    } catch (error) {
        return res.status(500).json({ message: "Server error , All Income not Found" });
    }
}


exports.deleteExpanse = async (req, res) => {

    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(404).json({message : "User Not valid"})
    }

    try {
        await expanseModel.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Expanse deleted Successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Expanse not deleted, Server Error" });
    }
}

// Download Expanse Details Xlsx
exports.downloadExpanseExcel = async (req, res) => {
    const userId = req.id;

    try {
        const expanse = await expanseModel.find({ userId }).sort({ date: -1 });

        const data = expanse.map((item) => ({
            category: item.category,
            Amount: item.amount,
            Data: item.date
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, 'Expanse');
        xlsx.writeFile(wb, "expanse_details.xlsx");
        res.download('expanse_details.xlsx');

    } catch (error) {
        return res.status(500).json({ message: "Expanse file download Faild , Server error" });
    }
}