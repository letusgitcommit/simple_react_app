import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

export default function InputBar(props) {
    return (
        <Form className='mb-3' onSubmit={e => e.preventDefault()}>
            <Form.Group>
                <Form.Label className='text-secondary'>{props.ph}</Form.Label>
                <InputGroup>
                    <Form.Control
                        type={props.type || 'text'}
                        placeholder={props.ph || ''}
                        value={props.value}
                        onChange={props.onChange}
                        name={props.name}
                    />
                    { props.buttonText &&
                        <Button variant='outline-success' type='submit'>
                            {props.buttonText || 'Enter'}
                        </Button>
                    }
                </InputGroup>
            </Form.Group>
        </Form>
    );
}