import {lazy, Suspense} from 'react';
import {BrowserRouter,  Route, Routes } from 'react-router';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';

//paginas publicas
import { PublicLayout } from '../layouts/PublicLayout';
const HomePage = lazy(()=> import('../pages/PublicPages/HomePage/HomePage'));
const AboutPage = lazy(()=> import('../pages/PublicPages/AboutPage/AboutPage')) ;
const RegisterPage = lazy(()=> import('../pages/PublicPages/AuthPages/RegisterPage/RegisterPage')) ;
const LoginPage = lazy(()=> import('../pages/PublicPages/AuthPages/LoginPage/LoginPage')) ;
const ErrorPage = lazy(()=> import('../pages/PublicPages/ErrorPage/ErrorPage')) ;

//paginas privadas
import { UserLayout } from '../layouts/UserLayout';
const WallPage = lazy(()=> import('../pages/UserPages/WallPage/WallPage')) ;
const ProfilePage = lazy(()=> import('../pages/UserPages/ProfilePage/ProfilePage')) ;

//paginas privadas de admin
import { AdminLayout } from '../layouts/AdminLayout';
const AdminDashboardPage = lazy(()=> import('../pages/AdminPages/AdminDashboardPage/AdminDashboardPage')) ;
const AdminUserPage = lazy(()=> import('../pages/AdminPages/AdminUsersPage/AdminUserPage')) ;

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<h2>Cargando...</h2>}>
      <Routes>
        {/* Rutas públicas */}
        <Route element={<PublicRoutes />}>
          <Route element={<PublicLayout/>}>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/about' element={<AboutPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
          </Route>
        </Route>
        {/* Rutas privadas user normal */}
        <Route element={<PrivateRoutes/>}>
          <Route element={<UserLayout/>}>
            <Route path='/wall' element={<WallPage/>}/>
            <Route path='/userProfile' element={<ProfilePage/>}/>

          </Route>
        </Route>
        {/* Rutas privadas admin */}
        <Route element={<PrivateRoutes/>}>
          <Route element={<AdminLayout/>}>
            <Route path='/adminDashboard' element={<AdminDashboardPage/>}/>
            <Route path='/adminUserPage' element={<AdminUserPage/>}/>
          </Route>
        </Route>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
