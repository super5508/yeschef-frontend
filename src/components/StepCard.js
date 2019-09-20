import React, { Component } from 'react';
import Slider from "react-slick";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const cardStyle = {
  backgroundColor: '#1E1E1E',
  borderRadius: 8,
  margin: '2.4rem 1.2rem'
}

const cardContent = {
  padding: '2.3rem',
}

const cardAction = {
  backgroundColor: '#262626',
  padding: '2.3rem'
}

class StepCard extends Component {

  handleMouseDown = (evt) => {
    console.log('Down')
  }

  render() {
    const settings = {
      infinite: true,
      dots: false,
      slidesToShow: 1,
      centerMode: true,
      centerPadding: '40px',
    };
    const { onSwipe } = this.props;
    return (
      <Slider {...settings} onMouseDown={() => onSwipe(true)} onMouseUp={() => onSwipe(false)}>
        <div>
          <Card style={cardStyle}>
            <CardContent style={cardContent}>
              Word of the Day #1
            </CardContent>
            <CardActions style={cardAction}>
              Actions
            </CardActions>
          </Card>
        </div>
        <div>
          <Card style={cardStyle}>
            <CardContent style={cardContent}>
              Word of the Day #2
            </CardContent>
            <CardActions style={cardAction}>
              Actions
            </CardActions>
          </Card>
        </div>
        <div>
          <Card style={cardStyle}>
            <CardContent style={cardContent}>
              Word of the Day #3
            </CardContent>
            <CardActions style={cardAction}>
              Actions
            </CardActions>
          </Card>
        </div>
        <div>
          <Card style={cardStyle}>
            <CardContent style={cardContent}>
              Word of the Day #4
            </CardContent>
            <CardActions style={cardAction}>
              Actions
            </CardActions>
          </Card>
        </div>
      </Slider>
    )
  }
}

export default StepCard;