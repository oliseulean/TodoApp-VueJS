<template>
  <div class="container">
    <header class="header">
      <input
        type="text"
        class="box"
        placeholder="Add item/s"
        autofocus
        @keyup.enter="addItem"
        v-model="newItem"
      />
      <button class="newItem" @click="addItem">+</button>
    </header>
    <div class="items">
      <ul class="todo-list">
        <li
          v-for="(item, index) in itemsFiltered"
          :class="{ completed: item.completed }"
          :key="index"
        >
          <div class="view">
            <input
              type="checkbox"
              :checked="item.completed"
              @change="completeItem(item)"
            />
            <label>{{ item.name }}</label>
            <div class="delete" @click="removeItem(item)">X</div>
          </div>
        </li>
      </ul>
    </div>
    <footer class="footer" v-if="items.length > 0">
      <div class="filters">
        <li
          @click="
            changeFilter('all');
            makeActive(1);
          "
          :class="{ active: activeElement === 1 }"
        >
          All
        </li>
        <li
          @click="
            changeFilter('active');
            makeActive(2);
          "
          :class="{ active: activeElement === 2 }"
        >
          Active
        </li>
        <li
          @click="
            changeFilter('completed');
            makeActive(3);
          "
          :class="{ active: activeElement === 3 }"
        >
          Completed
        </li>
        <li @click="clearAll">
          Clear All
        </li>
        <li
          v-if="items.length > showClearCompletedButoon"
          @click="clearCompleted"
        >
          Clear completed
        </li>
      </div>
    </footer>
    <div class="nrOfItems" v-if="items.length > 0">
      <span>{{ this.itemsLeft }}</span>
      {{ showItemsLeft }}
    </div>
  </div>
</template>

<script src="./index.js" />
<style>
@import "./index.css";
</style>
