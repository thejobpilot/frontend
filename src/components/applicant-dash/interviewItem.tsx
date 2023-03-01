import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function interviewItem(props: any) {
    return (
      <ListItem
        button
        key={props.id}
        component="a"
        href={`../interview/${props.id}`}
        sx={{
          borderBottom: "1px solid #E0E0E0",
        }}
      >
        <ListItemText primary={props.title} />
      </ListItem>
    );
}