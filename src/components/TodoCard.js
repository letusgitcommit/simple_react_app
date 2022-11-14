import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ChildList from "./ChildList";
import {useState} from "react";


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
                        </>
                    }
                </ListGroup>
            </div>

        </Card>
    );
}