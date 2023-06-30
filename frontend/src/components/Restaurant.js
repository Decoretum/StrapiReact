import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, Link, RouterProvider} from 'react-router-dom'
import {useQuery, useMutation} from '@tanstack/react-query'

function Restaurant(){
    return(
        <>
            <Link to={'/'}> Back </Link>
        </>
    )
}

export default Restaurant;