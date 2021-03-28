import { shallowMount } from "@vue/test-utils";
import Todo from "@/components/Todo/Todo";

const findById = (id, list) => list.find(item => item.id === id);
const removeTodo = (list, todoId) => {
  const todoIndex = list.findIndex(item => item.id === todoId);
  return [...list.slice(0, todoIndex), ...list.slice(todoIndex + 1)];
};

// jest.mock("uuid/v4");

describe("Todo component", () => {
  test("Todo is a component", () => {
    const wrapper = shallowMount(Todo);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test("Render html correctly", () => {
    const wrapper = shallowMount(Todo);
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("Add button appears", () => {
    const addButton = ".newItem";
    const wrapper = shallowMount(Todo);
    expect(wrapper.contains(addButton)).toBe(true);
  });
});

describe("Adding TodoItems", () => {
  const wrapper = shallowMount(Todo);

  async function addTodo(todoText) {
    const inputButton = ".box";
    const addButton = ".newItem";
    wrapper.find(inputButton).setValue(todoText);
    await wrapper.find(addButton).trigger("click");
  }

  test("allows for adding one todo item", async () => {
    await addTodo("Test");
    const elements = ".todo-list";
    expect(wrapper.find(elements).text()).toContain("Test");
  });
  test("empties the input field when todo has been added", async () => {
    const inputButton = ".box";
    await addTodo("This is not important");
    const findInputButton = wrapper.find(inputButton);
    expect(findInputButton.element.value).toEqual("");
  });

  describe("delete a todo", () => {
    test("should have todo removed", async () => {
      const deleteItem = jest.spyOn(Todo.methods, "removeItem");
      const items = [
        { id: 1, description: "go to the gym", isComplete: false }
      ];
      const wrapper = shallowMount(Todo, items);
      await wrapper.find(".delete").trigger("click");
      expect(deleteItem).toHaveBeenCalledTimes(1);
    });
    test("removeTodo by id should not mutate", () => {
      const startTodos = [
        { id: 1, description: "go to the gym", isComplete: false },
        { id: 2, description: "get food", isComplete: false },
        { id: 3, description: "clean the room", isComplete: false }
      ];

      const expected = [
        { id: 1, description: "go to the gym", isComplete: false },
        { id: 3, description: "clean the room", isComplete: false }
      ];

      const result = removeTodo(startTodos, 2);

      expect(result).not.toBe(expected);
    });
  });

  test("findById should return the expected item from array", () => {
    const startTodos = [
      { id: 1, description: "go to the gym", isComplete: false },
      { id: 2, description: "get food", isComplete: false },
      { id: 3, description: "clean the room", isComplete: false }
    ];

    const expected = { id: 2, description: "get food", isComplete: false };

    const result = findById(2, startTodos);

    expect(result).toEqual(expected);
  });
});
