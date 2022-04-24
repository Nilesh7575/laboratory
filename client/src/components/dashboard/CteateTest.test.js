import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CreateTest from './CreateTest';
Enzyme.configure({ adapter: new Adapter() });




describe('CreateTest Component', () =>{
    it('Register render', ()=>{
        const wrapper = shallow(<CreateTest/>);
        const button = wrapper.find('Button');
        expect(button).toBeTruthy();
    })
    it('Register render', ()=>{
        const wrapper = shallow(<CreateTest/>);
        const select = wrapper.find('Form.Select');
        expect(select).toBeTruthy();
    })
    it('Register render', ()=>{
        const wrapper = shallow(<CreateTest/>);
        const option = wrapper.find('option');
        expect(option).toBeTruthy();
    })
    it('Register render', ()=>{
        const wrapper = shallow(<CreateTest/>);
        const checkbox = wrapper.find('input');
        expect(checkbox).type("checkbox").toBeTruthy();
    })
})