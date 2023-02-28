import Button from "@mui/material/Button";

export default function positionItem(props: any) {
  return (
    <div>
      <Button href={`../interview/${props.id}`}>
        Interview: {props.name}
      </Button>
    </div>
  );
}
