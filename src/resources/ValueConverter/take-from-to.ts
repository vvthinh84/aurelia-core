export class TakeFromToValueConverter {
  toView(array, from, to) {
    if (array) {
      array = array.slice(from, to)
    }
    return array;
  }
}
