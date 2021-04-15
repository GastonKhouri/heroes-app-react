import { mount } from "enzyme";
import { MemoryRouter } from "react-router";
import { AuthContext } from "../../auth/AuthContext";
import { DashboardRoutes } from "../../routers/DashboardRoutes";

describe('Pruebas en <DashboardRoutes />', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'Gastón'
        }
    }
   
    test('Debe de mostrarse correctamente', () => {
       
        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        
        expect(wrapper.find('.text-info').text().trim()).toBe('Gastón');
        expect(wrapper).toMatchSnapshot();
        
    });    

});
