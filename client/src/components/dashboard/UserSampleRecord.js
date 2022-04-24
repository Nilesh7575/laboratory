import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import axiosInstance from "../AxiosConfig/axiosConfig";
import GlucoReport from "../glucometry/GlucoReport";
import GlukomModal from "../glucometry/GlukomModal";
import HeamaModal from "../heamatology/HeamaModal";
import HeamoReport from "../heamatology/HeamoReport";
import EditThyReport from "../thyroid/EditThyReport";
import ThyroidModal from "../thyroid/ThyroidModal";
import ThyroReport from "../thyroid/ThyroReport";

function UserSampleRecord() {
  const [tableData, settableData] = useState([]);

  //====================== FORMS MODALS  ======================//

  const [openmodal, setopenmodal] = useState(false);
  const [haemid, sethaemid] = useState();

  const [thyroidForm, setThyroidForm] = useState(false);
  const [thyrid, setthyrid] = useState();

  const [GlucomForm, setGlucomForm] = useState(false);
  const [Glucid, setGlucid] = useState();

  //====================== REPORTS MODALS  ======================//
  const [HeamatoReport, setHeamatoReport] = useState(false);
  const [heamData, setheamData] = useState();

  const [ThyrReport, setThyrReport] = useState(false);
  const [thyData, setthyData] = useState();

  const [GlucometReport, setGlucometReport] = useState(false);
  const [glucData, setglucData] = useState();

  //======================EditReportModal================================================================
  const [editThyReport, seteditThyReport] = useState(false)

  let fetchedData;
  useEffect(() => {
    userSampleData();
  }, []);

  const userSampleData = async () => {
    try {
      fetchedData = await axiosInstance.get("/userrecords");
      settableData(fetchedData.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  //====================== FORMS MODALS OPEN/CLOSE  ======================//
  const HaemaModel = (id) => {
    sethaemid(id._id);
    setopenmodal(true);
  };
  const heamoModalClose = (data) => {
    setopenmodal(false);
    userSampleData();
    toast.success(data.message)
  }

  const ThyroidModal1 = (id) => {
    setthyrid(id);
    setThyroidForm(true);
  };

  const thyModalClose = (data) => {
    setThyroidForm(false)
    userSampleData();
    // toast.success(data.message)
  }

  const GlucometryModal = (id) => {
    setGlucid(id);
    setGlucomForm(true);
  };

  const glucoModalClose = (data) => {
    setGlucomForm(false)
    userSampleData();
    toast.success(data.message)
  }
  //====================== REPORTS MODALS OPEN  ======================//
  const HeamatologyReports = (data, id) => {
    setheamData(data);
    sethaemid(id)
    setHeamatoReport(true);
    console.log(data);
  };
  const ThyroidReports = (data, id) => {
    setthyData(data);
    setthyrid(id);
    setThyrReport(true);
    console.log(data);
  };

  const GlucometryReports = (data) => {
    setglucData(data);
    setGlucometReport(true);
    console.log(data);
  };

  //====================Edit Modal Open======================
 
  const editThyModal = () => {
    setThyrReport(false);
    seteditThyReport(true)
  }

  return (
    <div className="container mt-5 userTable">
      <Table responsive>
        <thead>
          <tr>
            <th>Sample Date</th>
            <th>Patient Name</th>
            <th>Email Id</th>
            <th>Sample Id</th>
            <th>Hematology</th>
            <th>Thyroid Profile</th>
            <th>Glucometry</th>
          </tr>
        </thead>
        <tbody>
          {tableData &&
            tableData.map((val, inx) => {
              return (
                <tr key={inx}>
                  <td>{val._id}</td>
                  <td>{val.name}</td>
                  <td>{val.email}</td>
                  <td>{inx + 101}</td>
                  <td>
                    {!val.test ? (
                      <Button variant="light">N/A </Button>
                    ) : val.status.isHeamatology ? (
                      val.heamatology.length > 0 ? (
                        <Button variant="danger" onClick={() => { HeamatologyReports(val.heamatology, val._id) }}>
                          View Report</Button>
                      ) : (
                        <Button variant="primary" onClick={() => { HaemaModel(val) }}>
                          add Details
                        </Button>
                      )
                    ) : (
                      <Button variant="light">N/A</Button>
                    )}
                  </td>

                  <td>
                    {!val.test ? (
                      <Button variant="light"> N/A</Button>
                    ) : val.status.isThyroid ? (
                      val.thyroid.length > 0 ? (
                        <Button variant="danger" onClick={() => { ThyroidReports(val.thyroid, val._id) }}>
                          View Report
                        </Button>
                      ) : (
                        <Button variant="primary" onClick={() => { ThyroidModal1(val._id) }}>
                          add Details
                        </Button>
                      )
                    ) : (
                      <Button variant="light">N/A</Button>
                    )}
                  </td>

                  <td>
                    {!val.test ? (
                      <Button variant="light"> N/A</Button>
                    ) : val.status.isGlucometry ? (
                      val.glucometry.length > 0 ? (
                        <Button variant="danger" onClick={() => { GlucometryReports(val.glucometry, val._id); }}>
                          View Reports
                        </Button>
                      ) : (
                        <Button variant="primary" onClick={() => { GlucometryModal(val._id); }}>
                          add Details
                        </Button>
                      )
                    ) : (
                      <Button variant="light">N/A</Button>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <HeamaModal
        openmodal={openmodal}
        setopenmodal={setopenmodal}
        id={haemid}
        heamoModalClose={heamoModalClose}
      />
      <ThyroidModal
        thyroidForm={thyroidForm}
        setThyroidForm={setThyroidForm}
        id={thyrid}
        thyModalClose={thyModalClose}
      />

      <GlukomModal
        GlucomForm={GlucomForm}
        setGlucomForm={setGlucomForm}
        id={Glucid}
        glucoModalClose={glucoModalClose}
      />

      {tableData.length > 0 && (
        <GlucoReport
          GlucometReport={GlucometReport}
          setGlucometReport={setGlucometReport}
          glucData={glucData}
        />
      )}
      {tableData.length > 0 && (
        <HeamoReport
          HeamatoReport={HeamatoReport}
          setHeamatoReport={setHeamatoReport}
          heamData={heamData}
        />
      )}
      {tableData.length > 0 && (
        <ThyroReport
          ThyrReport={ThyrReport}
          setThyrReport={setThyrReport}
          thyData={thyData}
          editThyModal={editThyModal}
        />
      )}

      {tableData.length > 0 && (
        <EditThyReport userSampleData={userSampleData} editThyReport={editThyReport} seteditThyReport={seteditThyReport} id={thyrid && thyrid} thyData={thyData && thyData} />
      )}
    </div>
  );
}

export default UserSampleRecord;
