import React from 'react'
import LoadingButton from '@mui/lab/LoadingButton';
function InValidAcessMessage() {
    const [loading, setLoading] = React.useState(false);
    function handleClick() {
        setLoading(true);
        setTimeout(() => {
            window.location.href = "/login"
        }, 1500)
    }
    return (
        <div style={{ textAlign: "center" }}>
            <h1 >Access Denied!!!Please Login</h1>
            <LoadingButton
                onClick={handleClick}
                loading={loading}
                variant="outlined"

            >
                Login Page
            </LoadingButton>
        </div>
    )
}

export default InValidAcessMessage