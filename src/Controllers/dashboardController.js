const expanseModel = require("../Models/Expanse");
const IncomeModel = require("../Models/Income");
const { isValidObjectId, Types } = require("mongoose");

exports.dashboardController = async (req, res) => {
    try {
        const userID = req.id;
        const userObjectId = new Types.ObjectId(String(userID));

        const totalIncome = await IncomeModel.aggregate([
             {$match : {userId : userObjectId}},
            {$group : {_id : null , total : {$sum : "$amount"}}}
        ]);

        const totalExpanse = await expanseModel.aggregate([
            {$match : {userId : userObjectId}},
            {$group : {_id : null , total : {$sum : "$amount"}}}
        ])


        const last60dayincomeTransection = await IncomeModel.find({userId : userID , date : {$gte : new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)}}).sort({date : -1});

        const get60dayincome = last60dayincomeTransection.reduce((sun , transection) => sun + transection.amount , 0);

        console.log("get60dayincome" , get60dayincome);


        const last60DaysExpanseTransection = await expanseModel.find({userId : userID , date : {$gte : new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)}});

        const getLast60Expanse = last60DaysExpanseTransection.reduce((sum , transection) => sum + transection.amount , 0);

        const last5Transection = [
            ...(await IncomeModel.find({userId : userID}).sort({data : -1}).limit(5)).map((tnx) => ({
                ...tnx.toObject(),
                type : "income"
            })),
            ...(await expanseModel.find({userId : userID}).sort({data : -1}).limit(5)).map((tnx) => ({
                ...tnx.toObject(),
                type : "expanse"
            }))
        ].sort((a , b) => b.date - a.date);


        res.status(200).json({
            totalBalance : (totalIncome[0]?.total || 0) - (totalExpanse[0]?.total || 0),
            totalIncome : totalIncome[0]?.total || 0,
            totalExpanse : totalExpanse[0]?.total || 0,
            last60DaysExpanse : {
                total : getLast60Expanse,
                transection : last60DaysExpanseTransection
            },
            last60Daysincome : {
                total : get60dayincome,
                transection : last60dayincomeTransection
            },
            recenttransection : last5Transection
        })


    } catch (error) {
        return res.status(500).json({message : "Server error , Dashboard Information not found"});
    }
}