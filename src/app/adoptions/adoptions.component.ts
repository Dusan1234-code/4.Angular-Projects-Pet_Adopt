import { Adoption } from './../models/adoption.model';
import { AdoptionsSearchList } from './../models/adoptions.search.list.model';
import { AdoptionService } from './../service/adoption.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adoptions',
  templateUrl: './adoptions.component.html',
  styleUrls: ['./adoptions.component.css'],
})
export class AdoptionsComponent implements OnInit {
  adoptionList: AdoptionsSearchList = new AdoptionsSearchList();

  constructor(private service: AdoptionService) {}

  ngOnInit(): void {
    this.getAllAdoptions();
  }

  getAllAdoptions(): void {
    this.service.getAdoptions().subscribe((elem) => {
      this.adoptionList = elem;
    });
  }

  deleteOne(adopId: number): void {
    this.service.remove(adopId).subscribe((x) => {
      this.getAllAdoptions();
    });
  }
}
