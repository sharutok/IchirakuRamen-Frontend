import React from 'react'
import LoadingButton from '@mui/lab/LoadingButton';
import '../CSS/InValidAcessMessage.scss'
function InValidAcessMessage() {
    const [loading, setLoading] = React.useState(false);
    function handleClick() {
        setLoading(true);
        setTimeout(() => {
            window.location.href = "/login"
        }, 1500)
    }
    return (
        <div className='access-denied' >
            <h1
            >Access Denied!!!Please Login</h1>
            <LoadingButton
                className='loading-button'
                onClick={handleClick}
                loading={loading}
                variant="outlined">
                Login page link
            </LoadingButton>
        </div>
    )
}

export default InValidAcessMessage