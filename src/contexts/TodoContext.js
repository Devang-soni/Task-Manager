import { createContext, useContext } from "react";

const TodoContext = createContext({
	todos: [
		{
			id: 1,
			title: "",
			completed: false,
		},
	],
	addTodo(title) {},
	updateTodo(id, title) {},
	deleteTodo(id) {},
	toggleComplete(id) {},
});

export const useTodo = () => {
	return useContext(TodoContext);
};

export const TodoProvider = TodoContext.Provider;
