import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'
import axiosInstance from '../AxiosConfig/axiosConfig'



function GlukomModal({ setGlucomForm, GlucomForm, id , glucoModalClose}) {
    const [glucData, setglucData] = useState()
    const fbs = useRef()
    const ppbs = useRef()
    const gh = useRef()
    const calcium = useRef()

    useEffect(() => {
      if(glucData)
      formdata();
    }, [glucData])
    
  
    const onHide = () => {
      setglucData({
          fbs: fbs.current.value,
          ppbs: ppbs.current.value,
          gh: gh.current.value,
          calcium: calcium.current.value,
      })
    }
  
    const formdata = async () => {
      const { fbs, ppbs, gh, calcium } = glucData
          try {
                const response = await axiosInstance.post('/glucometry', { fbs, ppbs, gh, calcium, id })
                glucoModalClose(response.data)
          } catch (err) {
              console.log("err", err);
          }
  }
  
    return (
      <div>
          <ToastContainer
      position="bottom-left"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      // rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover/>
          <Modal size="SM"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  show={GlucomForm}>
                      <Form >
                  <Modal.Body>
                      <h4>Enter Add Glucomtery Report </h4>
                          <Form.Group className="mb-3" >
                              <Form.Control type="text" placeholder=" Fasting Blood Suger" ref={fbs} required/>
                          </Form.Group>
                          <Form.Group className="mb-3" >
                              <Form.Control type="text" placeholder=" Post Prandual Blood Suger" ref={ppbs} required/>
                          </Form.Group>
                          <Form.Group className="mb-3" >
                              <Form.Control type="text" placeholder=" Glycosylated Haemoglobin (HbA1C)" ref={gh} required/>
                          </Form.Group>
                          <Form.Group className="mb-3" >
                              <Form.Control type="text" placeholder=" Calcium" ref={calcium} required/>
                          </Form.Group>
                  </Modal.Body>
                  <Modal.Footer>
                      <Button variant='danger' onClick={()=>setGlucomForm(false)}>Close</Button>
                      <Button onClick={onHide}>Submit</Button>
                  </Modal.Footer>
                      </Form>
              </Modal>
      </div>
    )
  }

export default GlukomModal

