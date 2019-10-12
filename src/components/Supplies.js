import React, { Component } from 'react';

import { withStyles } from "@material-ui/core/styles";
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const ExpansionPanel = withStyles({
  root: {
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
      marginBottom: '2.3rem',
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
      marginBottom: '2.3rem'
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: '#262626',
    marginBottom: -1,
    minHeight: 56,
    borderRadius: 6,
    '&$expanded': {
      minHeight: 56,
      borderRadius: 0,
      borderTopLeftRadius: 6,
      borderTopRightRadius: 6,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: '#1E1E1E',
    display: 'flex',
    flexDirection: 'column',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
}))(MuiExpansionPanelDetails);

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
    if (amount === "") return 0;
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

  firstLetterToCapital = str => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  render() {
    const { id, supplies } = this.props;
    const head = supplies.sectionName;
    return (
      <ExpansionPanel key={`${head}-${id}`} square={false}>
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
              supplies.ingredients.map(
                (ingredient, index) => {
                  return (
                    <ul key={ingredient.id}>
                      <li key={`li${ingredient.id}`}>
                        <span style={detailStyle}>
                          {this.decimalToFraction(ingredient.quantity)} {ingredient.unit} {ingredient.name} {ingredient.details}
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
                supplies.gear.map(
                  (gear, index) => {
                    return (
                      <li key={`ligear-${index}`} >
                        <span style={detailStyle}>
                          {gear.quantity > 1 && (gear.quantity)} {this.firstLetterToCapital(gear.name)}
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