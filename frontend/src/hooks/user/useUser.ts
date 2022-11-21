import UserContext from "contexts/UserProvider";
import { useContext } from "react";

const useUser = () => useContext(UserContext);

export default useUser;
