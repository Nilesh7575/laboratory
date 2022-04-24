import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Modal, ToastContainer } from 'react-bootstrap'
import { toast } from 'react-toastify'
import axiosInstance from '../AxiosConfig/axiosConfig'




function ThyroidModal({ setThyroidForm, thyroidForm, thyModalClose, id }) {

    const [thyroidData, setthyroidData] = useState({})
    const tri = useRef()
    const thyroxine = useRef()
    const tsh = useRef()


    useEffect(() => {
        if (thyroidData) {
            formdata();
        }
    }, [thyroidData])

    const onHide = () => {
        setthyroidData({
            tri: tri.current.value,
            thyroxine: thyroxine.current.value,
            tsh: tsh.current.value
        })
    }

    const formdata = async () => {
        const { tri, tsh, thyroxine } = thyroidData
            try {
                const response = await axiosInstance.post('/thyroid', { tri, tsh, thyroxine, id })
                thyModalClose(response.data)
            } catch (err) {
                console.log("err", err);
            }
    }

    return (
        <div>
            <Modal size="SM" aria-labelledby="contained-modal-title-vcenter" centered show={thyroidForm} >
                <Modal.Body>
                    <h4>Enter Thyroid Profile Data </h4>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Control type="text" placeholder=" TRI IODO Thyronine - T3 Total*" ref={tri} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Control type="text" placeholder=" Thyroxine -T4*" ref={thyroxine} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Control type="text" placeholder=" Thyroid Stimulating Harmone (TSH)*" ref={tsh} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={() => setThyroidForm(false)}>Close</Button>
                    <Button onClick={onHide}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ThyroidModal;