import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import NavigateBar from "./NavigateBar"






describe('navbar', ()=>{
    it('navbar render', ()=>{
        const wrapper = shallow(<NavigateBar/>);
        const classname = wrapper.find('Nav');
        expect(classname).toBeTruthy();

    })

    it('NavLink Render', ()=>{
        const wrapper = shallow(<NavigateBar/>);
        const classname = wrapper.find('Nav.Link');
        expect(classname).toBeTruthy();

    })
})