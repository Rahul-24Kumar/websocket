const jwt = require("jsonwebtoken");
const adminModel = require("../models/admin");

let authenticate = async (req, res, next) => {
    try {
        let token = req.headers['siamaq']
        if (!token)
            return res.status(400).send({ message: "please provide" })
        let validToken = jwt.verify(token, "siamaq live")
        if (!validToken) return res.status(400).send({ message: "authentication failed!" })
        next()
    } catch (error) {
        return res.status(500).send({ message: "some error occured!", error });
    }
}

const authorisation = async (req, res) => {
    try {

        let token = req.headers['siamaq'];
        const isAdmin = req.params.isAdmin;

        let adminExist = await adminModel.findOne({ isAdmin: isAdmin, isAdmin: true })

        if (!adminExist)
            return res.status(400).send({ message: "invalid admin!" });

        let decodedToken = jwt.verify(token, "siamaq live")

        if (!decodedToken)
            return res.status(400).send({ message: "bad request!" })

    } catch (error) {
        return res.status(500).send({ message: "some error occured!", error })
    }
}

module.exports = { authenticate, authorisation };