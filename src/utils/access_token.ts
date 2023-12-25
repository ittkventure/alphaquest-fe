export const getAccessToken = () => { 
    const accessToken = JSON.parse(localStorage.getItem('AQToken') || '{}')
    console.log(accessToken, 'accessToken');
    
    return accessToken?.access_token
}