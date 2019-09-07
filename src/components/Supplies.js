import React, { Component } from 'react';

import { withStyles } from "@material-ui/core/styles";
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const ExpansionPanel = withStyles({
  root: {
    boxShadow: 'none',
    marginBottom: '2.3rem',
    '&:before': {
      display: 'none',
    },
  },
  expanded: {
    marginBottom: '2.3rem'
  },
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: '#262626',
    borderRadius: '6px',
    minHeight: 56,
    '&$expanded': {
      marginBottom: '0px',
      minHeight: 56,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
  content: {
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles({
  root: {
    backgroundColor: '#1E1E1E',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    marginBottom: '2.3rem',
    display: 'flex',
    flexDirection: 'column'
  },
  expanded: {
    marginBottom: '2.3rem'
  }
})(MuiExpansionPanelDetails);

const titleStyle = {
  fontSize: 12,
  color: '#ffffff',
  fontWeight: 600
}

const detailStyle = {
  fontSize: 16,
  color: '#ffffff'
}

const separator = {
  width: '100%',
  height: '1px',
  borderTop: '1px solid #ffffffaa'
}

class SupplyInfo extends Component {

  decimalToFraction = amount => {
    // This is a whole number and doesn't need modification.
    if (parseFloat(amount) === parseInt(amount)) {
      return amount;
    }
    // Next 12 lines are cribbed from https://stackoverflow.com/a/23575406.
    var gcd = function (a, b) {
      if (b < 0.0000001) {
        return a;
      }
      return gcd(b, Math.floor(a % b));
    };
    var len = amount.toString().length - 2;
    var denominator = Math.pow(10, len);
    var numerator = amount * denominator;
    var divisor = gcd(numerator, denominator);
    numerator /= divisor;
    denominator /= divisor;
    var base = 0;
    // In a scenario like 3/2, convert to 1 1/2
    // by pulling out the base number and reducing the numerator.
    if (numerator > denominator) {
      base = Math.floor(numerator / denominator);
      numerator -= base * denominator;
    }
    amount = Math.floor(numerator) + "/" + Math.floor(denominator);
    if (base) {
      amount = base + " " + amount;
    }
    return amount;
  };

  getComment = (head, value) => {
    let comment = "";
    const { ingredients } = this.props;
    if (
      ingredients.mapValue.fields[head].mapValue.fields[value]
        .mapValue.fields.comment
    ) {
      comment = ingredients.mapValue.fields[head].mapValue.fields[
        value
      ].mapValue.fields.comment.stringValue;
      comment = "- " + comment;
    }
    return comment;
  }

  getUnit = (head, value) => {
    let unit = "";
    const { ingredients } = this.props;
    if (
      ingredients.mapValue.fields[head].mapValue.fields[value]
        .mapValue.fields.unit
    ) {
      unit = ingredients.mapValue.fields[head].mapValue.fields[
        value
      ].mapValue.fields.unit.stringValue;
    }
    return unit;
  }

  getQuantity = (head, value) => {
    let quantity = "";
    const { ingredients } = this.props;
    if (
      ingredients.mapValue.fields[head].mapValue.fields[value]
        .mapValue.fields.quantity
    ) {
      quantity = Object.values(
        ingredients.mapValue.fields[head].mapValue.fields[value]
          .mapValue.fields.quantity
      )[0];
    }
    return quantity;
  }

  firstLetterToCapital = str => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  render() {
    const { head, id, ingredients, gears } = this.props;
    return (
      <ExpansionPanel key={`${head}-${id}`}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${id}-content`}
          id={`panel${id}-header`}
        >
          {head.toUpperCase()}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails
        >
          <div>
            <h4 style={titleStyle}>INGREDIENTS</h4>
            {
              Object.keys(ingredients.mapValue.fields[head].mapValue.fields).map(
                (value, index) => {
                  const quantity = this.getQuantity(head, value);
                  const unit = this.getUnit(head, value);
                  const comment = this.getComment(head, value);
                  return (
                    <ul key={value}>
                      <li key={`li${value}-${index}`}>
                        <span style={detailStyle}>
                          {this.decimalToFraction(quantity)} {unit} {value} {comment}
                        </span>
                      </li>
                    </ul>
                  );
                }
              )
            }
          </div>
          <div style={separator} />
          <div>
            <h4 style={titleStyle}>GEAR</h4>
            <ul>
              {
                Object.keys(gears.mapValue.fields).map(
                  (data, index) => {
                    console.log(gears);
                    return (
                      <li key={`ligear-${index}`} >
                        <span style={detailStyle}>
                          {this.firstLetterToCapital(data)}
                        </span>
                      </li>
                    )
                  }
                )
              }
            </ul>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}

export default SupplyInfo;