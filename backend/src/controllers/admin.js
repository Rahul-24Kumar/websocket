const tokenModel = require("../models/token");
const adminModel = require("../models/admin");
const bcrypt = require("bcrypt");



const loginUser = async (req, res) => {
    try {
        // let userName = req.body.userName;
        // let userPassword = req.body.userPassword;

        let { userName, userPassword } = req.body;


        let isUserPresent = await adminModel.findOne({ userName: userName });

        if (!isUserPresent) {


            let register = await adminModel.create(userName, userPassword);

            return res.status(201).send({ message: "successfully registered!", data: register })

        } else {
            return res.status(400).send({ message: "bad request!" })
        }
    } catch (error) {
        return res.status(500).send({ message: "some error occured!", error })
    }
}

const adminVerify = async (req, res) => {
    try {

        const email = req.body.email;
        const password = req.body.password;

        let findAdmin = await adminModel.findOne({ email: email });

        if (findAdmin) {

            let passwordMatch = await bcrypt.compare(password, findAdmin.password);
            // let register = await admin.create(adminData,)
            // return res.status(201).send({ message: "admin logged In", data: register })

            if (passwordMatch) {
                try {
                    let coinBody = req.body

                    let newCoin = await tokenModel.create(coinBody);

                    return res.status(201).send({ message: "new coins added!", data: newCoin })
                } catch (error) {
                    return res.status(500).send({ message: "some error occured!", error })
                }

            }
        } else {
            return res.status(400).send({ message: "email or password is incorrect!" })
        }


    } catch (error) {
        return res.status(500).send({ message: "some error occured!", error })
    }

}

// const newToken = async (req, res) => {

// }

module.exports = { adminVerify, loginUser };