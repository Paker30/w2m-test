import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';

const heroes = [
  { "id": "1", "name": "carpanta", "home": "calle del bocata 13", "phone": "123-123" },
  { "id": "2", "name": "anacleto", "home": "classified info", "phone": "999-111" },
  { "id": "3", "name": "batman", "home": "big scary mansion", "phone": "777-333" }
];

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes = heroes;
  selectedHero?: Hero;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
