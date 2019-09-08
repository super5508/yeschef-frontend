import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({

});

class ShortHandDesc extends Component {

  getTitle = () => {
    const { shorthand, head } = this.props;
  }

  render() {
    const { classes, shorthand, head, id } = this.props;
    return (
      <div>
        <div>
          {
            shorthand.mapValue.fields[head].mapValue.fields.title.stringValue
          }
        </div>
        <div>
          {
            shorthand.mapValue.fields[head].mapValue.fields.instructions.arrayValue.values.forEach(each =>
              <p>each.stringValue</p>
            )
          }
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ShortHandDesc);
