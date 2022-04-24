import React, { useEffect, useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'





function GlucoReport({ GlucometReport, setGlucometReport, glucData }) {
    
    const onHide = () => {
        setGlucometReport(false)
    }
    const [Greport, setGreport] = useState([{ _id: "" }])

    useEffect(() => {
        setGreport(glucData)
    }, [glucData])

    if (Greport) {
        var ele = Greport[0]
        console.log("glyco:", ele);
    }
    
    return (
        <div>
            <Modal  aria-labelledby="contained-modal-title-vcenter" centered show={GlucometReport}>
                <Modal.Body>
                    <h4>Enter Thyroid Profile Data </h4>
                    <Table bordered >
                        <thead>
                            <tr>
                                <th>Test Name</th>
                                <th> Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Greport &&
                                <tr>
                                    <td>Calcium</td>
                                    <td>{ele.calcium} dl/Cmm</td>
                                </tr>
                            }
                            {Greport &&
                                <tr>
                                    <td>Fasting Blood Sugar</td>
                                    <td>{ele.fbs} dl/Cmm</td>
                                </tr>
                            }
                            {Greport &&
                                <tr>
                                    <td>HbA1c</td>
                                    <td>{ele.gh} dl/Cmm</td>
                                </tr>
                            }
                            {Greport &&
                                <tr>
                                    <td>Post Prandial Blood Sugar</td>
                                    <td>{ele.ppbs} dl/Cmm</td>
                                </tr>
                            }
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default GlucoReport