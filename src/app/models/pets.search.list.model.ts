import { Pet } from './pet.model';
export class PetsSearchList {
  count: number;
  results: Pet[];

  constructor(obj?: any) {
    this.count = (obj && obj.count) || 0;
    this.results =
      (obj && obj.results && obj.results.map((elem: any) => new Pet(elem))) ||
      [];
  }
}
