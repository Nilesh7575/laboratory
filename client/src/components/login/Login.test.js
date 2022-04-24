import Login from "./Login";
import { fireEvent, render } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import { TextField } from "@mui/material";





describe('Login Button', ()=>{
    it("login button render",()=>{
        let {queryByTitle} = render(<Login/>);
        let btn = queryByTitle("loginbtn");
        expect(btn).toBeTruthy()
    })

    it("onSubmit",()=>{
        let {queryByTitle} = render(<Login />)
        let btn = queryByTitle("loginbtn")
        fireEvent.submit(btn) 
        
    })
})

describe("input field test",()=>{
    it("login render",()=>{
        let {queryByTitle}=render (<Login />)
        let input = queryByTitle("email")
        expect(input).toBeTruthy()
    })
})


describe("password field test", () => {
    it("password render",()=>{
        let {queryByTitle}=render (<Login />)
        let input = queryByTitle("password")
        expect(input).toBeTruthy()
    })
})


