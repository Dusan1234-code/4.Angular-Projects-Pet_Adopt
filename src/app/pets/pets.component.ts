import { PetsSearchList } from './../models/pets.search.list.model';
import { PetsService } from './../service/pets.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css'],
})
export class PetsComponent implements OnInit {
  petList: PetsSearchList = new PetsSearchList();

  params = {
    sort: '',
    filter: {
      sex: '',
      category: '',
    },
  };

  constructor(private service: PetsService) {}

  ngOnInit(): void {
    this.getAllPets();
  }

  getAllPets(): void {
    this.service.getPets(this.params).subscribe((pets: PetsSearchList) => {
      this.petList = pets;
    });
  }
}
