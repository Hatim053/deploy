import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.jsx'

import UserSignup from './components/Signup/UserSignup/UserSignup.jsx'
import UserLogin from './components/Login/UserLogin/UserLogin.jsx'

import SellerSignup from './components/Signup/SellerSignup/SellerSignup.jsx'
import SellerLogin from './components/Login/SellerLogin/SellerLogin.jsx'


import Subscription from './components/Profile/Subscription/Subscription.jsx'
import PaymentHistory from './components/Profile/PaymentHistory/PaymentHistory.jsx'
import AccountInfo from './components/Profile/AccountInfo/AccountInfo.jsx'
import Sidebar from './components/Profile/Sidebar/Sidebar.jsx'
import ProfileFeed from './components/Profile/ProfileFeed.jsx/ProfileFeed.jsx'
import Banner from './components/Banner/Banner.jsx'
import MyFeed from './components/Profile/MyFeed/MyFeed.jsx'
import ChatFeed from './components/Chat/ChatFeed/ChatFeed.jsx'
import Feed from './components/Feed/Feed.jsx'
import AdDescription from './components/Advertisement/AdDescription/AdDescription.jsx'
import PostAdvertisement from './components/Advertisement/PostAdvertisement/PostAdvertisement.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/Store.js'


// payment successfull hone ke baad payment history wale page per re-direct karana he
// jitne bhi form paste kiya he sabme encType or click event ko onClick karna h
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children : [
      {
        index : true,
        element : <Banner />,
      },
    ]
  },
  {
    path: '/chat',
    element: <ChatFeed />
  },
  {
    path : '/profile-feed',
    element : <ProfileFeed />,
    children : [
      {
        index : true,
        element : <AccountInfo />,
      },
      {
        path : '/profile-feed/account-info',
        element : <AccountInfo />,
      },
      {
        path : '/profile-feed/subscription',
        element : <Subscription />,
      },
      {
        path : '/profile-feed/payment-history',
        element : <PaymentHistory />,
      },
      {
        path : '/profile-feed/my-advertisements',
        element : <MyFeed />,
      },
    ]
  },
  {
    path: '/payment',
    element: <Subscription />
  },
  {
    path: '/user-signup',
    element: <UserSignup />
  },
  {
    path: '/seller-signup',
    element: <SellerSignup />
  },
  {
    path: '/user-login',
    element: <UserLogin />
  },
  {
    path: '/seller-login',
    element: <SellerLogin />
  },
  {
    path: '/AdDescription',
    element: <AdDescription />,
  },
  {
    path: '/postAdvertisement',
    element: <PostAdvertisement />,
  },
  {
    path : '/sidebar',
    element : <Sidebar />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
