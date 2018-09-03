import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

global.shallow = Enzyme.shallow;

Enzyme.configure({ adapter: new Adapter() });
