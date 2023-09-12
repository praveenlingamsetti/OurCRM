import React, { useState, useEffect } from "react";
import api from "../../util/api";
import { Card } from "react-bootstrap";
import "./index.css";
import { DataGrid } from "@mui/x-data-grid";
const SalesPersonReport = () => {
  // Get the current date and format it for the default start and end date
  const currentDate = new Date();
  const year1 = currentDate.getFullYear();
  const month1 = currentDate.getMonth();
  const formattedFirstDay = `${year1}-${(month1 + 1)
    .toString()
    .padStart(2, "0")}-01`;
  const year2 = currentDate.getFullYear();
  const month2 = currentDate.getMonth();
  const currentDayOfMonth = new Date();
  const formattedLastDay = `${year2}-${(month2 + 1)
    .toString()
    .padStart(2, "0")}-${currentDayOfMonth
    .getDate()
    .toString()
    .padStart(2, "0")}`;
  // Initialize state variables for start date, end date, task data, salespersons, and more
  const [startDate, setStartDate] = useState(formattedFirstDay);
  const [endDate, setEndDate] = useState(formattedLastDay);
  const [Task, SetTasks] = useState([]);
  const [salesPerson, SetsalesPerson] = useState([]);
  const [salesPersonIdData, SetSalespersonsIdData] = useState([]);
  const [sales, setSales] = useState("");
  const [isFilter, setIsFilter] = useState(false);
  // Fetch all salespersons data from the API
  useEffect(() => {
    var salespersonurl = "/app/getAllSalesPerson";
    api
      .get(salespersonurl)
      .then((responseJson) => {
        SetsalesPerson(responseJson.data);
        // console.log(responseJson.data)
      })
      .catch((error) => ({}));
  }, []);
  // Handle the filter button click to fetch filtered task data
  const handleFilter = () => {
    setIsFilter(true);
    api.get(`app/getSalesPerson/${sales}`).then((res) => {
      SetSalespersonsIdData(res.data?.user?.userName);
    });
    var url = `/task/getAllTaskByDateRangeBySalesperson/${startDate}/${endDate}/${sales}`;
    // console.log(url)
    api
      .get(url)
      .then((responseJson) => {
        SetTasks(responseJson.data);
        // console.log(responseJson.data)
      })
      .catch((error) => ({}));
  };
  // Create an array of salesperson details for the dropdown
  const salesPersonDetails = salesPerson.map((item, index) => [
    item?.salespersonId,
    item?.user.userName,
  ]);
  // Filter out tasks related to transferred contacts and calculate the number of customers
  const contacts = Task;
  const customers = Task.filter(
    (item, index) =>
      item?.contactSub?.lifeCycleStage?.statusValue?.toLowerCase() === "won"
  );
  console.log(contacts);
  let contactData = contacts.map((item, index) => ({
    ...item,
    id: index + 1,
    name:
      item?.contactSub?.contactId?.firstName +
      " " +
      item?.contactSub?.contactId?.lastName,
    location: item?.contactSub?.contactId?.address,
    company: item?.contactSub?.contactId?.company,
  }));
  let customerData = customers.map((item, index) => ({
    ...item,
    id: index + 1,
    name:
      item?.contactSub?.contactId?.firstName +
      " " +
      item?.contactSub?.contactId?.lastName,
    location: item?.contactSub?.contactId?.address,
    company: item?.contactSub?.contactId?.company,
  }));
  const contactscolumns = [
    {
      field: "id",
      headerName: "S.No",
      width: 60,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "name",
      headerName: "User Name",
      width: 160,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "location",
      headerName: "location",
      width: 160,
      headerClassName: "table-header",
      cellClassName: "table-cell",
      renderCell: (params) => (
        <div
          style={{
            wordBreak: "break-word",
            whiteSpace: "wrap",
            lineHeight: "1",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "company",
      headerName: "Company",
      width: 160,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
  ];
  const customercolumns = [
    {
      field: "id",
      headerName: "S.No",
      width: 60,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "name",
      headerName: "User Name",
      width: 160,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "location",
      headerName: "location",
      width: 160,
      headerClassName: "table-header",
      cellClassName: "table-cell",
      renderCell: (params) => (
        <div
          style={{
            wordBreak: "break-word",
            whiteSpace: "wrap",
            lineHeight: "1",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "company",
      headerName: "Company",
      width: 160,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
  ];
  return (
    <div>
      <div style={{ marginTop: "20px" }} className="report-date-filter">
        <div className="test-report-display-between">
          Start Date:{"   "}
          <input
            type="date"
            value={startDate}
            className="test-report-date-input"
            style={{ marginLeft: "10px" }}
            max={new Date().toISOString().split("T")[0]}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="test-report-display-between">
          End Date:{" "}
          <input
            type="date"
            value={endDate}
            className="test-report-date-input"
            style={{ marginLeft: "10px" }}
            // max={new Date().toISOString().split("T")[0]}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="test-report-display-between">
          <select
            value={sales}
            onChange={(e) => {
              setSales(e.target.value);
              setIsFilter(false);
            }}
            class="form-control"
          >
            <option value="">SalesPersonId</option>
            {salesPersonDetails.map((item, index) => (
              <option value={item[0]}>
                {item[0]} -- {item[1]}
              </option>
            ))}
          </select>
        </div>
        <button
          style={{
            padding: "3px",
            width: "60px",
            backgroundColor: "#004461",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "5px",
            marginLeft: "5px",
          }}
          onClick={handleFilter}
        >
          Filter
        </button>
      </div>
      {endDate < startDate && endDate && (
        <p className="error">End Date Should Be Greater Than Start Date</p>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        {isFilter && (
          <Card className="report-card">
            <div className="table-data1">
              <p className="th">Name</p>
              <p className="td">{salesPersonIdData}</p>
            </div>
            <div className="table-data1">
              <p className="th">No of Contacts</p>
              <p className="td">{contacts?.length}</p>
            </div>
            <div className="table-data1">
              <p className="th">No of customers</p>
              <p className="td">{customers.length}</p>
            </div>
          </Card>
        )}
        <div className="tables">
          {isFilter && contactData.length > 0 ? (
            <div className="report-table" style={{ margin: "10px" }}>
              <h6 className="text-center">Contacts</h6>
              <DataGrid rows={contactData} columns={contactscolumns} />
            </div>
          ) : null}
          {isFilter && customerData.length > 0 ? (
            <div className="report-table" style={{ margin: "10px" }}>
              <h6 className="text-center">Customers</h6>
              <DataGrid rows={customerData} columns={customercolumns} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default SalesPersonReport;
