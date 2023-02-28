import positionItem from "./positionItem";

const names = [
  "Harry",
  "Ross",
  "Bruce",
  "Cook",
  "Carolyn",
  "Morgan",
  "Albert",
  "Walker",
  "Randy",
  "Reed",
  "Larry",
  "Barnes",
  "Lois",
  "Wilson",
  "Jesse",
  "Campbell",
  "Ernest",
  "Rogers",
  "Theresa",
  "Patterson",
  "Henry",
  "Simmons",
  "Michelle",
  "Perry",
  "Frank",
  "Butler",
  "Shirley",
];

export default function positionTest() {
  const out = [];
  for (let i = 0; i < 10; i++) {
    const randi = Math.floor(Math.random() * names.length);
    const item = positionItem({ name: names[randi], id: i });
    out.push(item);
  }
  return out;
}
