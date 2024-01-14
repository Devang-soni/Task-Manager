import { useState, useEffect } from "react";
import { TodoProvider } from "./contexts/TodoContext";
import TodoForm from "./components/TodoForm";
import TodoItems from "./components/TodoItems";
import "./App.css";

function App() {
	const [todos, setTodos] = useState([]);
	const [isAll, setIsAll] = useState(true);
	const [isActive, setIsActive] = useState(false);
	const [isCompleted, setIsCompleted] = useState(false);

	useEffect(() => {
		const todoItems = JSON.parse(localStorage.getItem("todos"));

		if (todoItems && todoItems.length > 0) {
			setTodos([...todoItems]);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	const addTodo = (title) => {
		setTodos((prev) => [
			{ id: Date.now(), title, completed: false },
			...prev,
		]);
	};

	const updateTodo = (id, title) => {
		setTodos((prev) =>
			prev.map((prevTodo) =>
				prevTodo.id === id ? { ...prevTodo, title } : prevTodo
			)
		);
	};

	const deleteTodo = (id) => {
		setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
		localStorage.removeItem(id);
	};

	const toggleComplete = (id) => {
		setTodos((prev) =>
			prev.map((prevTodo) =>
				prevTodo.id === id
					? { ...prevTodo, completed: !prevTodo.completed }
					: prevTodo
			)
		);
	};

	const removeActiveClass = () => {
		const buttons = [
			...document.querySelectorAll(".buttons-container button"),
		];

		buttons.forEach((button) =>
			button.classList.contains("active")
				? button.classList.remove("active")
				: null
		);
	};

	const handleAll = (event) => {
		removeActiveClass();

		event.target.classList.add("active");

		setIsAll(true);
		setIsActive(false);
		setIsCompleted(false);
	};

	const handleActive = (event) => {
		removeActiveClass();

		event.target.classList.add("active");

		setIsActive(true);
		setIsAll(false);
		setIsCompleted(false);
	};

	const handleCompleted = (event) => {
		removeActiveClass();

		event.target.classList.add("active");

		setIsCompleted(true);
		setIsAll(false);
		setIsActive(false);
	};

	let todoData = [];
	if (isAll) {
		todoData = todos;
	} else if (isActive) {
		todoData = todos.filter((todo) => todo.completed == false);
	} else if (isCompleted) {
		todoData = todos.filter((todo) => todo.completed == true);
	}

	return (
		<TodoProvider
			value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
		>
			<section className="app-container">
				<div className="inner-app-container">
					<h1 className="todo-heading">Manage Your Tasks</h1>
					<div className="form-container">
						<TodoForm />
					</div>

					<div className="buttons-container">
						<button className="all-task active" onClick={handleAll}>
							All Tasks
						</button>
						<button className="active-task" onClick={handleActive}>
							Active Tasks
						</button>
						<button
							className="completed-task"
							onClick={handleCompleted}
						>
							Completed Tasks
						</button>
					</div>

					<div className="todo-container">
						{todoData.length == 0 ? (
							<p className="message-paragraph">
								👻 No Task Found!
							</p>
						) : (
							todoData.map((todo) => (
								<div key={todo.id}>
									<TodoItems todo={todo} />
								</div>
							))
						)}
					</div>
				</div>
			</section>
		</TodoProvider>
	);
}

export default App;
