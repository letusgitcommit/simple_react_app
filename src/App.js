import ControlCard from "./components/ControlCard";
import TodoCard from "./components/TodoCard";
import {baseUrl, pingApi, getTodos, newTodo} from "./utils/Api";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {useEffect, useState} from "react";

function App() {
    const [searchText, setSearchText] = useState('');
    const [todos, setTodos] = useState([]);
    const [authStatus, setAuthStatus] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(true);
    const [showInvalidLogin, setShowInvalidLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newTodoText, setNewTodoText] = useState('');
    const [mutatedState, setMutatedState] = useState(false);

    const mutateState = () => setMutatedState(state => !state);

    const handleNewTodoSubmit = e => {
        e.preventDefault();
        const result = newTodo(newTodoText);
        if (!result) {
            console.log('did not work')
        }
        else {
            setNewTodoText('');
            mutateState()
        }
    }

    async function login(email, password) {
        const auth_string = window.btoa(`${email}:${password}`)
        const init_response = await fetch(baseUrl + 'api/v1/auth/login', {
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
        else if (init_response.status === 401) {
                setShowInvalidLogin(true);
            }
    }

    useEffect(() => {
        async function checkApi(){
            const response = await pingApi();
            if (response.status === 403) {
                setAuthStatus(false);
                setShowLoginModal(true);
            }
            else if (response.status === 401) {
                setShowInvalidLogin(true);
            }
            else if (response.status === 200) {
                setAuthStatus(true);
                setShowLoginModal(false);
                setShowInvalidLogin(false);
                const data = await getTodos()
                setTodos(data)
            }
        }
        checkApi();
    }, [])


    useEffect(() => {
        (async () => setTodos(await getTodos()))()
    }, [mutatedState])

    return (
        <Container fluid={true} className='d-flex justify-content-center my-3'>
            <Col sm={6}>
                <Modal show={showLoginModal}>
                    <Form onSubmit={e => {e.preventDefault(); login(email, password);}}>
                        <Modal.Header>
                            <Modal.Title>{showInvalidLogin ? 'Invalid Credentials' : 'Login'}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='text'
                                              value={email}
                                              onChange={e => setEmail(e.target.value)}
                                              required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type='password'
                                              value={password}
                                              onChange={e => setPassword(e.target.value)}
                                              required
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant={'outline-primary'} className='me-auto' type='submit'>Login</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
                {authStatus && Array.isArray(todos) &&
                    <>
                        <ControlCard
                            searchValue={searchText}
                            onSearchChange={e => setSearchText(e.target.value)}
                            newTodoValue={newTodoText}
                            onNewTodoChange={e => setNewTodoText(e.target.value)}
                            onNewTodoSubmit={handleNewTodoSubmit}
                        />
                        {todos
                            .filter(todo => {
                                return todo.text.startsWith(searchText)
                            })
                            .map(todo => {
                                return <TodoCard todo={todo} key={todo.id} mutateParentState={mutateState}/>
                            })}
                    </>
                }
            </Col>
        </Container>
    );
}

export default App;
