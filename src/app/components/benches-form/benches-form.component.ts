import {Component, Input, ViewChild} from '@angular/core';
import {PaginatedResource} from '../../models/paginated-resource';
import {Bench, Greenhouse} from '../../models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PaginatorComponent} from '..';
import {BenchService} from '../../services/http';

@Component({
  selector: 'app-benches-form',
  templateUrl: './benches-form.component.html',
  styleUrls: ['./benches-form.component.scss']
})
export class BenchesFormComponent {
  cachedBenches: Bench[];
  cachedBenchFormGroups: FormGroup[];
  cachedBenchesPaginator: PaginatorComponent<Bench>;

  @Input()
  greenhouse: Greenhouse;

  @ViewChild('benchesPaginator', {static: false})
  set benchesPaginator(benchesPaginator: PaginatorComponent<Bench>) {
    if (null == this.cachedBenchesPaginator && benchesPaginator instanceof PaginatorComponent) {
      this.cachedBenchesPaginator = benchesPaginator;
      this.listenBenchesPageChange();
    }
  }

  constructor(protected formBuilder: FormBuilder,
              protected httpBenchService: BenchService) {
  }

  listenBenchesPageChange() {
    this.cachedBenchesPaginator.pageChange.subscribe({
      next: benchesPaginatedResource => this.initBenchForms(benchesPaginatedResource)
    });
  }

  initBenchForms(benchesPaginatedResource: PaginatedResource<Bench>) {
    this.cachedBenches = benchesPaginatedResource.items;
    this.cachedBenchFormGroups = this.cachedBenches.map(bench => this.createGreenhouseBenchFormGroup(bench));
  }

  createGreenhouseBenchFormGroup(bench: Bench): FormGroup {
    return this.formBuilder.group({
      name: this.formBuilder.control(bench.name, [
        Validators.required
      ]),
      shape: this.formBuilder.control(bench.shape, [
        Validators.required
      ]),
      dimensions: this.formBuilder.array(bench.dimensions, [
        Validators.required
      ])
    });
  }

  pushBench() {
    const newBench = new Bench();

    this.cachedBenches.push(newBench);
    this.cachedBenchFormGroups.push(this.createGreenhouseBenchFormGroup(newBench));
  }

  removeBench(i: number) {
    this.httpBenchService.delete(this.cachedBenches[i].id).subscribe({
      next: () => {
        this.cachedBenches.splice(i, 1);
        this.cachedBenchFormGroups.splice(i, 1);
      }
    });
  }

  valid(): boolean {
    for (const formGroup of this.cachedBenchFormGroups) {
      if (formGroup.invalid) {
        return false;
      }
    }

    return true;
  }

  saveBenches() {
    return this.httpBenchService.saveAllForms(this.cachedBenches, this.cachedBenchFormGroups);
  }
}
