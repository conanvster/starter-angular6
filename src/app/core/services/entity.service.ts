import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Agency } from '../models/agency.model';
import { Origin } from '../models/origin.model';
import { Position } from '../models/position.model';

@Injectable()
export class EntityService {

  private entityCache: { [name: string]: Agency[] | Origin[] | Position[] } = {};

  constructor(private http: HttpClient) {
  }

  public getAgencies(): Observable<Agency[]> {
    return this.getEntities('agency');
  }

  public getPositions(): Observable<Position[]> {
    return this.getEntities('position');
  }

  public getOrigins(): Observable<Origin[]> {
    return this.getEntities('origin');
  }

  private getEntities(entity: string): Observable<Agency[] | Origin[] | Position[]> {
    if (this.entityCache && this.entityCache[entity]) {
      return of(this.entityCache[entity]);
    }
    return this.http.get<Agency[] | Origin[] | Position[]>(`api/entities/${entity}`)
      .pipe(tap((data) => {
        this.entityCache[entity] = data;
      }));
  }
}

