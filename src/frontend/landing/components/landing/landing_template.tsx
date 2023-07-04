import React from "react";
import {
  LandingController,
  LandingProps,
  LandingState,
} from "./landing_interface";

export function template(
  this: LandingController,
  props: LandingProps,
  state: LandingState
) {
  return <div>Im The Landing Page</div>;
}
