import Typography from '@material-ui/core/Typography';
import {Container, List, ListItem, ListItemText} from '@material-ui/core'

function About() {
    const routes = [
        'Kampala to Mombasa',
        'Kampala to Nairobi',
        'Kampala to Kigali',
        'Kampala to Juba'
    ]

    return (
        <Container>
            <Typography>
                Our company was started from humble beginnings in 2015 and we have since provided the most comfortable rides to our clients thanks to professional drivers
                and using the most comfortable coaches on the market. Our reliable customer service has also left clients' queries and issues clarified and attended to.
                Our buses have onboard Wi-Fi and power oulets so that our customers are always connected in this dotcom era.
                Our founders know there's nothing that beats the beautiful view of a sunset and hence the name <em style={{color:'#FFB319'}}>'Le Coucher'</em>.
                <br />
                <br />
                Our Routes:
            </Typography>
            <List>
                {routes.map((route) => (
                    <ListItem>
                        <ListItemText primary={route} />
                    </ListItem>
                ))}
            </List>
        </Container>
    )
}

export default About;
