import { Model } from "sequelize";

export class Inventory extends Model {
  declare id: number;
  declare name: string;
  declare category: string;
  declare quantity: number;
  declare price: number;
  declare supplier: string;
  declare addedDate: string;

  
}
