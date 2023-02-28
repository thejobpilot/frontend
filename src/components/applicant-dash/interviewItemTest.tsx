import { PropaneSharp } from "@mui/icons-material";
import interviewItem from "./interviewItem";

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

export default function interviewTest(props: any) {
    const out = []
    for (let i = 0; i < 10; i++) {
        const randi = Math.floor(Math.random() * names.length);
        const item = interviewItem({
          title: names[randi],
          id: i,
          interviewOnClick: props.interviewOnClick,
        });
        out.push(item);
    }
    return out;
}