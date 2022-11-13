import ListGroup from "react-bootstrap/ListGroup";

export default function ChildList(props) {
    return (
        props.childArray.map(item => {
            return <ListGroup.Item key={item.id}>{item.text}</ListGroup.Item>
        })
    );
}

