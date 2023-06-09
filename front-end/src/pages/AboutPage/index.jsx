import React from "react";
import bgimage from "../../assets/images/ready.jpg";
import bgimage3 from "../../assets/images/shoppingbag.jpg";
import bgimage2 from "../../assets/images/cash.jpg";
import team1 from "../../assets/images/team-1.jpg";
import testimonial3 from "../../assets/images/testimonials-3.jpg";
import "./styles.css";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div>
      <header className="text-center text-white masthead">
        <div className="overlayheader"></div>
        <div className="container">
          <div className="row">
            <div className="col-xl-9 mx-auto position-relative">
              <h1 className="mb-12">
                ClearMySpace: Where Clutter Meets Opportunity!
              </h1>
            </div>
            <div className="col-md-10 col-lg-8 col-xl-7 mx-auto position-relative">
              <div className="row">
                <div className="col-12 align-items-end">
                  <p className="">Ready to start selling?</p>
                  <Link to="/createaccount">
                    <button className="btn btn-primary btn-lg" type="submit">
                      Sign up!
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="text-center bg-light features-icons">
        <div className="container">
          <div className="row d-flex g-5">
            <div className="col-lg-4">
              <div className="mx-auto features-icons-item mb-5 mb-lg-0 mb-lg-3">
                <div className="d-flex features-icons-icon">
                  <i
                    className="icon-screen-desktop m-auto text-primary"
                    data-bss-hover-animate="pulse"
                  ></i>
                </div>
                <h3>Start Making Money</h3>
                <p className="lead mb-0" style={{ fontSize: "16px" }}>
                  Find Your Treasure: Search & Sell on ClearMySpace! Your
                  Ultimate Destination for Buying and Selling Clutters with
                  Ease! Declutter your life and earn some extra cash by
                  leveraging our user-friendly platform.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="mx-auto features-icons-item mb-5 mb-lg-0 mb-lg-3">
                <div className="d-flex features-icons-icon">
                  <i
                    className="icon-layers m-auto text-primary"
                    data-bss-hover-animate="pulse"
                  ></i>
                </div>
                <h3>Declutter!!!</h3>
                <p className="lead mb-0" style={{ fontSize: "16px" }}>
                  Are you tired of living with unnecessary clutter? Or perhaps
                  you're in search of hidden treasures at unbeatable prices?
                  Look no further than ClearMySpace, your trusted e-commerce
                  platform that connects buyers and sellers in a seamless and
                  reliable manner.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="mx-auto features-icons-item mb-5 mb-lg-0 mb-lg-3">
                <div className="d-flex features-icons-icon">
                  <i
                    className="icon-check m-auto text-primary"
                    data-bss-hover-animate="pulse"
                  ></i>
                </div>
                <h3>Easy to Use</h3>
                <p className="lead mb-0" style={{ fontSize: "16px" }}>
                  Ready to dive in? Whether you want to sell your unused items
                  or explore a vast collection of unique products, our platform
                  offers a user-friendly experience. Upload your own content,
                  and reach a wide audience of potential buyers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="showcase">
        <div className="container-fluid p-0">
          <div className="row g-0">
            <div className="col-lg-6 text-white order-lg-2 showcase-img">
              <span></span>
            </div>
            <div className="col-lg-6 my-auto order-lg-1 showcase-text p-5">
              <h2>Showcase your items</h2>
              <p className="lead mb-0">
                Sell your unwanted items hassle-free and earn some extra cash
                along the way. Our user-friendly platform provides you with the
                tools and features you need to create compelling listings,
                showcase your items, and reach a wide audience of eager buyers.
                With ClearMySpace, the process of selling becomes a breeze,
                giving you the freedom to clear your space and make money in no
                time.
              </p>
            </div>
          </div>
          <div className="row g-0">
            <div
              className="col-lg-6 text-white showcase-img"
              style={{ backgroundImage: `url(${bgimage2})` }}
            >
              <span></span>
            </div>
            <div className="col-lg-6 my-auto showcase-text p-5">
              <h2>Want To Buy?</h2>
              <p className="lead mb-0">
                On the flip side, as a buyer, you'll be amazed by the vast
                selection of items available at affordable prices. Explore a
                diverse range of categories, from electronics and fashion to
                home decor and collectibles. Our platform empowers you to
                browse, discover, and connect with sellers directly, ensuring a
                secure and transparent transaction every time.
              </p>
            </div>
          </div>
          <div className="row g-0">
            <div
              className="col-lg-6 text-white order-lg-2 showcase-img img3"
              style={{ backgroundImage: `url(${bgimage3})` }}
            >
              <span></span>
            </div>
            <div className="col-lg-6 my-auto order-lg-1 showcase-text p-5">
              <h2>Easy to Use &amp; Customize</h2>
              <p className="lead mb-0">
                ClearMySpace takes pride in its commitment to excellence. With
                our modern and intuitive design, you can easily navigate the
                site, find what you're looking for, and engage with a vibrant
                community of like-minded individuals. We stay up-to-date with
                the latest technology, using the power of Bootstrap 5 to deliver
                a seamless experience across all devices, so you can shop and
                sell anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center bg-light testimonials">
        <div className="container">
          <h2 className="mb-5">Our Team</h2>
          <div className="row">
            <div className="col-lg-6">
              <div className="mx-auto testimonial-item mb-5 mb-lg-0">
                <img
                  className="img-fluid rounded-circle mb-3"
                  src={team1}
                  alt="..."
                />
                <h5>Abraham OLAGUNJU</h5>
                <p className="font-weight-light mb-0">Full-Stack Developer</p>
                <small className="text-muted">
                  Responsible for designing and implementing ClearMySpace's web
                  application server-side logic, database.
                </small>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mx-auto testimonial-item mb-5 mb-lg-0">
                <img
                  className="img-fluid rounded-circle mb-3"
                  src={testimonial3}
                  alt="..."
                />
                <h5> Chukwudi ONYENIKE</h5>
                <p className="font-weight-light mb-0">Front-end Dveloper</p>
                <small className="text-muted">
                  responsible for managing the infrastructure and deployment of
                  application while also assisting with the backend development.
                </small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="call-to-action"
        style={{ backgroundImage: `url(${bgimage})` }}
      >
        <div className="container">
          <h2 className="mb-4">Ready to get started? Sign up now!</h2>
          <Link to="/createaccount">
            <button className="btn btn-primary btn-lg ml-3" type="submit">
              Sign up!
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
