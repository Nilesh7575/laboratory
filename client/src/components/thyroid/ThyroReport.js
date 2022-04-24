import React, { useEffect, useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'
import EditThyReport from './EditThyReport'






function ThyroReport({ ThyrReport, setThyrReport, thyData , editThyModal}) {
    const onHide = () => {
        setThyrReport(false)
    }
    const [Treport, setTreport] = useState([{ _id: "" }])

    useEffect(() => {
        setTreport(thyData)
    }, [thyData])

    if (Treport) {
        var ele = Treport[0]
        console.log("thyr:", ele);
    }

  return (
    <div>
        <Modal  aria-labelledby="contained-modal-title-vcenter" centered show={ThyrReport}>
                <Modal.Body>
                    <h4>Enter Thyroid Profile Data </h4>
                    <Button onClick={
                        () => {editThyModal()}
                    }>Edit</Button>
                    <Table bordered >
                        <thead>
                            <tr>
                                <th>Test Name</th>
                                <th> Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Treport &&
                                <tr>
                                    <td>Haemoglobin</td>
                                    <td>{ele.tri} g/dl</td>
                                </tr>
                            }
                            {Treport &&
                                <tr>
                                    <td>Fasting Blood Sugar</td>
                                    <td>{ele.thyroxine} g/dl</td>
                                </tr>
                            }
                            {Treport &&
                                <tr>
                                    <td>HbA1c</td>
                                    <td>{ele.tsh} g/dl</td>
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

export default ThyroReport