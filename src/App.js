import ControlCard from "./components/ControlCard";
import TodoCard from "./components/TodoCard";
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {useEffect, useState} from "react";

async function authFetch(url, init_obj={headers: {}}) {
    init_obj.headers = {...init_obj.headers, ...{'Authorization': `Token ${window.sessionStorage.getItem('token') || null}`}}
    return await fetch(url, init_obj)
}

function App() {
    const [searchText, setSearchText] = useState('');
    const [todos, setTodos] = useState([]);
    const [authStatus, setAuthStatus] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function login(email, password) {
        const auth_string = window.btoa(`${email}:${password}`)
        const init_response = await fetch('http://127.0.0.1:8000/api/v1/auth/login', {
            method: 'POST',
            mode: 'cors',
            headers : {
                'Authorization': `Basic ${auth_string}`
            }
        })
        const res = await init_response.json()
        if (Object.keys(res).includes('token')){
            setAuthStatus(true);
            setShowLoginModal(false);
            window.sessionStorage.setItem('token', res.token)
        }
    }

    useEffect(() => {
        async function checkApi(){
            const response = await authFetch('http://127.0.0.1:8000/todos/api/v1/');
            if (response.status === 403) {
                setAuthStatus(false);
                setShowLoginModal(true);
            }
            else {
                setAuthStatus(true);
                setShowLoginModal(false);
                const data = await response.json()
                setTodos(data)
            }
        }
        checkApi();
    }, [])

    const handleSearchTextOnChange = e => {
        setSearchText(e.target.value);
    }

    return (
        <Container fluid={true} className='d-flex justify-content-center my-3'>
            <Col sm={6}>
                <Button onClick={(e) => authFetch()} variant='primary' className='mb-3'>Request</Button>
                <Modal show={showLoginModal}>
                    <Form onSubmit={e => {e.preventDefault(); login(email, password);}}>
                        <Modal.Header>
                            <Modal.Title>Login</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='text' value={email} onChange={e => setEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type='password' value={password} onChange={e => setPassword(e.target.value)} />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant={'outline-primary'} className='me-auto' type='submit'>Login</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
                {authStatus &&
                    <>
                        <ControlCard searchValue={searchText} onChange={handleSearchTextOnChange}/>
                        {todos
                            .filter(todo => {
                                return todo.text.startsWith(searchText)
                            })
                            .map(todo => {
                                return <TodoCard todo={todo} key={todo.id}/>
                            })}
                    </>
                }
            </Col>
        </Container>
    );
}

export default App;
