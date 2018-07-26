import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {

  @Input() public rating: FormControl;
  @Input() public label: string;

  public checked(value: number): boolean {
    return this.rating.value >= value;
  }

  changeValue(rating: number): void {
    this.rating.setValue(this.rating.value === rating ? rating - 1 : rating);
  }
}
