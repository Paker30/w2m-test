import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hero } from './hero';
import { Observable } from 'rxjs';

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

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`http://localhost:3000/${this.heroesUrl}`);
  }

  getHero(id: string): Observable<Hero> {
    return this.http.get<Hero>(`http://localhost:3000/${this.heroesUrl}/${id}`);
  }

  delete(id: string): Observable<Hero> {
    return this.http.delete<Hero>(`http://localhost:3000/${this.heroesUrl}/${id}`);
  }
}
