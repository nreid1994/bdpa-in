import React from "react";
import "./app.scss";
import { AppProps, AppState, AppController } from "./app_interface";
import { Auth } from "../../../auth/components/auth/auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "../../../landing/components/landing/landing";
import Navbar from "react-bootstrap/Navbar";

export function template(
  this: AppController,
  props: AppProps,
  state: AppState
) {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path='/' element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
