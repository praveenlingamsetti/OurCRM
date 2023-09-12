import React, { useEffect, useState } from "react";
import "./index.css";
import { format } from "date-fns";
import api from "../../util/api";
import {
  BarChart,
  Tooltip,
  Cell,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
const COLORS = ["#8884D8", "#82CA9D", "#AF19FF", "#FF8042", "#FFBB28"];

function AdminDashboardMetrics() {
  const currentDate = new Date();
  const year1 = currentDate.getFullYear();
  const month1 = currentDate.getMonth();
  const firstDayOfMonth = new Date(year1, month1, 1);
  const formattedFirstDay = `${year1}-${(month1 + 1)
    .toString()
    .padStart(2, "0")}-01`;
  const currentDate1 = new Date();
  const year2 = currentDate.getFullYear();
  const month2 = currentDate.getMonth();
  const currentDayOfMonth = new Date();
  const formattedLastDay = `${year2}-${(month2 + 1)
    .toString()
    .padStart(2, "0")}-${currentDayOfMonth
    .getDate()
    .toString()
    .padStart(2, "0")}`;
  const [deal, SetDeal] = useState([]);
  const dateObject = new Date();
  const [opportunities, setOpportunities] = useState([]);
  const [oppSubList, setOppSubList] = useState(null);
  const [years, SetYears] = useState([]);
  const [startDate, setStartDate] = useState(formattedFirstDay);
  const [endDate, setEndDate] = useState(formattedLastDay);
  const [contacts, SetContacts] = useState([]);
  const [Lost, SetLost] = useState([]);
  const [customers, SetCustomers] = useState([]);
  const [churnedContacts, SetChurnedContacts] = useState([]);

  // console.log(startDate,endDate)

  // this useEffect is for retrieving the data between the date range  number of opportunies and deals is cereted
  useEffect(() => {
    var url = `/app/getAllOpportuntiesByDate/${startDate}/${endDate}/opportunity`; //this url is for getAllOpportunties betweeen the date range
    var urldeal = `/app/getAllOpportuntiesByDate/${startDate}/${endDate}/deal`; //this url is for getAlldelas betweeen the date range
    var contactsurl = `/ContactController/get_all_contact_in_date_range/${startDate}/${endDate}`; //this url is for getAllcontacts betweeen the date range
    var losturl = `/ContactController/get_all_contact_in_date_range_with_status_type_and_status_value/${startDate}/${endDate}/sales qualified/lost`; //this url is for contacts which was lost betweeen the date range
    var churedurl = `/ContactController/get_all_contact_in_date_range_with_status_type_and_status_value/${startDate}/${endDate}/customer/churned`; //this url is for contacts which was lost betweeen the date range
    var customerurl = `/ContactController/get_all_contact_in_date_range_with_status_type_and_status_value/${startDate}/${endDate}/customer/won`; //this url is for contacts which was become the customer betweeen the date range
    api
      .get(url)
      .then((responseJson) => {
        setOpportunities(responseJson.data);
      })
      .catch((error) => ({}));
    api
      .get(churedurl, {})
      .then((responseJson) => {
        SetChurnedContacts(responseJson.data);
      })
      .catch((error) => ({}));
    api
      .get(urldeal)
      .then((responseJson) => {
        SetDeal(responseJson.data);
      })
      .catch((error) => ({}));
    api
      .get(contactsurl)
      .then((responseJson) => {
        SetContacts(responseJson.data);
      })
      .catch((error) => ({}));
    api
      .get(losturl)
      .then((responseJson) => {
        SetLost(responseJson.data);
      })
      .catch((error) => ({}));
    api
      .get(customerurl)
      .then((responseJson) => {
        SetCustomers(responseJson.data);
      })
      .catch((error) => ({}));
  }, []);
  // this handleFilter is the function  for retrieving the data between the date range  number of opportunies and deals is cereted
  const handleFilter = () => {
    var url = `/app/getAllOpportuntiesByDate/${startDate}/${endDate}/opportunity`; //this url is for getAllOpportunties betweeen the date range
    var urldeal = `/app/getAllOpportuntiesByDate/${startDate}/${endDate}/deal`; //this url is for getAlldelas betweeen the date range
    var losturl = `/ContactController/get_all_contact_in_date_range_with_status_type_and_status_value/${startDate}/${endDate}/sales qualified/lost`; //this url is for contacts which was lost betweeen the date range
    var churedurl = `/ContactController/get_all_contact_in_date_range_with_status_type_and_status_value/${startDate}/${endDate}/customer/churned`; //this url is for contacts which was lost betweeen the date range
    var customerurl = `/ContactController/get_all_contact_in_date_range_with_status_type_and_status_value/${startDate}/${endDate}/customer/won`; //this url is for contacts which was become the customer betweeen the date range
    var contactsurl = `/ContactController/get_all_contact_in_date_range/${startDate}/${endDate}`; //this url is for getAllcontacts betweeen the date range
    api
      .get(url)
      .then((responseJson) => {
        setOpportunities(responseJson.data);
      })
      .catch((error) => ({}));
    api
      .get(churedurl, {})
      .then((responseJson) => {
        // console.log(responseJson.data)
        SetChurnedContacts(responseJson.data);
      })
      .catch((error) => ({}));
    api
      .get(urldeal)
      .then((responseJson) => {
        // console.log(responseJson.data)
        SetDeal(responseJson.data);
      })
      .catch((error) => ({}));
    api
      .get(losturl)
      .then((responseJson) => {
        // console.log(responseJson.data)
        SetLost(responseJson.data);
      })
      .catch((error) => ({}));
    api
      .get(customerurl)
      .then((responseJson) => {
        SetCustomers(responseJson.data);
      })
      .catch((error) => ({}));
    api
      .get(contactsurl)
      .then((responseJson) => {
        // console.log(responseJson)
        SetContacts(responseJson.data);
      })
      .catch((error) => ({}));
  };
  const opor = opportunities.length; // number of opportunies
  const deals = deal.length; // number of deals
  let sum = 0,
    sumDeal = 0; // this variable indicates total size of opportunites and deals
  const agr = opportunities.map((item, index) => (sum += item.opportunitySize)); // this  function is for opportunity size
  const ab = deal.map((item, index) => (sumDeal += item.opportunitySize)); // this  function is for opportunity size
  const inprogress =
    contacts.length - (Lost.length + churnedContacts.length + customers.length); // this variable indates the number of contacts which is inprogress

  // this BarchartData for ploting the barchart opportunities/ deals
  const BarchartData = [
    {
      name: "Opportunity",
      value: opor,
    },
    {
      name: "Deal",
      value: deals,
    },
    {
      name: "opportunitySize",
      value: sum,
    },
    {
      name: "DealSize",
      value: sumDeal,
    },
  ];
  // this BarchartData for ploting the barchart contacts/customers/lost and inprogress contacts
  const BarchartData1 = [
    {
      name: "contacts",
      value: contacts.length,
    },
    {
      name: "LostContacts",
      value: Lost.length + churnedContacts.length,
    },
    {
      name: "Customers",
      value: customers.length,
    },
    {
      name: "InProgress",
      value: inprogress,
    },
  ];
  return (
    <div>
      <div className="dash-container">
        <h3 className="dash-heading">Dashboard Metrics</h3>
        <div className="test-report-date-filter">
          <div className="test-report-display-between">
            Start Date:{"   "}
            <input
              type="date"
              value={startDate}
              className="test-report-date-input"
              onChange={(e) =>
                setStartDate(format(new Date(e.target.value), "yyyy-MM-dd"))
              }
              max={new Date().toISOString().split("T")[0]}
              style={{ marginLeft: "5px" }}
            />
          </div>
          <div className="test-report-display-between">
            End Date:{" "}
            <input
              type="date"
              value={endDate}
              className="test-report-date-input"
              onChange={(e) =>
                setEndDate(format(new Date(e.target.value), "yyyy-MM-dd"))
              }
              max={new Date().toISOString().split("T")[0]}
              style={{ marginLeft: "5px" }}
            />
          </div>
          <button
            style={{
              padding: "1px",
              width: "60px",
              backgroundColor: "#004461",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "5px",
            }}
            onClick={handleFilter}
          >
            Filter
          </button>
        </div>
        {/* below condition is for displayng the errot message if the enddate is less than the start date */}
        {endDate < startDate && endDate && (
          <p className="error">*End Date Should Be Greater Than Start Date</p>
        )}
        <div className="barchart-container">
          <div className="barchart">
            <p>Opportunity/Deals</p>
            {/* desktop container is for the displaying the barchart in the desktop view  */}
            <div className="desktop-container">
              <BarChart
                width={390}
                height={300}
                data={BarchartData}
                margin={{
                  top: 30,
                  right: 0,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip wrapperStyle={{ top: 0, left: 0 }} />
                <Bar dataKey="value" fill="green" barSize={30}>
                  {BarchartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % 20]} />
                  ))}
                </Bar>
                <XAxis
                  dataKey="name"
                  style={{ fontSize: "8px", fontWeight: "bold" }}
                />
                <YAxis
                  type="number"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                  domain={[0, 10]}
                />
              </BarChart>
            </div>
            {/* mobile container is for the displaying the barchart in the Medium devices  */}
            <div className="mobile-container">
              <BarChart
                width={330}
                height={300}
                data={BarchartData}
                margin={{
                  top: 30,
                  right: 0,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip wrapperStyle={{ top: 0, left: 0 }} />
                <Bar dataKey="value" fill="green" barSize={30}>
                  {BarchartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % 20]} />
                  ))}
                </Bar>
                <XAxis
                  dataKey="name"
                  style={{ fontSize: "8px", fontWeight: "bold" }}
                />
                <YAxis
                  type="number"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                  domain={[0, 10]}
                />
              </BarChart>
            </div>
            {/* mobile-sm-container is for the displaying the barchart in the small devices  */}
            <div className="mobile-sm-container">
              <BarChart
                width={280}
                height={300}
                data={BarchartData}
                margin={{
                  top: 30,
                  right: 0,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip wrapperStyle={{ top: 0, left: 0 }} />
                <Bar dataKey="value" fill="green" barSize={30}>
                  {BarchartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % 20]} />
                  ))}
                </Bar>
                <XAxis
                  dataKey="name"
                  style={{ fontSize: "8px", fontWeight: "bold" }}
                />
                <YAxis
                  type="number"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                  domain={[0, 10]}
                />
              </BarChart>
            </div>
          </div>
          <div className="barchart">
            <p>Contacts/Customers/Lost</p>
            {/* desktop container is for the displaying the barchart in the desktop view  */}
            <div className="desktop-container">
              <BarChart
                width={390}
                height={300}
                data={BarchartData1}
                margin={{
                  top: 30,
                  right: 0,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip wrapperStyle={{ top: 0, left: 0 }} />
                <Bar dataKey="value" fill="green" barSize={30}>
                  {BarchartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % 20]} />
                  ))}
                </Bar>
                <XAxis
                  dataKey="name"
                  style={{ fontSize: "8px", fontWeight: "bold" }}
                />
                <YAxis
                  type="number"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                  domain={[0, 10]}
                />
              </BarChart>
            </div>
            {/* mobile container is for the displaying the barchart in the Medium devices  */}
            <div className="mobile-container">
              <BarChart
                width={330}
                height={300}
                data={BarchartData1}
                margin={{
                  top: 30,
                  right: 0,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip wrapperStyle={{ top: 0, left: 0 }} />
                <Bar dataKey="value" fill="green" barSize={30}>
                  {BarchartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % 20]} />
                  ))}
                </Bar>
                <XAxis
                  dataKey="name"
                  style={{ fontSize: "8px", fontWeight: "bold" }}
                />
                <YAxis
                  type="number"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                  domain={[0, 10]}
                />
              </BarChart>
            </div>
            {/* mobile-sm-container is for the displaying the barchart in the small devices  */}
            <div className="mobile-sm-container">
              <BarChart
                width={280}
                height={300}
                data={BarchartData1}
                margin={{
                  top: 30,
                  right: 0,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip wrapperStyle={{ top: 0, left: 0 }} />
                <Bar dataKey="value" fill="green" barSize={30}>
                  {BarchartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % 20]} />
                  ))}
                </Bar>
                <XAxis
                  dataKey="name"
                  style={{ fontSize: "8px", fontWeight: "bold" }}
                />
                <YAxis
                  type="number"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                  domain={[0, 10]}
                />
              </BarChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardMetrics;
