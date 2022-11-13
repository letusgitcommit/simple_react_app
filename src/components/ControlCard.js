import Card from 'react-bootstrap/Card';
import InputBar from "./InputBar";

export default function ControlCard(props) {
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
                />
            </Card.Body>
        </Card>
    );
}
