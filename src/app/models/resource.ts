export class Resource {
  id: number;

  isNewResource() {
    return null === this.id || undefined === this.id;
  }
}
