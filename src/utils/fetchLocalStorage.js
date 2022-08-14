export const fetchUser = (name) => {
    const userInfo = localStorage.getItem(name) !== 'undefined' ?
    JSON.parse(localStorage.getItem(name))
    : null

    return userInfo
}


export const fetchCart = (name) => {
    const cartInfo = localStorage.getItem(name) !== 'undefined' ?
    JSON.parse(localStorage.getItem(name))
    : []

    return cartInfo || []
}