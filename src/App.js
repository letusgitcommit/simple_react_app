import ControlCard from "./components/ControlCard";
import TodoCard from "./components/TodoCard";
import {useState} from "react";

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
    const [searchText, setSearchText] = useState('')

    const handleSearchTextOnChange = e => {
        setSearchText(e.target.value);
    }

    return (
        <div className={'d-flex justify-content-center'}>
            <div className={'flex-column mt-3'}>
                <ControlCard searchValue={searchText} onChange={handleSearchTextOnChange}/>
                {todos
                    .filter(todo => {
                        return todo.text.startsWith(searchText)
                    })
                    .map(todo => {
                    return <TodoCard todo={todo} key={todo.id}/>
                })}
            </div>
        </div>
    );
}

export default App;
