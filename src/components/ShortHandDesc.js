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
  fontSize: 16,
  color: '#ffffffe6',
  fontStyle: 'italic',
  fontWeight: 400,
}

const detailStyle = {
  fontSize: 16,
  color: '#ffffffe6'
}

const separator = {
  width: '100%',
  height: '1px',
  borderTop: '1px solid #ffffffaa',
  margin: '24px 0'
}

const shortStyle = {
  ':before': {
    color: 'white'
  }
}

class ShortHandDesc extends Component {
  render() {
    const { head, id, shorthand } = this.props;
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
            <div style={titleStyle}>
              {
                shorthand.mapValue.fields[head].mapValue.fields.title.stringValue
              }
            </div>
          </div>
          <div style={separator} />
          <div>
            <ul className='numbering'>
              {
                shorthand.mapValue.fields[head].mapValue.fields.instructions.arrayValue.values.map((each, index) => {
                  return (
                    <li key={`lishort-${index}`} style={shortStyle}>
                      <span style={detailStyle}>
                        {each.stringValue}
                      </span>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}

export default ShortHandDesc;