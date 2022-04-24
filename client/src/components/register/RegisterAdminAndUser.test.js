// import {shallow} from 'enzyme'
import Enzyme, { shallow } from 'enzyme';
import RegisterAdminAndUser from './RegisterAdminAndUser'
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });




describe("Register Component", () =>{
    it('Register render', ()=>{
        const wrapper = shallow(<RegisterAdminAndUser/>);
        const button = wrapper.find('Button');
        expect(button).toBeTruthy();

    })

    it('Register render', ()=>{
        const wrapper = shallow(<RegisterAdminAndUser/>);
        const input = wrapper.find('Form.Control');
        expect(input).toBeTruthy();

    })
})