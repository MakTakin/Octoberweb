import React from 'react';
import Header from "../header/header";
import DescriptionTask from "../description-task/description-task";
import LinksApi from "../links-api/links-api";
import FirstBlock from "../first-block/first-block";
import SecondBlock from "../second-block/second-block";
import ThirdBlock from "../third-block/third-block";
import Gallery from "../galery/gallery";
import Form from "../form/form";
import Footer from "../footer/footer";
import "./app.css"
import 'react-notifications-component/dist/theme.css'
import ReactNotification from 'react-notifications-component'





function App() {
  return (
    <div className='container'>
    <ReactNotification />
    <Header/>
    <DescriptionTask/>
    <LinksApi/>
    <FirstBlock/>
    <SecondBlock/>
    <ThirdBlock/>
    <Gallery/>
    <Form/>
    <Footer/>
    </div>
  );
}

export default App;
