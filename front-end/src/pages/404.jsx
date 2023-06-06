import React from "react";
import { Link } from "react-router-dom";

export default function NotFound({ more }) {
  return (
    <>
      <div className="container py-5">
        <div className="container-fluid">
          <h1 className="display-5">Page Not Found!</h1>
          <p className="text-muted">
            Uh-oh, it looks like we've stumbled upon an interdimensional portal!
            Unfortunately, it doesn't seem to lead anywhere, as this page is
            nowhere to be found. Perhaps we can try again from another
            dimension, but for now let's just stick to the pages that exist in
            this universe. Please use the navigation menu to continue your
            journey!
          </p>
          <div className="d-flex gap-3 flex-column flex-sm-row">
            <Link to="/" className="btn btn-lg btn-primary">
              Find Your Way Back
            </Link>
            <Link
              to={more != undefined ? "/" + more : "/"}
              className="btn btn-lg btn-outline-success"
            >
              Explore More
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
