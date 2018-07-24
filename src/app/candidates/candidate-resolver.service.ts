import { Injectable } from '@angular/core';
import {
  Router, Resolve, RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Candidate } from '../core/models/candidate.model';
import { CandidatesService } from '../core/services/candidates.service';



@Injectable()
export class CandidateResolverService implements Resolve<Candidate> {
  constructor(private candidateService: CandidatesService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Candidate> {
    return this.candidateService.getOne(route.paramMap.get('id')).pipe(
      tap((candidate: Candidate) => {
        if (!candidate) {
          this.router.navigate(['/']);
        }
      })
    );
  }
}
