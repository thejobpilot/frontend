import Button from "@mui/material/Button";

export default function interviewItem(props: any) {
    return (
      <div>
        <Button href={`../interview/${props.id}`} target="_blank" >Interview: {props.name}</Button>
      </div>
    );
}