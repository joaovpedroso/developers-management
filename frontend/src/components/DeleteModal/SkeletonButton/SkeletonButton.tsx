import { Skeleton } from "@mui/material";

const SkeletonButton = () => (
  <Skeleton
    variant="rectangular"
    width={100}
    height={35}
    data-testid="confirm-button-skeleton"
  />
);

export { SkeletonButton };
