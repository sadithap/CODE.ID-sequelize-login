import { sequelize } from "../../schema/init-models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createUser = async (req, res) => {
    if (req.body.username == "") {
        return res.status(401).send({ message: "Failed! Username is not null" });
    }
    if (req.body.password == "") {
        return res.status(401).send({ message: "Failed! Password is not null" });
    }
    if (req.body.email == "") {
        return res.status(401).send({ message: "Failed! Email is not null" });
    } 
    try {
        const salt = await bcrypt.genSalt(10);
        const passHash = await bcrypt.hash(req.body.password, salt);
        const user = await req.context.models.users.create({
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        password: passHash,
        });
        const { username, email, phone } = user.dataValues;
        return res.send({ username, email, phone });
    } catch (error) {
        return res.send(error);
    }
};

const userLogin = async (req, res) => {
    try{
        let data = req.body;
        const result = await req.context.models.users.findOne({
            where: {username : data.username}
        });
        if(!result){
            return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
        }
        if(bcrypt.compareSync(data.password,result.password)){
            let token = jwt.sign(
                {
                  user_id: result.user_id,
                },
                process.env.SECRET_KEY,
                {
                  expiresIn: "2h",
                }
              );
            const {username,email,phone} = result.dataValues
              let output = {
                userdata: {username,email,phone},
                accessToken: token,
            };
            return res.status(200).json({message: 'Berhasil login',output})
        }
        return res.status(404).json({ message: 'Password salah' });
    }
    catch(error){
        return res.send(error);
    }
  };

  const verify = async (req,res,next) => {
    const bearer = req.headers.authorization;
    jwt.verify(bearer,process.env.SECRET_KEY, (error,data)=> {
        if (error) {
            console.info(error.message);
            return res.json(error)
        }
        req.body=data
        next()
    })
  }

export default {
    createUser,
    userLogin,
    verify
}