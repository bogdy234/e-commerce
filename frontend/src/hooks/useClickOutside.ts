import { RefObject, useEffect } from "react";

const useClickOutside = (
    ref: RefObject<HTMLDivElement>,
    cb: () => void
): void => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                ref.current &&
                !ref.current.contains(event.target as HTMLDivElement)
            ) {
                cb();
            }
        };

        document.addEventListener("mouseup", handleClickOutside);
        return () => {
            document.removeEventListener("mouseup", handleClickOutside);
        };
    }, [cb, ref]);
};

export default useClickOutside;
