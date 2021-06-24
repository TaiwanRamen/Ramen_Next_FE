import {
    Box,
    List,
    ListItem, ListItemText,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        borderRadius: 10,
        background: "#F6F6F6",
    },
    title: {flex: '1 1 100%',},
    text: {
        color: "red"
    },
    tr: {
        height: 10,
    },
    th: {
        color: theme.palette.text.secondary,
        padding: 0,
        height: 10
    },
    list: {
        padding: 0
    },
    listItem: {
        padding: 2,
        textAlign: "center",
        flexDirection: "row-reverse",
        fontSize: "0.75rem",
        color: theme.palette.text.secondary,

    }
}));

type Period = {
    open: string,
    close: string
}

type Props = {
    openPeriod: [{
        period: Period[]
    }]
}
const OpeningHours = (props: Props) => {
        const classes = useStyles();
        const openPeriod = props.openPeriod
        let days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

        function createData(day: string, period: Period[]) {
            return {day, period};
        }

        function checkTime(periodText: string) {
            if (periodText === '00:00 - 00:00') return '休息'
            else if (periodText === '00:00 - 23:59') return '24小時營業'
            else return periodText
        }

        const rows = []
        for (let i = 0; i < openPeriod.length; i++) {
            rows.push(createData(days[i], openPeriod[i].period))
        }
        return (
            <Box mt={2}>
                <Typography color={'textSecondary'} variant={'body2'}>
                    營業時間：
                </Typography>
                <Box mt={1}>
                    <TableContainer className={classes.container}>
                        <Table aria-label="simple table">
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.name} className={classes.tr}>
                                        <TableCell component="th" scope="row" align="center" className={classes.th}>
                                            {row.day}
                                        </TableCell>
                                        <TableCell component="th" scope="row" className={classes.th}>
                                            <List dense className={classes.list}>
                                                {
                                                    row.period.map((period) => (
                                                        <ListItem className={classes.listItem}>
                                                            <ListItemText>
                                                                <span>
                                                                    {checkTime(`${period.open} - ${period.close}`)}
                                                                </span>
                                                            </ListItemText>

                                                        </ListItem>
                                                    ))
                                                }
                                            </List>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        );
    }
;

export default OpeningHours;
