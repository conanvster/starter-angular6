import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss']
})
export class ProposalComponent {

  @Input() public form: FormGroup;

  public periods: string[] = ['1 Month', '2 Month', '3 Month', '4 Month'];

}
