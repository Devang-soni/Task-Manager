import { useState } from "react";
import { useTodo } from "../contexts/TodoContext";
import "./TodoForm.css";

function TodoForm() {
	const [title, setTitle] = useState("");
	const { addTodo } = useTodo();

	const handleChangeTitle = (event) => {
		setTitle(event.target.value);
	};
	
	const handleFormSubmit = (event) => {
		event.preventDefault();

		if (!title) return;

		addTodo(title);
		setTitle("");
	};

	return (
		<>
			<form className="todo-form" onSubmit={handleFormSubmit}>
				<input
					type="text"
					placeholder="write todo here..."
					name="todo"
					id="input-todo"
					className="input-title"
					value={title}
					onChange={handleChangeTitle}
				/>
				<button type="submit" className="add-btn">
					Add Task
				</button>
			</form>
		</>
	);
}

export default TodoForm;
