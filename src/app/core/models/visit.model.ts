import { Closed } from '../enums/closed.enum';

export class Visit {
  _id: string;
  active: boolean;
  closed: boolean | Closed;
  general: {
    company: string;
    date: Date;
    desiredSalary: number;
    notes: string;
    rating: number;
    uploadedCvId: string;
    _agency: string;
    _origin: string;
    _position: string;
  };
  office: {
    dateTime: Date;
    notes: string;
    planned: boolean;
    rating: number;
  };
  proposal: {
    date: Date;
    done: boolean;
    notes: string;
    probationDuration: number;
    probationSalary: number;
    salary: number;
  };
  skype: {
    dateTime: Date;
    rating: number;
    notes: string;
    planned: boolean
  };
}
