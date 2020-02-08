import {PlantStage} from './plant-stage';
import {Resource} from './resource';
import {Exclude, Expose, Type} from 'class-transformer';

export class Plant extends Resource {
  static exampleData: Plant[] = [];

  name: string;

  @Expose({ name: 'plantStages' })
  @Exclude({ toPlainOnly: true })
  @Type(() => PlantStage)
  stages: PlantStage[] = [];

  @Expose()
  @Type(() => PlantStage)
  get plantStagesAttributes(): PlantStage[] {
    return this.stages;
  }

  addStage() {
    this.stages.push(new PlantStage());
    this.recomputePositions();
  }

  removeStage(stageIndex: number) {
    this.stages[stageIndex].deleted = true;
  }

  clearStages() {
    this.stages = this.stages.filter(stage => false === stage.deleted);
  }

  recomputePositions() {
    for (let i = 0; i < this.stages.length; i++) {
      this.stages[i].position = i + 1;
    }

    let position = 1;
    for (const stage of this.stages) {
      if (true !== stage.deleted) {
        stage.position = position;

        position++;
      }
    }
  }
}
