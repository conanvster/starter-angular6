import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {

  @Input() public control: FormControl;
  @Input() public label: string;

  public checked(value: number): boolean {
    return this.control.value >= value;
  }

  changeValue(rating: number): void {
    this.control.setValue(this.control.value === rating ? rating - 1 : rating);
  }
}
