import { Adoption } from './../../models/adoption.model';
import { Pet } from './../../models/pet.model';
import { PetsService } from './../../service/pets.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdoptionService } from 'src/app/service/adoption.service';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.css'],
})
export class PetDetailsComponent implements OnInit {
  singlePet: Pet = new Pet();

  adoption: Adoption = new Adoption();

  petFormGroup: FormGroup;

  petId: number = NaN;

  constructor(
    private service: PetsService,
    private active: ActivatedRoute,
    private builder: FormBuilder,
    private aService: AdoptionService,
    private router: Router
  ) {
    this.petFormGroup = this.builder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.active.params.subscribe((params: any) => {
      this.petId = params['id'];
      this.getAllPetsById();
    });
  }

  getAllPetsById(): void {
    this.service.getPetsById(this.petId).subscribe((elem: Pet) => {
      this.singlePet = elem;
    });
  }

  onSubmit(): void {
    this.adoption.petId = this.petId;
    this.adoption.petName = this.singlePet.name;
    this.adoption.name = this.petFormGroup.value.name;
    this.adoption.contact = this.petFormGroup.value.email;
    this.aService.add(this.adoption).subscribe((x: any) => {
      return this.router.navigate(['/pets']);
    });
    this.petFormGroup.reset();
  }
}
