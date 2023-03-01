import { PropaneSharp } from "@mui/icons-material";
import interviewItem from "./interviewItem";

const companies = [
  "Ut Consulting",
  "Sit Amet Diam PC",
  "Risus Quisque Company",
  "Eu Arcu Ltd",
  "Nulla Facilisis Ltd",
  "Vivamus Vel LLP",
  "Pellentesque Ultrices Corporation",
  "Aenean Nec Nisi Inc.",
  "Fusce At Magna Industries",
  "Suspendisse Ac Metus Company",
  "Integer Lacinia LLC",
  "Vestibulum Ante Ipsum Limited",
  "Donec Egestas Consulting",
  "Mauris Vulputate LLC",
  "Aliquam Eros Limited",
  "Fusce Consectetuer Corporation",
  "Cras Eu Tellus Associates",
  "Pellentesque Sed Industries",
];



export default function interviewTest(props: any) {
    const out = []
    for (let i = 0; i < 10; i++) {
        const randi = Math.floor(Math.random() * companies.length);
        const item = interviewItem({
          title: companies[randi],
          id: i,
          interviewOnClick: props.interviewOnClick,
        });
        out.push(item);
    }
    return out;
}