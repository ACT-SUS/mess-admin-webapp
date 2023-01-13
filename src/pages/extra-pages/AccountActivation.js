import axios from "axios";
import MainCard from "components/MainCard";
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
// import { acc_activation_data } from "./acc_activation_data";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Stack } from "@mui/material";
import Dot from "components/@extended/Dot";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from '@mui/icons-material/Close';

const OrderStatus = ({ status }) => {
  let color;
  let title;

  switch (status) {
    case "pending":
      color = "warning";
      title = "Pending";
      break;
    case "approved":
      color = "success";
      title = "Approved";
      break;
    case "rejected":
      color = "error";
      title = "Rejected";
      break;
    default:
      color = "primary";
      title = "None";
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

function SimpleDialog({ open, onClose, pdf, sid }) {
  const onApprove = async () => {
    const data = await axios.put(
      `http://localhost:5000/api/admin/approve/${sid}`
    );
    console.log(data);
  };

  const onReject = async () => {
    const data = await axios.put(
      `http://localhost:5000/api/admin/reject/${sid}`
    );
    console.log(data);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>
        <Typography variant="h5">Verify Fee Receipt</Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
        <CloseIcon />
        </IconButton>
      </DialogTitle>
      <iframe src={pdf} title="asa" width="500px" height="700px"></iframe>
      <DialogActions>
        <Button variant="outlined" color="error" onClick={onReject}>
          Reject
        </Button>
        <Button variant="contained" color="success" onClick={onApprove}>
          Approve
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const AccountActivation = () => {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState("pending");
  const [acc_activation_data, setAccActData] = useState([]);

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    (async () => {
      const data = await axios.get(`http://localhost:5000/api/admin/${status}`);
      const students = data.data.students;
      console.log(students);
      setAccActData(students);
    })();
  }, [status]);

  return (
    <MainCard>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Filter by Status</InputLabel>
        <Select value={status} onChange={handleChange} label="Status">
          <MenuItem value={"pending"}>
            <OrderStatus status={"pending"} />
          </MenuItem>
          <MenuItem value={"approved"}>
            <OrderStatus status={"approved"} />
          </MenuItem>
          <MenuItem value={"rejected"}>
            <OrderStatus status={"rejected"} />
          </MenuItem>
        </Select>
      </FormControl>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Roll Num</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="center">Fee Receipt</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {acc_activation_data.map((x, y) => (
              <>
                {x.status === status ? (
                  <TableRow
                    key={y}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{x.sid}</TableCell>
                    <TableCell align="left">
                      {x.firstName}
                      {x.lastName}
                    </TableCell>
                    <TableCell align="left">
                      <OrderStatus status={x.status} />
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={handleClickOpen}
                        variant="outlined"
                        color="error"
                      >
                        View Fee Receipt
                      </Button>
                    </TableCell>
                    <SimpleDialog
                      pdf={x.feeReceipt}
                      open={open}
                      onClose={handleClose}
                      sid={x.sid}
                    />
                  </TableRow>
                ) : null}
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
};

export default AccountActivation;
