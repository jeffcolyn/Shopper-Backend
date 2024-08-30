import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database'; // Caminho correto para o arquivo de configuração

class Reading extends Model {
  public id!: string;
  public customer_code!: string;
  public measure_datetime!: Date;
  public measure_type!: string;
  public image_url!: string;
  public measure_value!: number;
  public has_confirmed!: boolean;
}

Reading.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  customer_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  measure_datetime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  measure_type: {
    type: DataTypes.ENUM('WATER', 'GAS'),
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  measure_value: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  has_confirmed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  sequelize, 
  modelName: 'Reading',
});

export default Reading;
