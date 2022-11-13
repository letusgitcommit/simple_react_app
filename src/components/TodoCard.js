import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ChildList from "./ChildList";
import {useState} from "react";

export default function TodoCard(props) {
    const [expanded, setExpanded] = useState(false)
    return (
        <Card style={{width: '36rem'}} className='mt-3' id={props.todo.id}>
            <Card.Text className='m-2'>
                <ListGroup className='list-group-flush'>
                    <ListGroup.Item>
                        <div className='d-flex'>
                            <div className='me-auto'>
                                {props.todo.text}
                            </div>
                            <div>
                                <Button
                                    className='btn-sm'
                                    variant='outline-primary'
                                    onClick={() => setExpanded(state => !state)}
                                >
                                    { expanded ? 'Close' : 'Expand'}
                                </Button>
                            </div>
                        </div>
                    </ListGroup.Item>
                </ListGroup>
                <hr className='text-primary'/>
                <ListGroup className='list-group-flush'>
                    <ListGroup.Item>Is Complete</ListGroup.Item>
                    { expanded &&
                        <>
                            <ListGroup.Item>Created</ListGroup.Item>
                            <ListGroup.Item>Modified</ListGroup.Item>
                        </>
                    }
                </ListGroup>
                {props.todo.parent && expanded &&
                    <>
                        <hr className='text-primary' />
                        <ListGroup className='list-group-flush'>
                            <ListGroup.Item>Parent</ListGroup.Item>
                            <ListGroup.Item>{props.todo.parent.text}</ListGroup.Item>
                        </ListGroup>
                    </>
                }
                { props.todo.childArray && expanded &&
                    <>
                        <hr className='text-primary' />
                        <ListGroup className='list-group-flush'>
                            <ListGroup.Item>Subtasks</ListGroup.Item>
                            <ChildList childArray={props.todo.childArray} />
                        </ListGroup>
                    </>
                }
            </Card.Text>

        </Card>
    );
}