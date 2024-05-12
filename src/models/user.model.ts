// import { AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';

// @Table({ tableName: 'user', modelName: 'User' })
export class User // extends Model 
{

  // @AutoIncrement
  // @AllowNull(false)
  // @PrimaryKey
  // @Column(DataType.INTEGER)
  id?: number;

  // @Column(DataType.STRING)
  firstName: string;

  // @Column(DataType.STRING)
  lastName: string;

  // @Unique(true)
  // @Column(DataType.STRING)
  email: string;

  // @Column(DataType.STRING)
  password: string;
}