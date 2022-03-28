import { Adoption } from './adoption.model';
export class AdoptionsSearchList {
  count: number;
  results: Adoption[];

  constructor(obj?: any) {
    this.count = (obj && obj.count) || 0;
    this.results =
      (obj &&
        obj.results &&
        obj.results.map((elem: any) => new Adoption(elem))) ||
      [];
  }
}
