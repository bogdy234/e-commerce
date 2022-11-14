import Button from "@mui/material/Button";
import { FC, useState } from "react";

interface CounterProps {}

const Counter: FC<CounterProps> = () => {
    const [count, setCount] = useState<number>(0);

    return (
        <Button
            variant="contained"
            onClick={() => setCount(count + 1)}
            size="large"
        >
            {count}
        </Button>
    );
};

export default Counter;
