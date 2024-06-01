import { Navigate, Route, Routes} from 'react-router-dom'
import Layout from './layouts/Layout';
import HomePage from './Pages/HomePage';
import AuthCallBackPage from './Pages/AuthCallBackPage';
import UserProfilePage from './Pages/UserProfilePage';
import ProtectedRoute from './auth/ProtectedRoute';
import ManageRestaurantPage from './Pages/ManageRestaurantPage';
import SearchPage from './Pages/SearchPage';

const AppRoutes = () =>{
    return (
        <Routes>
            <Route path='/' element={
                                <Layout showHero={true}>
                                    <HomePage/>
                                </Layout>
                            }/>
            <Route path='/auth-callback' element={<AuthCallBackPage/>}/>
            
            {/*Ruta sin protección*/}
            <Route
                path="/search/:city"
                element={
                    <Layout showHero={false}>
                        <SearchPage />
                    </Layout>
                }
            />
            
            {/* Protección de rutas */}
            <Route element={<ProtectedRoute />}>
                <Route path='/user-profile' 
                    element={
                        <Layout>
                            <UserProfilePage />
                        </Layout>
                    }
                />
                <Route path='/manage-restaurant' 
                    element={
                        <Layout>
                            <ManageRestaurantPage />
                        </Layout>
                    }
                />
            </Route>
            <Route path='*' element={<Navigate to="/" />}/>
        </Routes>
    )
};

export default AppRoutes;