import ListGroup from "react-bootstrap/ListGroup";

export default function ChildList(props) {
    return (
        props.childArray.map(item => {
            return <ListGroup.Item key={item.id}><a href={`#${item.id}`}>{item.text}</a></ListGroup.Item>
        })
    );
}

