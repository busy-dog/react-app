import { isNullish } from 'remeda';

function* sink<T>(
  data: T[],
  compare: (pre: T, cur: T) => number,
  start = 0,
  end = data.length - 1
) {
  let index = start;
  while (index <= end) {
    const childs = [2 * index + 1, 2 * index + 2];
    const target =
      !isNullish(data[childs[1]]) && childs[1] <= end
        ? compare(...(childs.map((index) => data[index]) as [T, T])) > 0
          ? childs[0]
          : childs[1]
        : childs[0];

    if (compare(data[target], data[index]) > 0 && target <= end) {
      [data[index], data[target]] = [data[target], data[index]];
      yield structuredClone(data);
      index = target;
    } else {
      break;
    }
  }
}

function* building<T>(data: T[], compare: (pre: T, cur: T) => number) {
  const end = data.length - 1;
  let index = Math.floor((end - 1) / 2);
  while (index >= 0) {
    yield* sink(data, compare, index);
    index--;
  }
}

export function* heap<T>(data: T[], compare: (pre: T, cur: T) => number) {
  yield* building(data, compare);

  for (let index = data.length - 1; index >= 1; index--) {
    [data[index], data[0]] = [data[0], data[index]];
    yield structuredClone(data);
    if (index > 0) yield* sink(data, compare, 0, index - 1);
  }

  return;
}
