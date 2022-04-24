import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UserSampleRecord from './UserSampleRecord';
Enzyme.configure({ adapter: new Adapter() });




describe(' User Sample Record Function',()=>{
    it('should render',()=>{
        const wrapper = shallow(<UserSampleRecord/>);
        const button = wrapper.find('Button');
        expect(button).toBeTruthy();
    })


    it(' Table should render',()=>{
        const wrapper = shallow(<UserSampleRecord/>);
        const table = wrapper.find('Table');
        expect(table).toBeTruthy();
    })

    it('Table Row should render',()=>{
        const wrapper = shallow(<UserSampleRecord/>);
        const tr = wrapper.find('tr');
        expect(tr).toBeTruthy();
    })

    it('Table Colomn should render',()=>{
        const wrapper = shallow(<UserSampleRecord/>);
        const th = wrapper.find('th');
        expect(th).toBeTruthy();
    })

})