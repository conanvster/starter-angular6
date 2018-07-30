import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Agency } from '../../../core/models/agency.model';
import { Origin } from '../../../core/models/origin.model';
import { Position } from '../../../core/models/position.model';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent {

  @Input() public form: FormGroup;
  @Input() public agencies: Agency[];
  @Input() public positions: Position[];
  @Input() public origin: Origin[];

}
