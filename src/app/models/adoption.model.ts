export class Adoption {
  _id: number;
  petId: number;
  petName: string;
  name: string;
  contact: string;

  constructor(obj?: any) {
    this._id = (obj && obj._id) || 0;
    this.petId = (obj && obj.petId) || 0;
    this.petName = (obj && obj.petName) || '';
    this.name = (obj && obj.name) || '';
    this.contact = (obj && obj.contact) || '';
  }
}
