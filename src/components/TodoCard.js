import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import {useState} from "react";
import {setCompleteStatus, deleteTodo} from "../utils/Api";


export default function TodoCard(props) {
    const [expanded, setExpanded] = useState(false)
    const ct = new Date(props.todo.created_timestamp)
    const mt = new Date(props.todo.modified_timestamp)

    return (
        <Card className='mb-3' id={props.todo.id}>
            <div className='m-2'>
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
                    <ListGroup.Item>Is Complete: {props.todo.complete? 'Yes': 'No'}</ListGroup.Item>
                    { expanded &&
                        <>
                            <ListGroup.Item>Created: {ct.getMonth()}/{ct.getDate()}/{ct.getFullYear()}</ListGroup.Item>
                            <ListGroup.Item>Modified: {mt.getMonth()}/{mt.getDate()}/{mt.getFullYear()}</ListGroup.Item>
                            <div className='d-flex'>
                                <Button onClick={() => {
                                    const res = setCompleteStatus(props.todo.id, !props.todo.complete);
                                    if (res) {
                                        props.mutateParentState();
                                    }
                                }}
                                        variant='primary'
                                        className='mt-3 me-auto'
                                >{props.todo.complete ? 'Mark Not Complete' : 'Mark Complete'}</Button>
                                <Button onClick={() => {
                                    const res = deleteTodo(props.todo.id);
                                    if (res) {
                                        props.mutateParentState();
                                    }
                                }}
                                        variant='danger'
                                        className='mt-3'
                                >Delete</Button>
                            </div>
                        </>
                    }
                </ListGroup>
            </div>

        </Card>
    );
}