import {makeStyles, Theme} from "@material-ui/core/styles";
import TreeItem, {TreeItemProps} from "@material-ui/lab/TreeItem";
import {SvgIconProps} from "@material-ui/core/SvgIcon";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import {ElementType} from "react";
import Button from "@material-ui/core/Button";

const useTreeItemStyles = makeStyles((theme: Theme) => ({
        root: {
            margin: 5,
            color: theme.palette.text.secondary,
            '&:hover > $content': {
                backgroundColor: theme.palette.action.hover,
            },
            '&:focus > $content, &$selected > $content ': {
                backgroundColor: `#e8f0fe`,
                color: '#1a73e8',
            },
            '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
                backgroundColor: 'transparent',
            },
        },
        content: {
            padding: 3,
            margin: "1px 0",
            color: theme.palette.text.secondary,
            borderTopRightRadius: theme.spacing(2),
            borderBottomRightRadius: theme.spacing(2),
            paddingRight: theme.spacing(1),
            fontWeight: theme.typography.fontWeightMedium,
            '$expanded > &': {
                fontWeight: theme.typography.fontWeightRegular,
            },
        },
        group: {
            marginLeft: 0,
            '& $content': {
                paddingLeft: theme.spacing(2),
            },
        },
        expanded: {},
        selected: {},
        label: {
            fontWeight: 'inherit',
            color: 'inherit',
            "&:hover": {
                color: '#1a73e8',
                textDecoration: "none",
            }
        },
        labelRoot: {
            margin: "5px ",
            display: 'flex',
            alignItems: 'center',
            color: theme.palette.text.secondary,
            fontSize: '0.9rem',
            padding: theme.spacing(0.5, 0),
            "&:hover": {
                color: '#1a73e8',
                textDecoration: "none",
            }
        },
        labelIcon: {
            width: "24px",
            height: "24px",
            marginRight: theme.spacing(2),
        },
        labelText: {
            fontWeight: 500,
            flexGrow: 1,
        },
    }),
);

type StyledTreeItemProps = TreeItemProps & {
    labelIcon?: ElementType<SvgIconProps> | string;
    labelIconFA?: IconProp;
    labelIconSVG?: string;
    labelInfo?: string | number | null;
    labelText: string;
    avatar?: string;
    href: string;
};

function StyledTreeItem(props: StyledTreeItemProps) {
    const classes = useTreeItemStyles();
    const {labelIconSVG, labelIconFA, labelText, labelIcon: LabelIcon, labelInfo, href, ...other} = props;

    return (
        <TreeItem
            label={
                <Button className={classes.labelRoot} href={href}>
                    <>
                        {LabelIcon && <LabelIcon color="inherit" className={classes.labelIcon}/>}
                        {labelIconFA && <FontAwesomeIcon icon={labelIconFA} color="inherit" className={classes.labelIcon}/>}
                        {labelIconSVG && <img className={classes.labelIcon} src={labelIconSVG} alt="alt"/>}
                        <Typography className={classes.labelText} component={"span"}>
                            {labelText}
                        </Typography>
                        {!!labelInfo && labelInfo !== 0 && <Chip
                            variant="outlined"
                            size="small"
                            clickable
                            label={labelInfo}
                            color="secondary"
                        />}
                    </>
                </Button>
            }
            classes={{
                root: classes.root,
                content: classes.content,
                expanded: classes.expanded,
                selected: classes.selected,
                group: classes.group,
                label: classes.label,
            }}
            {...other}
        />
    );
}

export default StyledTreeItem;