import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import NoDataFound from '../../Images/noDatas.svg';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from "@material-ui/icons/Delete";
import PaymentsIcon from '@mui/icons-material/Payments';
import "./table.scss";
// import DeleteMedia from "./DeleteMedia";
import { Spin } from 'antd';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import DownloadIcon from '@mui/icons-material/Download';
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();

  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {console.log(page, "page")}
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

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
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const {
    classes,
    order,
    orderBy,
    onRequestSort,
    headCells,
    EnableSno,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className={"tableHead"}>
      <TableRow>
          <TableCell padding="checkbox" 
           align={"left"}
           padding={"default"}
          className="tableHeadsno">
            S.No
          </TableCell>
        {headCells.map((headCell) => (

          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
            // hideSortIcon={headCell.id?true:false}
          >
            {console.log(headCell.id, orderBy, "headcell")}

            {headCell.id?
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              // icon={}
              hideSortIcon={orderBy===headCell.id?true:false}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>:
            <>{headCell.label}</>
              }
           
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  inactiveSortIcon: {
    display:'none',
  },
}));

export default function EnhancedTable(props) {
  const classes = useStyles();
  const [deleteview,setdeleteview]=useState(false)
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  React.useEffect(() => {
    if(props.rows){
    setRows(props.rows);
    // if(!props.Resume&&!props.var_rate)
    // setPage(0)
    }
  console.log("newpage",props.rows)
  }, [props.rows]);


  // React.useEffect(() => {
  //   for(let i=0;i<(props.rows.length/rowsPerPage);i++){
  //     page
  //     setPage(i) 
  //     console.log(i,"testlength")
  //   }

  // }, [props.rows]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
 console.log("selected",selected)
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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
  
    setRowsPerPage(parseInt(event.target.value));
    setPage(0)
   
  };
 


  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows && rows.length - page * rowsPerPage);
  console.log("pagination",emptyRows)
  
  return (
    // <Spin className="spinner_align" spinning={props.props_loading}>
    <div className={classes.root}>
     {console.log("perpage",rowsPerPage,page)}
      {/* <Paper className={classes.paper}> */}
      <div className="tableTitle">{props.tabletitle}</div>
      <TableContainer>
        <Table
          className={`${classes.table} ${props.aligncss}`}

          aria-labelledby="tableTitle"
          size={"small"}
          aria-label="enhanced table"

        >
          <EnhancedTableHead
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            EnableSno={props.EnableSno}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            headCells={props.headCells}
            className={props.aligncss}
          />
          <TableBody>
            {rows.length > 0 ?
              stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);

                  let keys = Object.keys(row);
                  let arrval = [];
                  // let idLenght= props.idLenght? props.idLenght:0
                  {[row].map((data)=>{
                  for (var m = 0; m < keys.length-2; m++) {
                    arrval.push(
                      <TableCell keys={index + "" + m} align="left">
                        {data[keys[m]] ? data[keys[m]] : "---"}
                      </TableCell>
                    );
                  }
                })}
                    //  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}

                    >
                      {/* {props.EnableSno && ( */}
                        <TableCell align="left">
                          {rowsPerPage * page -1+index + 2}
                        </TableCell>
                      {/* )} */}
                      {arrval}
                {props.actionclose==="close"?null:
              <TableCell className={`${props.tableicon_align}`}>
              {props.VisibilityIcon==="close"?null:
              <VisibilityIcon className="tableeye_icon"  onClick={()=>props.modelopen("view",row.id,row)}/>}
              {props.EditIcon==="close"?null:
             <EditIcon className="tableedit_icon" onClick={()=>props.modelopen("edit",row.id,row)}/>}
              {props.DeleteIcon==="close"?null:
              <DeleteIcon className="tabledelete_icon" onClick={() =>props.deleteMedia("delete",row.id)}/>} 
                {props.ApproveIcon==="open"?
              <AutorenewIcon className="tabledelete_icon" onClick={() =>props.modelopen("status",row.id)}/>:null} 
               {props.DownLoad==="open"?
              <DownloadIcon className="tabledelete_icon" onClick={() =>props.modelopen("download",row.id)}/>:null} 
               {props.Pay==="open"?
              <PaymentsIcon className="tableedit_icon" onClick={() =>props.modelopen("pay",row.id,row)}/>:null}  
              </TableCell>}
                    </TableRow>
                  );
                })
              :
              <TableCell colSpan={12} className="nodatafound">
                <img src={NoDataFound} />
                <div className="nodatatext">No Data Found</div>

              </TableCell>
              }
            {rows.length > 0 && emptyRows > 0 && (
              <TableRow style={{ height: 33 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {console.log(rows.length, "rrrr")}
      {rows.length > 5 && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      )}
      {/* </Paper> */}
      {/* <DynModel  handleChangeModel={props.deleteview} modelTitle={"Delete"} handleChangeCloseModel={props.deleteMedia} width={400}
         content ={<DeleteMedia handleChangeCloseModel={props.deleteMedia}/> }/> */}
    </div>
    // </Spin>
  );
}
