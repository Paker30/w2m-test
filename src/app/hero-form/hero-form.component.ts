import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {
  model = new Hero('', '', '', '');

  submitted = false;

  constructor(
    private heroService: HeroService, private router: Router
  ) { }

  ngOnInit(): void {
    const hero = history.state.data;
    if (hero) {
      this.model.id = hero.id;
      this.model.name = hero.name;
      this.model.home = hero.home;
      this.model.phone = hero.phone;
    }
  }

  onSubmit() {
    const submit$ = this.model.id
      ? this.heroService.update(this.model)
      : this.heroService.create(this.model);
    submit$
      .subscribe((hero) => {
        this.model = hero;
        this.submitted = true;
        this.router.navigateByUrl('/heroes');
      });
  }

}
