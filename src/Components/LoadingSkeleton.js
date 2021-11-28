import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import '../Components/LoadingSkeleton'
export default function LoadingSkeleton() {
    return (
        <Stack className="skeleton-container" spacing={1} style={{ margin: "0.5rem", padding: "0.1rem" }}>
            <Skeleton variant="text" style={{ padding: "2rem", marginLeft: "5rem" }} />
            <Stack width={1000} style={{ padding: "0.5rem" }}  >
                {[...Array(6).keys()].map(i => {
                    return (<>
                        <Skeleton variant="text" style={{ padding: "0.8rem", marginLeft: "5rem" }} />
                    </>)
                })}

            </Stack>
        </Stack>
    );
}