import Button from "@mui/material/Button";

export default function positionItem(props: any) {
  return (
    <div key={props.key}>
      <Button
        onClick={() => {
            props.onClick(props.name)
        }} >
        Position: {props.name}
      </Button>
    </div>
  );
}
