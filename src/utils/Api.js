import authFetch from "./AuthFetch";

export const baseUrl = 'https://www.professionalcodingservices.com/'
// export const baseUrl = 'http://127.0.0.1:8000/'

export const pingApi = async () => {
    const res = await authFetch(baseUrl + 'todos/api/v1/')
    return res
}

export const getTodos = async () => {
    const res = await authFetch(baseUrl + 'todos/api/v1/')
    return await res.json()
}

export const newTodo = async (text) => {
    const res = await authFetch(baseUrl + 'todos/api/v1/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: text
        })
    });
    return res.status === 201;
}

export const setCompleteStatus = async (id, status) => {
    const res = await authFetch(baseUrl + `todos/api/v1/${id}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            complete: status
        })
    });
    return res.status === 200;
}

export const deleteTodo = async id => {
    const res = await authFetch(baseUrl + `todos/api/v1/${id}/`, {
        method: 'DELETE',
    });
    return res.status === 204;
}