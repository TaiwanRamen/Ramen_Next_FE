import {Box} from "@material-ui/core";

const MainLayout = ({children}) => {
    return (
        <Box mt={15}>
            {children}
        </Box>
    );
};

export default MainLayout;

