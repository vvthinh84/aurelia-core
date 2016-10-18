

export class jsonValueConverter {
  toView(value) {
    return JSON.stringify(value, null,4);
  }
}
