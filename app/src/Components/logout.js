const LogOut = () => (
    localStorage.removeItem('userId'),
    localStorage.removeItem('login'),
    localStorage.removeItem('token'),
    
    window.location.href = "/"
)

export default LogOut;