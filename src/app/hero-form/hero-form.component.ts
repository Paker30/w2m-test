import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent {
  model = new Hero('', '', '', '');

  submitted = false;

  constructor(
    private heroService: HeroService
  ) { }

  onSubmit() {
    this.heroService.create(this.model)
    .subscribe((hero) => {
      this.model = hero;
      this.submitted = true;
    });
  }

}
