import { Alert, Skeleton, Stack } from "@mui/material"

export const ErrorMsg = () => {
    return <Alert sx={{ my: 3 }} severity="error">Data can not be fetched</Alert>
}

export const NoDataMsg = () => {
    return <Alert sx={{ my: 3 }} severity="warning">There is no data to show.</Alert>
}

export const CardSkeleton = ({ children }) => {
    return (
        <Stack justifyContent="center" alignItems={"center"} my={3}>
            <Skeleton variant="rectangular" height={60}>
                {children}
            </Skeleton>
        </Stack>
    )
}

const TableSkeleton = () => {
    return (
        <Stack spacing={1}>
            <Skeleton variant="rectangular" width="100%" height={60} />
            <Skeleton variant="rectangular" width="100%" height={40} />
            <Skeleton variant="rectangular" width="100%" height={40} />
            <Skeleton variant="rectangular" width="100%" height={40} />
        </Stack>
    )
}

export default TableSkeleton