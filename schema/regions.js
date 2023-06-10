import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class regions extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    region_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    region_name: {
      type: DataTypes.STRING(25),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'regions',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "regions_pkey",
        unique: true,
        fields: [
          { name: "region_id" },
        ]
      },
    ]
  });
  }
}
