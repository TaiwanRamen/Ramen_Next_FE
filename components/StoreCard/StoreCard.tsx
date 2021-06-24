import cx from 'clsx';
import {makeStyles, Theme} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import LocationOn from '@material-ui/icons/LocationOn';
import Button from '@material-ui/core/Button';
import {IStore} from "../../types/IStore";
import Divider from '@material-ui/core/Divider';
import {useUser} from "../../context/UserContext";
import FollowBtn from "../FollowBtn/FollowBtn";
import * as React from "react";
import {useRouter} from "next/router";
import createDOMPurify from 'dompurify';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        overflow: 'initial',
        maxWidth: 500,
        maxHeight: '80vh',
        backgroundColor: 'transparent',
        "&:hover": {
            "& $cardMedia": {
                boxShadow: '0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)'
            },
            "& $content": {
                boxShadow: '0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px 2px rgba(0, 0, 0, 0.2)'
            }
        }
    },
    title: {
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
        maxHeight: 50,
        marginBottom: 0,

    },
    rateValue: {
        marginLeft: 8,
        fontWeight: 'bold',
        display: 'inline',
    },
    content: {
        position: 'relative',
        padding: 24,
        backgroundColor: '#ffffff',
        borderRadius: 4,
        height: 350,
        "&:hover": {
            backgroundColor: "#fcfcfc",
            cursor: "pointer",
        }
    },
    locationIcon: {
        marginLeft: 0,
        marginRight: 4,
        fontSize: 16,
    },
    cardMedia: {
        borderRadius: 4,
        width: '100%',
        height: 0,
        paddingBottom: '53%',
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
    },
    fadeShadow: {
        boxShadow: '0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)'
    },
    readMoreText: {
        fontSize: "1rem",
        color: theme.palette.text.secondary,
    },
    readMoreBtn: {
        position: 'absolute',
        bottom: 20,
        right: 40,
    },
    cardBody: {
        fontSize: "0.875rem",
        flex: "1 1 auto",
        padding: "1rem",
        overflow: "hidden",
        maxHeight: "10rem",
        textOverflow: "ellipsis",
        marginBottom: 10,
        whiteSpace: "normal",
        display: "-webkit-box",
        "-webkit-line-clamp": 6,
        "-webkit-box-orient": "vertical",
    },
    divider: {
        width: 230,
        margin: "15px 10px",
    }
}));

type Props = {
    store: IStore
}
const StoreCard = (props: Props) => {
    const store = props.store;
    const classes = useStyles();
    const {user} = useUser()!;
    const router = useRouter();
    const rating = store.rating ? store.rating.toFixed(1) : "無評分";
    // const storeImage = store.googleImages[0] || "./image-not-found.png"
    const storeImage = (store.googleImages && store.googleImages.length !== 0) ? store.googleImages[0] : "/image-not-found.png"


    const descriptionHTMLTrimmer = (descriptionHTML: string) => {
        const DOMPurify = createDOMPurify()
        let html = DOMPurify.sanitize(descriptionHTML)
        let tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        let description = tmp.textContent || tmp.innerText || "";
        if (description.length > 200) {
            return description.substring(0, 200) + "...";
        }
        return description;
    }

    return (
        <Box>
            <Card elevation={0} className={classes.root} id={store._id} key={store._id}>
                <CardMedia
                    className={classes.cardMedia}
                    image={storeImage}
                >
                    {user && <FollowBtn store={store}/>}
                </CardMedia>
                <CardContent className={cx(classes.fadeShadow, classes.content)} onClick={()=>router.push(`/stores/${store._id}`)}>

                    <h4 className={classes.title}>{store.name}</h4>

                    <Box display={'flex'} color={'grey.500'} alignItems={'center'} mb={1} mt={1}>
                        <Rating name={'rating'} value={store.rating} size={'small'} precision={0.1} readOnly/>
                        <Typography variant={'body2'} className={classes.rateValue}>
                            {rating}
                        </Typography>
                    </Box>

                    <Box color={'grey.500'} display={'flex'} alignItems={'center'}>
                        <LocationOn className={classes.locationIcon}/>
                        <span className={classes.locationIcon}>{store.city}</span>
                    </Box>


                    <div className={classes.cardBody}>
                        <Typography color={'textSecondary'} variant={'body2'}>
                            {descriptionHTMLTrimmer(store.descriptionHTML)}
                        </Typography>
                    </div>

                    <Divider className={classes.divider} orientation="horizontal"/>

                    <Box mt={2} display={'flex'} justifyContent={'space-between'} alignItems={'center'}
                         className={classes.readMoreBtn}>

                        <Button className={classes.readMoreText} size={'small'}
                                onClick={() => router.push(`/stores/${store._id}`)}>
                            顯示更多
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default StoreCard;