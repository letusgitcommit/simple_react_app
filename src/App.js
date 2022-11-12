import ControlCard from "./components/ControlBar";
import TodoCard from "./components/TodoCard";

const func = () => {
    const arr = []
    for (let i = 0; i < 9; i++) {
        arr.push(<TodoCard id={i} parent={{text: "Parent", id: 0}}/>)
    }
    return arr
}

function App() {
    return (
        <div className={'d-flex justify-content-center'}>
            <div className={'flex-column mt-3'}>
                <ControlCard />
                {func()}
            </div>
        </div>
    );
}

export default App;
