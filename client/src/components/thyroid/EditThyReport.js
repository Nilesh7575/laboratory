import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import axiosInstance from '../AxiosConfig/axiosConfig'




function EditThyReport({ editThyReport, seteditThyReport, thyData, id, userSampleData }) {

    if (thyData) {
        var ele = thyData[0]
    }

    const [updatedThyroidData, setupdatedThyroidData] = useState({})
    const tri = useRef()
    const thyroxine = useRef()
    const tsh = useRef()

    useEffect(() => {
        if(updatedThyroidData)
        formdata()
    }, [updatedThyroidData])

    const onHide = () => {
        setupdatedThyroidData({
            tri: tri.current.value,
            thyroxine: thyroxine.current.value,
            tsh: tsh.current.value
        })
    }

    const formdata = async () => {
        const { tri, tsh, thyroxine } = updatedThyroidData
        try {
            if (tri || tsh || thyroxine) {
                var response = await axiosInstance.put('/updatethyroid', { tri, tsh, thyroxine, id })
                console.log(response);
                if (!response.data.error) {
                    alert(response.data.message)
                    userSampleData();
                    setupdatedThyroidData({})
                }
            }
        } catch (err) {
            console.log("err", err);
        }
    }

    return (
        <div>
            <Modal size="SM" aria-labelledby="contained-modal-title-vcenter" centered show={editThyReport} >
                <Modal.Body>
                    <h4>update Thyroid Profile Data </h4>
                    {ele &&

                        <Form>
                            <Form.Group className="mb-3" >
                                <Form.Control type="text" 
                                placeholder=" TRI IODO Thyronine - T3 Total*" 
                                ref={tri}
                                    defaultValue={ele.tri}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Control type="text" 
                                placeholder=" Thyroxine -T4*" 
                                ref={thyroxine}
                                    defaultValue={ele.thyroxine}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Control type="text" 
                                placeholder=" Thyroid Stimulating Harmone (TSH)*" 
                                ref={tsh}
                                    defaultValue={ele.tsh}
                                />
                            </Form.Group>
                        </Form>
                    }

                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={() => seteditThyReport(false)}>Close</Button>
                    <Button onClick={onHide}>Update</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EditThyReport