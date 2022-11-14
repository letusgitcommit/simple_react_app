import Card from 'react-bootstrap/Card';
import InputBar from "./InputBar";
import authFetch from "../utils/AuthFetch";
import {useState} from "react";

export default function ControlCard(props) {
    const [newTodoText, setNewTodoText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await authFetch('')
    }

    return (
        <Card className='mb-3'>
            <Card.Body>
                <Card.Title><strong className='text-primary'>Todo App</strong></Card.Title>
                <InputBar
                    ph='Search Bar'
                    value={props.searchValue}
                    onChange={props.onChange}
                />
                <InputBar
                    ph='New Todo'
                    buttonText='New Todo'
                    name='todo-text'
                    value={newTodoText}
                    onChange={e => setNewTodoText(e.target.value)}
                    onSubmit={handleSubmit}
                />
            </Card.Body>
        </Card>
    );
}
