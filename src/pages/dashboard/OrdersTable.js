import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
// material-ui
import {
  Box,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

// third-party
import NumberFormat from "react-number-format";

import { useEffect } from "react";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: "rollNo",
    align: "left",
    disablePadding: false,
    label: "Roll Number",
  },
  {
    id: "name",
    align: "left",
    disablePadding: true,
    label: "Student Name",
  },
  {
    id: "guest",
    align: "center",
    disablePadding: false,
    label: "Diners",
  },
  // {
  //     id: 'cost',
  //     align: 'left',
  //     disablePadding: false,
  //     label: 'Cost'
  // },
  {
    id: "cost",
    align: "right",
    disablePadding: false,
    label: "Total Amount",
  },
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// ==============================|| ORDER TABLE - STATUS ||============================== //

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable() {
  const [order] = useState("asc");
  const [orderBy] = useState("rollNo");
  const [selected] = useState([]);
  const [data, setData] = useState([]);
  const isSelected = (rollNo) => selected.indexOf(rollNo) !== -1;

  useEffect(() => {
    // { rollNo, name, guest, cost }
    /* 
            [
                {
                    "_id": "63c0f72f0747ff00150b5c79",
                    "name": "Saurabh Pawar",
                    "id": "191080005",
                    "numberOfGuests": 1,
                    "extraFood": 1,
                    "date": "13/1/2023",
                    "time": "11:46:15 am",
                    "__v": 0
                },
            ]
        */
    (async () => {
      const data = await axios.get("http://localhost:5000/api/entry/today");
      const entries = data.data.entries;
      setData(
        entries.map((entry) => {
          return {
            rollNo: entry["id"],
            name: entry["name"],
            guest: entry["numberOfGuests"],
            cost:
              70 +
              70 * parseInt(entry["numberOfGuests"]) +
              90 * parseInt(entry["extraFood"]),
          };
        })
      );
    })();

    // console.log(entries.map(entry => {
    //     return {
    //         rollNo: entry['id'],
    //         name: entry['name'],
    //         guest: entry['numberOfGuests'],
    //         cost: 70 * parseInt(entry['numberOfGuests']) + 90 * parseInt(entry['extraFood'])
    //     }
    // }));
  }, []);

  return (
    <Box>
      <TableContainer
        sx={{
          width: "100%",
          overflowX: "auto",
          position: "relative",
          display: "block",
          maxWidth: "100%",
          "& td, & th": { whiteSpace: "nowrap" },
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            "& .MuiTableCell-root:first-child": {
              pl: 2,
            },
            "& .MuiTableCell-root:last-child": {
              pr: 3,
            },
          }}
        >
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {stableSort(data, getComparator(order, orderBy)).map(
              (row, index) => {
                const isItemSelected = isSelected(row.rollNo);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.rollNo}
                    selected={isItemSelected}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      align="left"
                    >
                      <Link color="secondary" component={RouterLink} to="">
                        {row.rollNo}
                      </Link>
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="center">1 + {row.guest}</TableCell>
                    {/* <TableCell align="left">
                                        <OrderStatus status={row.cost} />
                                    </TableCell> */}
                    <TableCell align="right">
                      <NumberFormat
                        value={row.cost}
                        displayType="text"
                        thousandSeparator
                        prefix="₹"
                      />
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
