import Enzyme, { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
export { shallow, mount, render };
export default Enzyme;


// test('jest.fn ', () =>{
//   const mock = jest.fn();
// })
// const sum = require('./server/controllers/testingSum')
// const mockCallback = jest.fn

// const mockCalback = () =>{
//   const res = {};
//   res.status = jest.fn(.mockReturnValue(res))
// 

// test('adds 1 + 2 to equal 3', () => {
//   expect(sum.sum(1, 2)).toBe(3);
// });


// describe ("getInterests", (=>{
//   describe("posting to database", ()=>{
//     it('returns array of interests',() =>{
//       return 
//     })
//   })
// }))

// describe("postgres database", ()=>{
//   describe("Connection", ()=>{
//     it("Should connect without an error", )
//   })
// })
