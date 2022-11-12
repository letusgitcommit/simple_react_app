import Card from 'react-bootstrap/Card';
import InputBar from "./InputBar";

export default function ControlCard(props) {
    return (
        <Card style={{width: '36rem'}}>
            <Card.Body>
                <Card.Title><strong className='text-primary'>Todo App</strong></Card.Title>
                <InputBar
                    ph='Search Bar'
                    buttonText='Search'
                    name='search'
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
