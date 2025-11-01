import { Typography } from "@mui/material";
import DynamicForm from "../../../components/DynamicForm ";

function Profile() {
  const userToEdit = {
    firstName: "Maria",
    lastName: "Santos",
    gender: "Female",
    department: "HR",
    position: "Manager",
    // etc...
  };
  return (
    <div>
      <Typography>Profile</Typography>
      <DynamicForm editData={userToEdit} />;
    </div>
  );
}

export default Profile;
