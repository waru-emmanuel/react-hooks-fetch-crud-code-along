import React, { useEffect,useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then((items) => setItems(items)); // state is updated by passing an array of items to setItems
  }, []);

      // add this function!
      //Since the ShoppingList component is a parent component to the ItemForm component, we'll need to pass a callback function as a prop so that the ItemForm component can send the new item up to the ShoppingList
  function handleAddItem(newItem) {
    setItems([...items, newItem]);
  }

  // add this callback function
  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      } else {
        return item;
      }
    });
    setItems(updatedItems);
  }

   // add this callback function
   function handleDeleteItem(deletedItem) {
    const updatedItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(updatedItems);
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} /> {/*we can use this prop in the ItemForm to send the new item up to the ShoppingList when we receive a response from the server*/}
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} 
                onUpdateItem={handleUpdateItem} 
                onDeleteItem={handleDeleteItem} 
            />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
