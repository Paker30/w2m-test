import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, pipe } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit, AfterViewInit {

  @ViewChild('searchHero', { static: false }) searchHero!: ElementRef;
  heroes: Hero[] = [];
  filteredHeroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => {
        this.heroes = heroes;
        this.filteredHeroes = heroes;
      });
  }

  ngAfterViewInit(): void {
    fromEvent(this.searchHero.nativeElement, 'keyup')
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
      )
      .subscribe((search: any) => {
        if(search) {
          const regex = new RegExp(`${search.target.value}`, 'gm');
          this.filteredHeroes = this.heroes.filter(({ name }) => name.match(regex));
        }
        else {
          this.filteredHeroes = this.heroes;
        }
      });
  }

  delete(id: string): void {
    this.heroService.delete(id)
      .subscribe(() => {
        this.heroes = this.heroes.filter((hero) => hero.id !== id);
      });
  }
}
