import * as React from "react";
import * as renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import history from "../../history";
import Footer from "./footer";

it(`Render Footer`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <Footer/>
        </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
