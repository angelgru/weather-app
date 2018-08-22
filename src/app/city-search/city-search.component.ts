import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { debounceTime } from '../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.css']
})
export class CitySearchComponent implements OnInit {
  myForm: FormGroup;
  search: AbstractControl;
  @Output() searchEvent: EventEmitter<string>;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      'search': [, Validators.minLength(2)]
    })

    this.search = this.myForm.controls.search;
    this.searchEvent = new EventEmitter();
   }

  ngOnInit() {
    this.search.valueChanges.pipe(debounceTime(2000)).subscribe(searchValue => {
      if(searchValue) {
        this.searchEvent.emit(searchValue);
      }
    })
  }

}
