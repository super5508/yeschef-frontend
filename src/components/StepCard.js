import React, { Component } from 'react';
import Slider from "react-slick";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const cardStyle = {
  backgroundColor: '#1E1E1E',
  borderRadius: 8,
  margin: '2.4rem 1.2rem',
  height: 'calc(100vh - 276px - 4.8rem)',
  display: 'flex',
  flexDirection: 'column'
}

const cardContent = {
  padding: '2.3rem',
  flex: 1,
  overflow: 'auto',
}

const cardTitle = {
  fontSize: 20,
  fontWeight: 600
}

const cardAction = {
  height: 'auto',
  backgroundColor: '#262626',
  padding: '2.3rem',
  flexDirection: 'column',
  alignItems: 'flex-start',
}

const proTipStyle = {
  margin: 0,
  fontSize: 14,
  color: 'rgba(255,255,255)',
}

const proTipcontentStyle = {
  margin: 0,
  fontSize: 20,
  color: '#fff',
  fontWeight: 300
}

class StepCard extends Component {

  render() {
    const settings = {
      infinite: false,
      dots: false,
      slidesToShow: 1,
      centerMode: true,
      centerPadding: '30px',
    };

    const { items } = this.props;

    return (
      <Slider {...settings}>
        {
          items.map(item => {
            return (
              <div key={item.id}>
                <Card style={cardStyle}>
                  <CardContent style={cardContent}>
                    <h2 style={cardTitle}>{item.title}</h2>
                    <p style={proTipcontentStyle}>
                      {item.content}
                    </p>
                  </CardContent>
                  {
                    item.proTip ? (
                      <CardActions style={cardAction}>
                        <h4 style={proTipStyle}>PRO-TIP</h4>
                        <span style={proTipcontentStyle}>{item.proTip}</span>
                      </CardActions>
                    ) : null
                  }
                </Card>
              </div>
            )
          })
        }
      </Slider>
    )
  }
}

export default StepCard;