import Button from "@mui/material/Button";
import { FC, useState } from "react";
import useStyles from "./style";

interface CounterProps {}

const Counter: FC<CounterProps> = () => {
    const classNames = useStyles();
    const [count, setCount] = useState<number>(0);

    return (
        <Button
            variant="contained"
            onClick={() => setCount(count + 1)}
            size="large"
            className={classNames.text_alb}
        >
            {count}
        </Button>
    );
};

export default Counter;
