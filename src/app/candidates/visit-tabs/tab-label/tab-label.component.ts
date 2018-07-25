import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Closed } from '../../../core/enums/closed.enum';

@Component({
  selector: 'app-candidates-visit-tabs-label',
  templateUrl: './tab-label.component.html',
  styleUrls: ['./tab-label.component.scss']
})
export class TabLabelComponent implements OnInit {

  @Input() public visit: FormGroup;
  @Input() private tabIndex: number;
  @Output() public closeVisit = new EventEmitter<Closed>();
  @Output() public reopenVisit = new EventEmitter();
  @Output() public removeVisit = new EventEmitter();

  public closed;

  ngOnInit() {
    this.closed = Closed;
  }

  public closedValue(match?: Closed): boolean | Closed {
    return match ?
      this.visit.get('closed').value === match :
      this.visit.get('closed').value;
  }

  public close(type: Closed): void {
    this.closeVisit.emit(type);
  }

  public reopen(): void {
    this.reopenVisit.emit(this.tabIndex);
  }

  public remove(): void {
    this.removeVisit.emit();
  }
}
