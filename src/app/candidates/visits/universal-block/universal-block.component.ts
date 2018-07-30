import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-universal-block',
  templateUrl: './universal-block.component.html',
  styleUrls: ['./universal-block.component.scss']
})
export class UniversalBlockComponent {

  @Input() public blockName: string;
  @Input() public form: FormGroup;

}
