/* eslint-disable no-unused-vars */
import * as React from "react";
import { Link } from "react-router-dom";

//material imports
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";

//context imports
import { ModalContext } from "../../contexts/ModalContext";
import {
  CreateFinances,
  DeleteFinances,
  EditFinances,
} from "../modalComponents";

//icon imports
import { MdOutlineDeleteSweep } from "react-icons/md";
import { BsFilterRight } from "react-icons/bs";
import { IoFilterCircleOutline } from "react-icons/io5";

import axios from "axios";
import { useEffect } from "react";
import { TbUserEdit } from "react-icons/tb";
import { useContext } from "react";

function createData(
  id,
  name,
  debtAmount,
  debtPaid,
  debtTotal,
  status,
  adminId,
  actions
) {
  const orderStatus = (status) => {
    if (status === "cleared") {
      return {
        background: "cyan",
        color: "black",
      };
    } else if (status === "pending") {
      return {
        background: "#f7b900",
        color: "white",
      };
    } else if (status === "declined") {
      return {
        background: "red",
        color: "white",
      };
    } else {
      return {
        background: "transparent",
        color: "black",
      };
    }
  };

  const { background, color } = orderStatus(status);

  return {
    id,
    name,
    debtAmount,
    debtPaid,
    status,
    background: background,
    color: color,
    debtTotal,
    actions,
    adminId,
  };
}

const date = new Date();
const formattedDate = date.toLocaleDateString({
  weekday: "numeric",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  timestamps: "numeric",
});

const rows = [
  createData(1, "edgar", 3000, 1000, 2000, "cleared", 1),
  createData(2, "sam", 4000, 2000, 2000, "pending", 1),
  createData(3, "allan", 2000, 600, 2000, "declined", 2),
  createData(4, "denno", 3000, 1500, 2000, "pending", 1),
  createData(5, "peter", 2000, 700, 2000, "declined", 1),
  createData(6, "paul", 2000, 1600, 2000, "cleared", 2),
  createData(7, "robert", 2000, 1000, 2000, "pending", 3),
  createData(8, "sharon", 2000, 1500, 2000, "cleared", 1),
  createData(9, "daniel", 3000, 2000, 2000, "cleared", 3),
  createData(10, "hope", 1500, 1000, 2000, "cleared", 3),
  createData(11, "aaron", 1000, 1000, 2000, "pending", 2),
  createData(12, "aariela", 2000, 2000, 2000, "pending", 1),
  createData(13, "leticia", 3000, 1000, 2000, "declined", 2),
];

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

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "DebtOwner",
  },
  {
    id: "debtAmount",
    numeric: true,
    disablePadding: false,
    label: "CurrentDebt",
  },
  {
    id: "debtPaid",
    numeric: true,
    disablePadding: false,
    label: "DebtCleared",
  },
  {
    id: "debtTotal",
    numeric: true,
    disablePadding: false,
    label: "BalanceDebt",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "adminId",
    numeric: true,
    disablePadding: false,
    label: "AdminId",
  },
  {
    id: "actions",
    numeric: true,
    disablePadding: false,
    label: "Actions",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow className="bg-yellow">
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            // align={headCell.numeric ? "right" : "left"}
            align="center"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  //context
  const { setOpenDeleteRecord } = useContext(ModalContext);

  const handleDelete = ({ selected }) => {
    setOpenDeleteRecord(true);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Financial Tracking...
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={handleDelete}>
            {/* <DeleteIcon /> */}
            <MdOutlineDeleteSweep size={24} color="black" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            {/* <FilterListIcon /> */}
            <BsFilterRight size={24} color="black" />
            {/* <IoFilterCircleOutline size={24} color="black" /> */}
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
    fetchFinances();
  }, []);

  const fetchFinances = async () => {
    try {
      // const res = await axios.get(getUserUrl);
      // console.log(res.data.users);
      // setData(res.data.users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  //context
  const { setOpenCreateRecord, setOpenEditRecord } =
    React.useContext(ModalContext);

  const [selectedRecordData, setSelectedRecordData] = React.useState(null);
  const handleRowClick = (userData) => {
    selectedRecordData(userData);
  };

  const handleOpen = () => {
    // console.log("create User opened");
    setOpenCreateRecord(true);
  };

  const handleClickEdit = (userData) => {
    console.log("edit User opened");
    setOpenEditRecord(true);
    selectedRecordData(userData);
  };

  return (
    <div className="surface-ground px-0 py-1 md:px-4 lg:px-6 ">
      <div className="flex flex-col">
        <div className="flex justify-end items-end p-0 gap-10">
          <div
            className={`rounded button-yellow mb-1 text-[14px] text-center py-2 col-12`}
            onClick={handleOpen}
          >
            <span className="text-black w-full">Add New Record</span>
          </div>
        </div>

        <Box sx={{ width: "100%" }} c="true">
          <Paper sx={{ width: "100%", mb: 2 }}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {visibleRows.map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                        sx={{ cursor: "pointer" }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                            name="label"
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          align="center"
                        >
                          {row.name}
                        </TableCell>
                        <TableCell align="center">{row.debtAmount}</TableCell>
                        <TableCell align="center">{row.debtPaid}</TableCell>
                        <TableCell align="center">{row.debtTotal}</TableCell>
                        <TableCell align="center" className="relative">
                          {/* {row.status} */}{" "}
                          <span>
                            <span
                              style={{
                                backgroundColor: row.background,
                              }}
                              className="status"
                            ></span>
                            {row.status}
                          </span>
                        </TableCell>
                        <TableCell align="center" className="relative">
                          {row.adminId}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton size="xs" onClick={handleClickEdit}>
                            <TbUserEdit size={20} color="black" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 20 : 30) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
          />
        </Box>

        <CreateFinances fetchData={fetchFinances} />
        <DeleteFinances
          fetchData={fetchFinances}
          selectedRecordData={selectedRecordData}
        />
        <EditFinances
          selectedRecordData={selectedRecordData}
          fetchData={fetchFinances}
        />
      </div>
    </div>
  );
}
