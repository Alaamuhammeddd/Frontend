import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import React from "react";
import AuctionList from "./components/AuctionList";
import ChosenAuction from "./components/ChosenAuction";
import ViewWonAuctions from "./components/ViewWonAuctions";
import PostingAuction from "./components/PostingAuction";
import ActivityHistory from "./components/ActivityHistory";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Home from "./pages/home/home";
import ManageAccounts from "./pages/Manage-Auctions/ManageAccounts";
import ManageAuctions from "./pages/Manage-Auctions/ManageAuctions";
import UpdateAuctions from "./pages/Manage-Auctions/UpdateAuctions"
import ViewTransactionResult from "./pages/Manage-Auctions/ViewTransactionResult"

  export const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children: [
               {
                   path: "/home",
                   element: <Home/>
               },
                  {
                    path: "/auctions",
                    element: <AuctionList/>
                  },
                  {
                    path: "/won-auctions",
                    element: <ViewWonAuctions/>
                  },
                  {
                    path: "/auctions/:id",
                    element: <ChosenAuction/>
                  },
                  {
                    path: "/activity-history/:id",
                    element: <ActivityHistory/>
                  },
                  {
                    path: "/ManageAccounts",
                    element:<ManageAccounts/>,
                  },
                  {
                    path: "/ViewTransactionResult",
                    element: <ViewTransactionResult/>,
                  },
                 {
                    path: "/login",
                    element: <Login/>
                  },
                  {
                    path: "/register",
                    element: <Register/>
                  },
                  {
                    path: "/manageauctions",
                    children:[
                      {
                        path: '',
                         element: <ManageAuctions/>
                      },
                       {
                        path: 'add',
                        element: <PostingAuction/>
                      },
                     {
                      path: ':id',
                       element: <UpdateAuctions/>
                      },
                    
                    ]
                  },
                ]


    },
    {
        path:'*',
        element:<div>
            <h2>Page Not Found</h2>
        </div>
    }
    
]);