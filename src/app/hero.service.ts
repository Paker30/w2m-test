import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hero } from './hero';
import { map, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

const heroes = [
  { "id": "1", "name": "carpanta", "home": "calle del bocata 13", "phone": "123-123" },
  { "id": "2", "name": "anacleto", "home": "classified info", "phone": "999-111" },
  { "id": "3", "name": "batman", "home": "big scary mansion", "phone": "777-333" }
];

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'heroes';

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`http://localhost:3000/${this.heroesUrl}`);
  }

  get(id: string): Observable<Hero> {
    return this.http.get<Hero>(`http://localhost:3000/${this.heroesUrl}/${id}`);
  }

  getByNameTerm(term: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`http://localhost:3000/${this.heroesUrl}`)
    .pipe(
      map((heroes) => {
        const regex = new RegExp(`${term}`, 'gm');
        return heroes.filter(({ name }) => name.match(regex));
      })
    );
  }

  delete(id: string): Observable<Hero> {
    return this.http.delete<Hero>(`http://localhost:3000/${this.heroesUrl}/${id}`);
  }

  create(hero: Hero): Observable<Hero> {
    hero.id = uuidv4();
    return this.http.post<Hero>(`http://localhost:3000/${this.heroesUrl}`, hero);
  }

  update(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(`http://localhost:3000/${this.heroesUrl}/${hero.id}`, hero);
  }
}
