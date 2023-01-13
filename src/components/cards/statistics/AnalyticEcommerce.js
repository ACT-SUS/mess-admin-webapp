

// material-ui
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// assets
import { RiseOutlined, FallOutlined } from '@ant-design/icons';


// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const AnalyticEcommerce = ({ color, title, count, percentage, isLoss, extra }) => (
    <Box
        sx={{
        backgroundColor: '#F2E4DF',
        padding: "1rem",
        borderRadius: "10px",
        }}
    >
        <Stack spacing={0.5}>
            <Typography variant="h6" >
                {title}
            </Typography>
            <Grid container alignItems="center">
                <Grid item>
                    <Typography variant="h5" color="inherit">
                        {count}
                    </Typography>
                </Grid>
            </Grid>
        </Stack>
    </Box>
);

export default AnalyticEcommerce;
