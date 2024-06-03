import { Grid, Skeleton } from "@mui/material";

const CustomSkeleton = ({
  width,
  height,
}: {
  width: string;
  height: string;
}) => (
  <Skeleton
    variant="rectangular"
    sx={{ bgcolor: "grey.900" }}
    width={width}
    height={height}
  />
);

const SkeletonTableRow = () => {
  return (
    <Grid
      sx={{
        margin: "2px 0 2px 0",
      }}
    >
      <CustomSkeleton width="100%" height="70px" />
    </Grid>
  );
};

const SkeletonPagination = () => (
  <Grid
    sx={{
      marginTop: "4px",
    }}
  >
    <CustomSkeleton width="100%" height="50px" />
  </Grid>
);

const SkeletonTable = () => {
  return (
    <Grid width="100%" marginTop="24px">
      <CustomSkeleton width="100%" height="50px" />
      <SkeletonTableRow />
      <SkeletonTableRow />
      <SkeletonTableRow />
      <SkeletonTableRow />
      <SkeletonTableRow />
      <SkeletonTableRow />
      <SkeletonPagination />
    </Grid>
  );
};

export { SkeletonTable };
