import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Candidate } from '../models/candidate.model';

@Injectable()
export class CandidatesService {

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>('api/candidates');
  }

  public create(candidate: Candidate): Observable<Candidate> {
    return this.http.post<Candidate>(`api/candidates`, candidate);
  }

  public delete(id: string): Observable<{}> {
    return this.http.delete(`api/candidates/${id}`);
  }
}

