import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ChildList from "./ChildList";

const childArray = [{text: 'first text', id: 2}, {text: 'second text', id: 3}]

export default function TodoCard(props) {
    return (
        <Card style={{width: '36rem'}} className='mt-3' id={props.id}>
            <Card.Text className='m-2'>
                <ListGroup className='list-group-flush'>
                    <ListGroup.Item>
                        <div className='d-flex'>
                            <div className='me-auto'>
                                Todo text
                            </div>
                            <div>
                                <Button className='btn-sm' variant='outline-primary'>Expand</Button>
                            </div>
                        </div>
                    </ListGroup.Item>
                </ListGroup>
                <hr className='text-primary'/>
                <ListGroup className='list-group-flush'>
                    <ListGroup.Item>Is Complete</ListGroup.Item>
                    { true &&
                        <>
                            <ListGroup.Item><a href={`#${props.parent.id}`}>{props.parent.text}</a></ListGroup.Item>
                            <ListGroup.Item>Created</ListGroup.Item>
                            <ListGroup.Item>Modified</ListGroup.Item>
                            <ChildList childArray={childArray} />
                        </>
                    }
                </ListGroup>
            </Card.Text>

        </Card>
    );
}