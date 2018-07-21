import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Candidate } from '../models/candidate.model';

@Injectable()
export class CandidatesService {

  constructor(private http: HttpClient) {
  }

  public getCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>('api/candidates');
  }

  public delete(id: string): Observable<{}> {
    return this.http.delete(`api/candidates/${id}`);
  }
}

