import { sequelize } from "../../schema/init-models";

const findAll = async (req, res) => {
  try {
    const rows = await req.context.models.employees.findAll();
    return res.send(rows);
  } catch (error) {
    return res.send(error);
  }
};

const findOne = async (req, res) => {
  try {
    const rows = await req.context.models.employees.findOne({
      where: { employee_id: req.params.id },
    });
    return res.send(rows);
  } catch (error) {
    return res.send(error);
  }
};

const create = async (req, res) => {
  try {
    const rows = await req.context.models.employees.create({
      employee_id: req.body.id,
      first_name: req.body.first,
      last_name: req.body.last,
      phone_number: req.body.phone,
      hire_date: req.body.hire,
      salary: req.body.salary,
      commission: req.body.commission,
      job_id: req.body.job,
      manager_id: req.body.manager,
      department_id: req.body.department,
      xemp_id: req.body.xemp,
    });
    return res.send(rows);
  } catch (error) {
    return res.send(error);
  }
};

const update = async (req, res) => {
  try {
    const rows = await req.context.models.employees.update(
      {
        first_name: req.body.first,
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
        const rows = await req.context.models.employees.destroy({
            where:{employee_id : req.params.id}
        })
        return res.send('delete '+rows+' row')
    } catch (error) {
        return res.send(error)
    }
}

const querySQL = async(req,res) => {
    try {
        await sequelize.query('select * from employees where employee_id = :id',
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