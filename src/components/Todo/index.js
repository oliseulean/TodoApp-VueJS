import createUID from "create-unique-id";

export default {
  name: "App",
  data() {
    return {
      items: [],
      newItem: "",
      itemsLeft: null,
      filter: "all",
      activeElement: 1
    };
  },
  created() {
    this.items = JSON.parse(localStorage.getItem("list") || "[]");
    this.itemsLeft = this.itemsFiltered.length;
  },
  computed: {
    itemsFiltered() {
      if (this.filter === "all") {
        return this.items;
      } else if (this.filter === "active") {
        return this.items.filter(item => !item.completed);
      } else if (this.filter === "completed") {
        return this.items.filter(item => item.completed);
      }
    },
    showClearCompletedButoon() {
      const getItems = this.items.filter(item => !item.completed);
      const itemsLength = getItems.length;
      return itemsLength;
    },
    showItemsLeft() {
      return this.itemsLeft === 0 || this.itemsLeft === 1
        ? `item left`
        : `items left`;
    }
  },
  methods: {
    addItem() {
      if (this.newItem.trim() != "") {
        this.items.unshift({
          id: createUID(10),
          completed: false,
          name: this.newItem
        });
        this.newItem = "";
        localStorage.setItem("list", JSON.stringify(this.items));
        this.itemsLeft = this.itemsFiltered.length;
      }
    },
    removeItem(item) {
      const itemIndex = this.items.indexOf(item);
      this.items.splice(itemIndex, 1);
      localStorage.setItem("list", JSON.stringify(this.items));
      this.itemsLeft = this.itemsFiltered.length;
    },
    getList() {
      const listString = localStorage.getItem("list");
      if (!listString) {
        return [];
      }
      return JSON.parse(listString);
    },
    completeItem(item) {
      item.completed = !item.completed;
      localStorage.setItem("list", JSON.stringify(this.items));
    },
    clearCompleted() {
      let list = this.getList();
      let listOfActiveItems = list.filter(key => {
        return !key.completed;
      });
      localStorage.setItem("list", JSON.stringify(listOfActiveItems));
      this.items = listOfActiveItems;
      this.itemsLeft = this.itemsFiltered.length;
    },
    changeFilter(filter) {
      this.filter = filter;
      this.itemsLeft = this.itemsFiltered.length;
    },
    clearAll() {
      this.items = [];
      this.itemsLeft = this.itemsFiltered.length;
      localStorage.setItem("list", JSON.stringify(this.items));
    },
    makeActive(element) {
      this.activeElement = element;
    }
  }
};
