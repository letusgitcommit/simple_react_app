export default async function authFetch(url, init_obj={headers: {}}) {
    init_obj.headers = {...init_obj.headers, ...{'Authorization': `Token ${window.sessionStorage.getItem('token') || null}`}}
    return await fetch(url, init_obj)
}
