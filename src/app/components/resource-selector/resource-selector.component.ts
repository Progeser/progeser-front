import {Component, Input, OnInit} from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';
import {ResourceService} from '../../services/http/resource/resource.service';
import {Resource} from '../../models';

@Component({
  selector: 'app-resource-selector[resourceService]',
  templateUrl: './resource-selector.component.html',
  styleUrls: ['./resource-selector.component.scss']
})
export class ResourceSelectorComponent<T extends Resource> implements OnInit, ControlValueAccessor {
  @Input()
  resourceService: ResourceService<T>;

  @Input()
  label: string;

  protected value: T;

  constructor() { }

  ngOnInit() {
  }

  registerOnChange(fn: any): void {
    // todo
  }

  registerOnTouched(fn: any): void {
    // todo
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(resource: T): void {
    this.value = resource;
  }

}
