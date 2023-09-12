// Import necessary modules and components
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";

// Retrieve the user ID from local storage
const userId = localStorage.getItem("userId");
// Define the functional component called App
function UploadFile() {
  const navigate = useNavigate();
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);
  // Function to handle the selection of an Excel file
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      // Check if the selected file is of the correct Excel format (XLSX)
      if (
        selectedFile.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        setExcelFileError(null);
        setExcelFile(selectedFile); // Store the selected file in state
      } else {
        setExcelFileError("Please select an Excel file (XLSX)");
        setExcelFile(null);
      }
    } else {
      alert("Please select a file");
    }
  };
  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const formData = new FormData();
      formData.append("Contacts", excelFile);
      const apiUrl = `ContactController/add_contact_from_excel/${userId}`;
      //const authToken = "your-auth-token"; // Replace with your actual auth token
      const authToken = localStorage.getItem("token"); // Retrieve the authentication token from local storage
      try {
        // Send a POST request to the server to upload the Excel file
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          body: formData,
        });
        if (response.ok) {
          toast("File uploaded successfully"); // Display a success toast notification
          window.location.reload(); // Reload the page after successful upload
        } else {
          console.error("File upload failed");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      setExcelFileError("Please select an Excel file (XLSX)");
    }
  };
  return (
    <div className="upload-container" style={{ marginTop: "20px" }}>
      <div className="upload-form">
        <form className="" autoComplete="off" onSubmit={handleSubmit}>
          <label>
            <h5 className="upload-heading">Import Contacts from Excel File</h5>
          </label>
          <input
            type="file"
            className="upload-input"
            accept=".xlsx"
            onChange={handleFile}
            required
          />
          {excelFileError && (
            <div className="text-danger" style={{ marginTop: "5px" }}>
              {excelFileError}
            </div>
          )}
          <div>
            <button
              type="submit"
              style={{
                marginRight: "20px",
                marginBottom: "10px",
                width: "80px",
              }}
            >
              Upload
            </button>
            <button
              type="button"
              style={{
                marginRight: "20px",
                marginBottom: "10px",
                width: "80px",
              }}
              onClick={() => window.location.reload()}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default UploadFile;
