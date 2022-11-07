import { makeStyles, Typography } from '@material-ui/core';
import images from '../assets/images'
import Carousel from 'react-material-ui-carousel'

const useStyles = makeStyles((theme) => ({
    header: {
        fontSize: '4rem',
        color: '#2C2891'
    },
    carousel: {
        width: '100%'
    },
    img: {
        width: '100%',
        height: 'auto'
    }
}))


function Home() {
    const classes = useStyles();

    return (
        <div>
            <Typography variant= 'h1' className={classes.header}>Welcome to Le Coucher Coaches!</Typography>
            <Carousel className={classes.carousel}>
                {images.map((image, index) =>
                    <div>
                        <img className={classes.img} key={index} src={image.src} alt={image.description} />
                        <Typography key={image.src}>{image.description}</Typography>
                    </div>
                )}
            </Carousel>
            <br /> 
            <br />
            <Typography paragraph>
                Come and enjoy the most comfortable bus rides in East Africa with Le Coucher Coaches. You will always stay online with our free WiFi and 
                power oulets in our coaches while relaxing in the most comfortable seats with enough leg room. Our clients always come first and that is why we 
                made sure that comfort and safety were a priority.
            </Typography>
        </div>
    )
}

export default Home;
