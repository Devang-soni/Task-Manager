import { useState } from "react";
import { useTodo } from "../contexts/TodoContext";
import "./TodoItems.css";

function TodoItems({ todo }) {
	const [isTodoItemEditable, setIsTodoItemEditable] = useState(false);
	const [todoMsg, setTodoMsg] = useState(todo.title);
	const [isComplete, setIsComplete] = useState(todo.completed);

	const { updateTodo, deleteTodo, toggleComplete } = useTodo();

	const handleUpdateTitle = (event) => {
		if (isTodoItemEditable == false) return;
		setTodoMsg(event.target.value);
	};

	const handleEditTodo = () => {
		if (todo.complete == true) return;

		if (isTodoItemEditable == true) {
			updateTodo(todo.id, todoMsg);
			setIsTodoItemEditable(false);
		} else setIsTodoItemEditable(true);
	};

	const handleToggleTodo = () => {
		toggleComplete(todo.id);
		setIsComplete((prev) => !prev);
	};

	const handleDeleteTodo = () => {
		deleteTodo(todo.id);
	};

	return (
		<>
			<div className="todo-item-container">
				<input
					type="checkbox"
					name="todo-item"
					checked={isComplete}
					onChange={handleToggleTodo}
				/>

				<input
					type="text"
					className={isComplete ? "complete" : "not-complete"}
					id={isTodoItemEditable ? "show-border" : null}
					value={todoMsg}
					readOnly={!isTodoItemEditable}
					onChange={handleUpdateTitle}
				/>

				<button
					type="button"
					className="modify-btn"
					onClick={handleEditTodo}
					disabled={isComplete}
				>
					{isTodoItemEditable ? "📂" : "✏️"}
				</button>

				<button
					type="button"
					className="delete-btn"
					onClick={handleDeleteTodo}
				>
					{"❌"}
				</button>
			</div>
		</>
	);
}

export default TodoItems;
