import {Box, List, ListItem, ListItemText, Typography} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";

function getInterviewByID(user: any, id: number) {
    if (!user.interviews) return null;
    for (let i = 0; i < user.interviews.length; i++) {
        if (user.interviews[i].id === id) return user.interviews[i];
    }
}

function getPosByID(user: any, id: number) {
    if (!user.positions) return null;
    for (let i = 0; i < user.positions.length; i++) {
        if (user.positions[i].id === id) return user.positions[i];
    }
}

export default function PositionList(props: any) {
    const handleBackClick = () => {
        props.interviewSelector(null);
        props.positionSelector(null);
        props.responseSelector(null);
    };

    if (props.isLoading || !props.data) return <div>Loading...</div>;
    if (props.error) return <div>{props.error.message}</div>;
    // @ts-ignore
    // @ts-ignore
    return (
        <Box
            sx={{
                p: 3,
                bgcolor: "white",
                color: "black",
                position: "absolute",
                top: 55,
                left: 0,
                height: "100%",
                width: "30%",
            }}
        >
            <Typography
                variant="h5"
                sx={{bgcolor: "#111E31", color: "white", p: 2, textAlign: "center"}}
            >
                {props.selected.position != null ? (
                    <Box sx={{display: "flex", alignItems: "center"}}>
                        <ArrowBack
                            sx={{mr: 2, cursor: "pointer"}}
                            onClick={handleBackClick}
                        />
                        <Typography variant="h5">
                            {props.selected.position.name}
                        </Typography>
                    </Box>
                ) : (
                    "Positions"
                )}
            </Typography>
            <List>
                {props.selected.position == null
                    ? props.data.positions.map((position: any) => (
                        <ListItem
                            key={position.id}
                            button
                            onClick={() => {
                                props.positionSelector(position)
                                props.responseSelector(null)
                            }}
                            sx={{borderBottom: "1px solid #E0E0E0"}}
                        >
                            <ListItemText primary={position.name}/>
                        </ListItem>
                    ))
                    : props.selected.position.interviews?.map((interview: any) => (
                        <ListItem
                            key={interview.id}
                            button
                            selected={props.selected.interview && interview === props.selected.interview}
                            onClick={() => {
                                props.interviewSelector(interview)
                                props.responseSelector(null)
                            }}
                            sx={{borderBottom: "1px solid #E0E0E0"}}
                        >
                            <ListItemText primary={interview.name}/>
                            <h2>{props.interview}</h2>
                        </ListItem>
                    ))}
            </List>
        </Box>
    );
}
