import { Injectable } from '@angular/core';
import { ISkills } from '../models/skills.model';
import { Observable, of } from 'rxjs';

@Injectable()
export class SkillsService {
  constructor() {}

  public postSkills(skills: ISkills): Observable<any> {
    // return this.httpClient.post<ISkills>('api/skills', skills);
    return of(skills);
  }
}
