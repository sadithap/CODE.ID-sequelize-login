import { sequelize } from "../../schema/init-models";

const findAll = async (req, res) => {
  try {
    const rows = await req.context.models.job_history.findAll();
    return res.send(rows);
  } catch (error) {
    return res.send(error);
  }
};

const findOne = async (req, res) => {
  try {
    const rows = await req.context.models.job_history.findOne({
      where: { employee_id: req.params.id },
    });
    return res.send(rows);
  } catch (error) {
    return res.send(error);
  }
};

const create = async (req, res) => {
  try {
    const rows = await req.context.models.job_history.create({
      employee_id: req.body.id,
      start_date: req.body.start,
      end_date: req.body.end,
      job_id: req.body.job,
      department_id: req.body.department,
    });
    return res.send(rows);
  } catch (error) {
    return res.send(error);
  }
};

const update = async (req, res) => {
  try {
    const rows = await req.context.models.job_history.update(
      {
        start_date: req.body.start,
      },
      { returning: true, where: { employee_id: req.params.id } }
    );
    return res.send(rows);
  } catch (error) {
    return res.send(error)
  }
};

const deleted = async(req,res) => {
    try {
        const rows = await req.context.models.job_history.destroy({
            where:{employee_id : req.params.id}
        })
        return res.send('delete '+rows+' row')
    } catch (error) {
        return res.send(error)
    }
}

const querySQL = async(req,res) => {
    try {
        await sequelize.query('select * from job_history where employee_id = :id',
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