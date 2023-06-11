import { sequelize } from "../../schema/init-models";

const findAll = async (req, res) => {
  try {
    const rows = await req.context.models.locations.findAll();
    return res.send(rows);
  } catch (error) {
    return res.send(error);
  }
};

const findOne = async (req, res) => {
  try {
    const rows = await req.context.models.locations.findOne({
      where: { location_id: req.params.id },
    });
    return res.send(rows);
  } catch (error) {
    return res.send(error);
  }
};

const create = async (req, res) => {
  try {
    const rows = await req.context.models.locations.create({
      location_id: req.body.id,
      street_address: req.body.street,
      postal_code: req.body.postal,
      city: req.body.city,
      state_province: req.body.state,
      country_id: req.body.country,
    });
    return res.send(rows);
  } catch (error) {
    return res.send(error);
  }
};

const update = async (req, res) => {
  try {
    const rows = await req.context.models.locations.update(
      {
        street_address: req.body.street,
      },
      { returning: true, where: { location_id: req.params.id } }
    );
    return res.send(rows);
  } catch (error) {
    return res.send(error)
  }
};

const deleted = async(req,res) => {
    try {
        const rows = await req.context.models.locations.destroy({
            where:{location_id : req.params.id}
        })
        return res.send('delete '+rows+' row')
    } catch (error) {
        return res.send(error)
    }
}

const querySQL = async(req,res) => {
    try {
        await sequelize.query('select * from locations where location_id = :id',
        {replacements : {id : req.params.id},type : sequelize.QueryTypes.SELECT}
        ).then(result => {
            return res.send(result)
        })
    } catch (error) {
        return res.send(error)
    }
}
export default {
  findAll,
  findOne,
  create,
  update,
  deleted,
  querySQL
};