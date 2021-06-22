import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import {makeStyles,} from "@material-ui/core/styles";
import {IStore} from "../../types/IStore";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import {Grid} from "@material-ui/core";
import * as React from "react";
import {useRouter} from "next/router";
import createDOMPurify from 'dompurify';

const useStyles = makeStyles(() => ({
        cardRoot: {
            margin: "45px auto 0 auto",
        },
        card: {
            margin: 30
        },
        moreBtn: {
            marginLeft: 'auto'
        },
        rateValue: {
            marginLeft: 8,
            fontWeight: 'bold',
            display: 'inline',
        },
        locationIcon: {
            marginLeft: 0,
            marginRight: 4,
            fontSize: 16,
        },
    }
));

type Props = {
    store: IStore & { distance: number }
}
const MetroStoreCard = (props: Props) => {
        const router = useRouter();
        const classes = useStyles();
        const store = props.store;
        const storeName = store.name;
        const distance = store.distance;
        const storeImage = (store.googleImages && store.googleImages.length !== 0) ? store.googleImages[0] : "/image-not-found.png"
        const rating = store.rating ? store.rating.toFixed(1) : "無評分";


        const descriptionTrimmer = (descriptionHTML: string) => {
            const DOMPurify = createDOMPurify()
            let html = DOMPurify.sanitize(descriptionHTML)
            let tmp = document.createElement("DIV");
            tmp.innerHTML = html;
            let description = tmp.textContent || tmp.innerText || "";
            if (description.length > 100) {
                return description.substring(0, 100) + "...";
            }
            return description;
        }

        return (
            <Card className={classes.card} id={store._id} key={store._id}>
                <CardActionArea onClick={() => router.push(`/stores/${store._id}`)}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={storeImage}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6">
                            {storeName}
                        </Typography>
                        <Grid
                            justify="space-between"
                            container
                        >
                            <Grid item>
                                <Box display={'flex'} color={'grey.500'} alignItems={'center'} mb={2}>
                                    <Rating name={'rating'} value={store.rating} size={'small'} precision={0.1} readOnly/>
                                    <Typography variant={'body2'} className={classes.rateValue}>
                                        {rating}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box display={'flex'} color={'grey.500'} alignItems={'center'} mb={2}>
                                    {distance &&
                                    <Typography variant={'body2'} className={classes.rateValue}>
                                        距離 {distance.toFixed(1)} 公里
                                    </Typography>
                                    }
                                </Box>
                            </Grid>
                        </Grid>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <Typography color={'textSecondary'} variant={'body2'}>
                                {descriptionTrimmer(store.descriptionHTML)}
                            </Typography>
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="medium" color="primary" className={classes.moreBtn}
                            onClick={() => router.push(`/stores/${store._id}`)}>
                        顯示更多
                    </Button>
                </CardActions>
            </Card>
        );
    }
;

export default MetroStoreCard;
