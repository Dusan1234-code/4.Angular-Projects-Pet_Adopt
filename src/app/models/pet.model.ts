export class Pet {
  _id: number;
  name: string;
  category: string;
  sex: string;
  size_kg: number;
  story: string;
  image: string;

  constructor(obj?: any) {
    this._id = (obj && obj._id) || 0;
    this.name = (obj && obj.name) || '';
    this.category = (obj && obj.category) || '';
    this.sex = (obj && obj.sex) || '';
    this.size_kg = (obj && obj.size_kg) || 0;
    this.story = (obj && obj.story) || '';
    this.image = (obj && obj.image) || '';
  }
}
