import React, { Component } from 'react';

import { withStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box'

const styles = theme => ({
  wrapper: {
    paddingBottom: '2.3rem',
  },
  imgContainer: {
    width: '100%'
  },
  itemContainer: {
    paddingTop: '2.3rem',
    fontSize: 16,
  },
  description: {
    color: '#FFFFFF',
    fontWeight: 300,
    padding: '1.2rem 2.3rem'
  }
});

class BeforeScene extends Component {

  render() {
    const { classes, section } = this.props;
    return (
      <Box
        className={classes.wrapper}
      >
        {
          section.map(item => {
            return (
              <div key={item.id} className={classes.itemContainer}>
                <div>
                  <img src={item.src} alt="pic" className={classes.imgContainer} />
                </div>
                {
                  item.description ? (
                    <div className={classes.description}>
                      <span>{item.description}</span>
                    </div>
                  ) : null
                }
              </div>
            )
          })
        }
      </Box>
    )
  }
}

export default withStyles(styles, { withTheme: true })(BeforeScene);