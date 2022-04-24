import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, FloatingLabel, Form, Row , Modal} from "react-bootstrap";
import axiosInstance from "../AxiosConfig/axiosConfig";




function CreateTest(props) {
  const [testData, settestData] = useState([]);
  const [sendData, setsendData] = useState();

  const [checkBoxData, setcheckBoxData] = useState({
    isHeamatology: false,
    isThyroid: false,
    isGlucometry: false,
  });
  
  let fetchedTestData;
  useEffect(() => {
    if (!sendData) userTestData();
  }, [sendData]);

  useEffect(() => {
    if(sendData)
    sendReportForm();
  }, [sendData]);

  const userTestData = async () => {
    try {
      fetchedTestData = await axiosInstance.get("/createtest");
      settestData(fetchedTestData.data);
    } catch (error) {
      console.log(error);
    }
  };

  const selectedUserFromList = useRef();

  const handleOnChange = (e) => {
    const id = e.target.id;
    const filteredData = testData.filter((ele) => {
      return ele._id === selectedUserFromList.current.value;
    });

    const finalData = { ...filteredData[0].status };
    console.log("finalData", finalData);
    console.log("id", selectedUserFromList.current.value);
    if (id === "1") {
      setcheckBoxData({
        ...finalData,
        isHeamatology: e.target.checked,
      });
    } else if (id === "2") {
      setcheckBoxData({
        ...finalData,

        isThyroid: e.target.checked,
      });
    } else if (id === "3") {
      setcheckBoxData({
        ...finalData,
        isGlucometry: e.target.checked,
      });
    }
  };

  const enterReportDetails = () => {
    setsendData({
      selectedUserFromList: selectedUserFromList.current.value,
      isHeamatology: checkBoxData.isHeamatology,
      isThyroid: checkBoxData.isThyroid,
      isGlucometry: checkBoxData.isGlucometry,
    });
  };

  const sendReportForm = async () => {
    try {
      const { selectedUserFromList, isHeamatology, isThyroid, isGlucometry } = sendData;
      const testStatus = await axiosInstance.post("/createtest", {
        selectedUserFromList,
        isHeamatology,
        isThyroid,
        isGlucometry,
      });
      props.history.push("/userrecords");
      console.log("response", testStatus);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <Modal.Dialog>
  <Modal.Header >
    <Modal.Title>Create Test</Modal.Title>
  </Modal.Header>

  <Modal.Body>

  <Form.Select
        aria-label="Default select example"
        style={{ marginTop: "15px" }}
        ref={selectedUserFromList}
      >
        {testData.map((ele, index) => {
          return (
            <option value={ele._id} key={index}>
              {ele.name}
            </option>
          );
        })}
      </Form.Select>
      <div
        className="container"
        style={{ textAlign: "left", margin: "20px auto" }}
      >
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="1"
            onChange={(e) => handleOnChange(e)}
          />
          <label className="form-check-label">Heamatology</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="2"
            onChange={(e) => handleOnChange(e)}
          />
          <label className="form-check-label">Thyroid Profile</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="3"
            onChange={(e) => handleOnChange(e)}
          />
          <label className="form-check-label">Glucometry</label>
        </div>
      </div>
  </Modal.Body>
  <Modal.Footer>
    <Button
        variant="success"
        type="submit"
        onClick={() => {
          enterReportDetails();
        }}
      >
        Submit
      </Button>
  </Modal.Footer>
</Modal.Dialog>
    </>
  );
}

export default CreateTest;
