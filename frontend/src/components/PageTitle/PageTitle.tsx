import { Grid, Typography } from "@mui/material";
import { IPageTitle } from "./PageTitle.types";

const PageTitle = ({ title, subtitle = "", icon }: IPageTitle) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container gap={"12px"} alignItems="center">
          {icon && icon}
          <Typography variant="h4">{title}</Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography>{subtitle}</Typography>
      </Grid>
    </Grid>
  );
};

export { PageTitle };
