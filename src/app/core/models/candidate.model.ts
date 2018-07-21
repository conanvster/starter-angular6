import { Visit } from './visit.model';

export interface Candidate {
  _id: string;
  _lastVisitAgency: string;
  _lastVisitPosition: string;
  address: string;
  birthYear: number;
  email: string;
  firstName: string;
  firstNameMfn: string;
  lastName: string;
  lastNameMfn: string;
  lastVisitDate: Date;
  linkedinUrl: string;
  notes: string;
  phone1: string;
  phone2: string;
  preferences: string;
  skypeId: string;
  pending: number;
  interviewStatus: string[];
  visits: Visit[];
}
