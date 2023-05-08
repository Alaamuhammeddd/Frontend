import React from 'react';
import '../../style/home.css';
import image from '../../core/data/images/pexels-sora-shimazaki-5668473.jpg';
import  myimage from '../../core/data/images/pexels-anna-nekrashevich-7552741.jpg';
import adminimage from '../../core/data/images/pexels-tranmautritam-326502.jpg';
import Carousel from 'react-bootstrap/Carousel';


function Home() {
  return (
    <Carousel fade >
      <Carousel.Item>
        <img
          className="image-container d-block w-100"
          src= {image }
          alt="Auctions"
        />
        <Carousel.Caption>
          <h3>Elite APP</h3>
          <p>Welecome to our website</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className=" image-container2 d-block w-100"
          src={myimage}
          alt="products"
        />
        <Carousel.Caption>
          <h3>Bidder & Seller</h3>
          <p>You can bid or sell any thing here </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className=" image-container3 d-block w-100"
          src={adminimage}
          alt="Manage"
        />
        <Carousel.Caption>
          <h3>ManageAuctions&Accounts</h3>
          <p>Admin can Manage Auctions & Accounts</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Home;
