export class EquipmentSimplified {
  constructor(name: string, count: number) {
    this.name = name;
    this.count = count;
  }
  name: string;
  count: number;
  static readonly maxNameLength: number = 100;
  static readonly maxCountValue: number = 10000;
}

export default EquipmentSimplified;
