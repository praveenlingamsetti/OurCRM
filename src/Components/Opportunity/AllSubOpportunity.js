import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import api from "../../util/api";
//import Dashboard from '../Header/Dashboard';

const OpportunitySubList = () => {
  const oppId = localStorage.getItem("oppId");
  const [oppSubId, setOppSubId] = useState("");
  // Retrieve opportunity data
  // Initialize state variables using the useState hook
  const [oppSubList, setOppSubList] = useState(null);
  const [selectedRow, setSelectedRow] = useState("");
  const [opportunity, setOpportunity] = useState(null);

  // Initialize a navigation object for routing
  const navigate = useNavigate();

  // Use the useEffect hook to fetch data when the component mounts
  useEffect(() => {
    const initialFetch = async () => {
      await api
        .get(`/app/${oppId}`)
        .then((res) => {
          // console.log(res.data);
          setOpportunity(res.data);
        })
        .catch((err) => console.log(err));
      // Fetch all subOpportunity data for respective opportunity from the API
      await api
        .get(`/app/getAllOpportunitySubByOpportunity/${oppId}`)
        .then((res) => {
          // console.log(res.data);
          setOppSubId(res.data[0].opportunitySubId);
          setOppSubList(res.data);
          setOppSubId(res.data[0].opportunitySubId);
        })
        .catch((err) => console.log(err));
    };
    initialFetch();
  }, []);

  // Create a new data array with additional properties
  const data = oppSubList?.map((item, index) => ({
    ...item,
    id: index + 1,
    status: item?.status?.statusValue,
  }));

  // Define columns for the data grid
  const columns = [
    {
      field: "id",
      headerName: "S.No",
      width: 60,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "opportunitySubId",
      headerName: "opportunitySubId",
      width: 160,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "opportunityStatusDate",
      headerName: "Opportunity Status Date",
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
      field: "noOfInstallements",
      headerName: "noOfInstallements",
      width: 160,
      headerClassName: "table-header",
      cellClassName: "table-cell",
      renderCell: (params) => (
        <div style={{ whiteSpace: "wrap", lineHeight: "1" }}>
          {params.value}
        </div>
      ),
    },
    {
      field: "price",
      headerName: "price",
      width: 160,
      headerClassName: "table-header",
      cellClassName: "table-cell",
      renderCell: (params) => (
        <div style={{ whiteSpace: "wrap", lineHeight: "1" }}>
          {params.value}
        </div>
      ),
    },
    {
      field: "duration",
      headerName: "duration",
      width: 160,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "currency",
      headerName: "currency",
      width: 160,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "status",
      headerName: "status",
      width: 120,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
  ];

  // Handle row click event
  const onRowHandleClick = (params) => {
    setSelectedRow(params?.id);
    // setDat(params?.row?.opportunitySubId)
  };
  return (
    <div>
      <div className="opportunities-container">
        <div className="buttons">
          {oppSubList?.length === 1 && (
            <button
              className="update-sub-button"
              onClick={() => {
                oppSubId
                  ? navigate("/update_subopportunity", {
                      state: { oppId, oppSubId },
                    })
                  : alert("please select one subopportunity to update?");
              }}
            >
              Update
            </button>
          )}
          <button
            className="opportunity-list-button"
            onClick={() => navigate("/all_opportunities")}
          >
            Opportunity List
          </button>
        </div>
        <div className="opportunity-container">
          <div>
            <div className="opportunity-headings">
              <h2 className="opportunity-main-heading">Opportunity Details</h2>
            </div>
            <div className="card mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <h5>
                      <span className="text-secondary">Opp Name : </span>
                      {opportunity?.opportunityName}
                    </h5>
                  </div>
                  <div className="col-md-6">
                    <h5>
                      <span className="text-secondary">Opp Size : </span>
                      {opportunity?.opportunitySize}
                    </h5>
                  </div>
                  <div className="col-md-6">
                    <h5>
                      <span className="text-secondary">Contact Name : </span>
                      {opportunity?.contactSub?.contactId?.firstName}{" "}
                      {opportunity?.contactSub?.contactId?.lastName}
                    </h5>
                  </div>
                  <div className="col-md-6">
                    <h5>
                      <span className="text-secondary">Contact Email : </span>
                      {opportunity?.contactSub?.contactId?.email}
                    </h5>
                  </div>
                  <div className="col-md-6">
                    <h5>
                      <span className="text-secondary">Offering Name : </span>
                      {opportunity?.offering?.offeringName}
                    </h5>
                  </div>
                  <div className="col-md-6">
                    <h5>
                      <span className="text-secondary">
                        Offering Validity :{" "}
                      </span>
                      {opportunity?.offering?.validTillDate}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="subopportunity-container">
            <h3 className="subopportunity-main-heading">
              Sub Opportunities List
            </h3>
            <div style={{ height: "400px" }}>
              {data?.length > 0 ? (
                <div className="table">
                  <DataGrid
                    rows={data}
                    columns={columns}
                    onRowClick={onRowHandleClick}
                  />
                </div>
              ) : (
                "No Data Found"
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OpportunitySubList;
