import ControlCard from "./components/ControlBar";
import TodoCard from "./components/TodoCard";

const todos = [
    {
        text: "First todo text",
        id: 0,
        childArray: [
            {
                text: "Second todo text",
                id: 1
            },
            {
                text: "Third todo text",
                id: 2
            }
        ]
    },
    {
        text: "Second todo text",
        id: 1,
        parent: {
            text: "First todo text",
            id: 0
        }
    },
    {
        text: "Third todo text",
        id: 2,
        parent: {
            text: "First todo text",
            id: 0
        },
        childArray: [
            {
                text: "Fourth todo text",
                id: 3
            }
        ]
    },
    {
        text: "Fourth todo text",
        id: 3
    },
]


function App() {
    return (
        <div className={'d-flex justify-content-center'}>
            <div className={'flex-column mt-3'}>
                <ControlCard />
                {todos.map(todo => {
                    return <TodoCard todo={todo}/>
                })}
            </div>
        </div>
    );
}

export default App;
