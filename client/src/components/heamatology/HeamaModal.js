import axios from 'axios';
import React, {  useEffect, useRef, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import axiosInstance from '../AxiosConfig/axiosConfig';



const  HeamaModal = ({openmodal, setopenmodal, id, heamoModalClose})=> {
    const [heamoData, setheamoData] = useState()

    const haemoglobin = useRef();
    const neutrophils = useRef();
    const eosinophiles = useRef();
    const basophills = useRef();
    const pcv = useRef();
    const wbc = useRef();
    const lymphocytes = useRef();
    const monocytes = useRef();
    const rbc = useRef();
    const mcv = useRef();

    useEffect(() => {
        if(heamoData){
            heamatologyData();
        }
    }, [heamoData])
    
    const onHide = ()=>{
        setheamoData({
            haemoglobin: haemoglobin.current.value,
            neutrophils: neutrophils.current.value,
            eosinophiles: eosinophiles.current.value,
            basophills: basophills.current.value,
            pcv: pcv.current.value,
            wbc: wbc.current.value,
            lymphocytes: lymphocytes.current.value,
            monocytes: monocytes.current.value,
            rbc: rbc.current.value,
            mcv: mcv.current.value
        })
    }

    const heamatologyData = async ()=>{
        const { haemoglobin, neutrophils, eosinophiles, basophills, pcv, wbc, lymphocytes, monocytes, rbc, mcv } = heamoData
        console.log(haemoglobin, neutrophils, eosinophiles, basophills, pcv, wbc, lymphocytes, monocytes, rbc, mcv);
        try {
            const res = await axiosInstance.post('/heamatology',{ haemoglobin, neutrophils, eosinophiles, basophills, pcv, wbc, lymphocytes, monocytes, rbc, mcv, id })
            heamoModalClose(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        
        <div><Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={openmodal} >
            <Modal.Body >
                <h4>Enter Haematology Reports </h4>
                <Form >
                    <Row className='my-4'>
                        <Col><Form.Control placeholder="haemoglobin" ref={haemoglobin} required/></Col>
                        <Col><Form.Control placeholder="neutrophils" ref={neutrophils} required/></Col>
                    </Row>
                    <Row className='my-4'>
                        <Col><Form.Control placeholder="eosinophiles" ref={eosinophiles} required/></Col>
                        <Col><Form.Control placeholder="basophills" ref={basophills} required/></Col>
                    </Row>
                    <Row className='my-4'>
                        <Col><Form.Control placeholder="pcv" ref={pcv} required/></Col>
                        <Col><Form.Control placeholder="wbc" ref={wbc} /></Col>
                    </Row>
                    <Row className='my-4'>
                        <Col><Form.Control placeholder="lymphocytes" ref={lymphocytes} required/></Col>
                        <Col><Form.Control placeholder="monocytes" ref={monocytes} required/></Col>
                    </Row>
                    <Row className='my-4'>
                        <Col><Form.Control placeholder="rbc" ref={rbc} required/></Col>
                        <Col><Form.Control placeholder="mcv" ref={mcv} required/></Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='danger' onClick={()=>setopenmodal(false)}>Close</Button>
                <Button type="submit" onClick={()=>{onHide()}}>Submit</Button>
            </Modal.Footer>
        </Modal></div>
    )
}

export default HeamaModal