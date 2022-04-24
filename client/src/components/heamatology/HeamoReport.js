import React, { useEffect, useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'






function HeamoReport({ HeamatoReport, setHeamatoReport, heamData, editHeamoModal }) {
    const onHide = () => {
        setHeamatoReport(false)
    }
    const [Hreport, setHreport] = useState([{ _id: "" }])

    useEffect(() => {
        setHreport(heamData)
    }, [heamData])

    if (Hreport) {
        var ele = Hreport[0]
        console.log("glyco:", ele);
    }

  return (
    <div>
        <Modal  aria-labelledby="contained-modal-title-vcenter" centered show={HeamatoReport}>
                <Modal.Body>
                    <h4>Enter Thyroid Profile Data </h4>
                    <Button onClick={
                        () => {editHeamoModal()}
                    }>Edit</Button>
                    <Table bordered >
                        <thead>
                            <tr>
                                <th>Test Name</th>
                                <th> Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Hreport &&
                                <tr>
                                    <td>Haemoglobin</td>
                                    <td>{ele.haemoglobin} g/dl</td>
                                </tr>
                            }
                            {Hreport &&
                                <tr>
                                    <td>Total Count (WBC)</td>
                                    <td>{ele.wbc} /Cmm</td>
                                </tr>
                            }
                            {Hreport &&
                                <tr>
                                    <td>Neutrophils</td>
                                    <td>{ele.neutrophils} %</td>
                                </tr>
                            }
                            {Hreport &&
                                <tr>
                                    <td>Lymphocytes</td>
                                    <td>{ele.lymphocytes} %</td>
                                </tr>
                            }
                            {Hreport &&
                                <tr>
                                    <td>Eosinophiles</td>
                                    <td>{ele.eosinophiles} %</td>
                                </tr>
                            }
                            {Hreport &&
                                <tr>
                                    <td>Monocytes</td>
                                    <td>{ele.monocytes} %</td>
                                </tr>
                            }
                            {Hreport &&
                                <tr>
                                    <td>Basophills</td>
                                    <td>{ele.basophills} %</td>
                                </tr>
                            }
                            {Hreport &&
                                <tr>
                                    <td>Red Blood Cells (RBC)</td>
                                    <td>{ele.rbc} ml/Cmm</td>
                                </tr>
                            }
                            {Hreport &&
                                <tr>
                                    <td>Packed Cell Volume (PCV)</td>
                                    <td>{ele.pcv} %</td>
                                </tr>
                            }
                            {Hreport &&
                                <tr>
                                    <td>MEAN Corpuscular Volume (MCV)</td>
                                    <td>{ele.mcv} %</td>
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

export default HeamoReport