import React, { Component } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

interface PasswordCheckerProps {
  password: string;
  className?: string;
}

enum Strength {
  WEAK = "Weak",
  MODERATE = "Moderate",
  STRONG = "Strong",
}

export class PasswordChecker extends Component<PasswordCheckerProps, {}> {
  private get strength(): Strength {
    const passLen = this.props.password.length;
    if (passLen > 10 && passLen <= 17) return Strength.MODERATE;
    if (passLen > 17) return Strength.STRONG;
    return Strength.WEAK;
  }

  private get variant(): string {
    switch (this.strength) {
      case Strength.STRONG:
        return "success";
      case Strength.MODERATE:
        return "warning";
      default:
        return "danger";
    }
  }

  render() {
    return (
      <ProgressBar
        striped
        animated
        variant={this.variant}
        label={this.strength}
        now={100}
      />
    );
  }
}
