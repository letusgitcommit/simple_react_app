import ControlCard from "./components/ControlCard";
import TodoCard from "./components/TodoCard";
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import {useState} from "react";

const todos = [
    {
        text: "First todo text",
        id: 0,
        childArray: [
            {
                text: "Second todo text",
                id: 1
            },
            {
                text: "Third todo text",
                id: 2
            }
        ]
    },
    {
        text: "Second todo text",
        id: 1,
        parent: {
            text: "First todo text",
            id: 0
        }
    },
    {
        text: "Third todo text",
        id: 2,
        parent: {
            text: "First todo text",
            id: 0
        },
        childArray: [
            {
                text: "Fourth todo text",
                id: 3
            }
        ]
    },
    {
        text: "Fourth todo text",
        id: 3
    },
]


function App() {
    const [searchText, setSearchText] = useState('')

    const handleSearchTextOnChange = e => {
        setSearchText(e.target.value);
    }

    return (
        <Container fluid={true} className='d-flex justify-content-center my-3'>
            <Col sm={6}>
                <ControlCard searchValue={searchText} onChange={handleSearchTextOnChange}/>
                {todos
                    .filter(todo => {
                        return todo.text.startsWith(searchText)
                    })
                    .map(todo => {
                    return <TodoCard todo={todo} key={todo.id}/>
                })}
            </Col>
        </Container>
    );
}

export default App;
