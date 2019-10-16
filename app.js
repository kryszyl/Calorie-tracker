// Storage Controller

// Item Controller
const ItemCtrl = (function () {
    // Item constructor

    const Item = function (id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    const data = {
        items: [

        ],
        currentItem: null,
        totalCalories: 0
    }

    return {
        logData: function () {
            return data;
        },
        getData: function () {
            return data.items;

        },
        getTotalCalories: function () {
            let totalCalories = 0;
            data.items.forEach(item => totalCalories += parseInt(item.calories));
            data.totalCalories = totalCalories;
            return data.totalCalories;
        },
        addItem: function (name, calories) {

            calories = parseInt(calories);
            newItem = new Item(data.items.length, name, calories);
            data.items.push(newItem);
            console.log(data.items);

            return newItem;
        },
        getItemById: function (id) {

            return data.items.find(item => item.id === id);
        },
        updateItem: function (name, calories) {
            calories = parseInt(calories);

            const itemToUpdate = data.items.find(item => item.id === data.currentItem.id);
            itemToUpdate.name = name;
            itemToUpdate.calories = calories;
            return itemToUpdate;
        },
        clearAllItems: function () {
          data.items = [];  
        },
        removeItem: function () {
            data.items.splice(data.items.findIndex(item => item.id === data.currentItem.id), 1);
            console.log(data.items);

            return data.items;
        },
        setCurrentItem: function (item) {
            console.log(data.currentItem);

            data.currentItem = item;
        },
        getCurrentItem: function () {
            return data.currentItem;
        }
    }
})();


// UI Controller 
const UICtrl = (function () {
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.remove-btn',
        backBtn: '.back-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories',
        listItems: '#item-list li',
        clearBtn: '.clear-btn'


    }
    return {

        setTotalCalories: function (totalCalories) {
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories.toString();
        },
        populateItemList: function (items) {
            let html = '';
            const itemList = document.querySelector(UISelectors.itemList);
            items.forEach(item => {
                html += `<li class="collection-item" id="item-${item.id}"><strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="tiny material-icons blue-text">border_color</i>
                </a>
                </li>`
            });
            itemList.innerHTML = html;

        },
        getItemInput: function () {

            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            };
        },
        addListItem: function (item) {
            document.querySelector(UISelectors.itemList).style.display = 'block';
            const itemList = document.querySelector(UISelectors.itemList);

            const listItem = document.createElement('li');
            listItem.className = "collection-item";
            listItem.id = `item-${item.id}`;
            listItem.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                                    <a href="#" class="secondary-content">
                                    <i class="edit-item tiny material-icons blue-text">border_color</i>
                                    </a>`;
            itemList.appendChild(listItem);
        },
        updateListItem: function (item) {
            let listItems = document.querySelectorAll(UISelectors.listItems);

            listItems = Array.from(listItems);

            listItems.forEach(listItem => {
                const itemID = listItem.getAttribute('id');

                if (itemID === `item-${item.id}`) {
                    document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                    <i class="edit-item tiny material-icons blue-text">border_color</i>
                    </a>`;
                }
            })
        },
        deleteListItem: function (id) {
            const itemID = `#item-${id}`;

            const item = document.querySelector(itemID);

            item.remove();
        },
        deleteAllListItems: function () {
            const listItems = document.querySelectorAll(UISelectors.listItems);
            listItems.forEach(item => item.remove());
        },
        clearInputFields: function () {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        addItemToForm: function () {
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
        },
        hideList: function () {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        showEditState: function () {
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },
        clearEditState: function () {
            UICtrl.clearInputFields();
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';

        },
        getSelectors: function () {
            return UISelectors;
        }



    }

})();
// App Controller
const App = (function (ItemCtrl, UICtrl) {
    const loadEventListeners = function () {
        const UISelectors = UICtrl.getSelectors();

        //Add Item event

        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
        //Disable Enter button
        document.addEventListener('keypress', (e) => {
            if (e.keyCode === 13 || e.which === 13) {
                e.preventDefault();
                return false;
            }
        });

        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);
        document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);
        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
    }

    const itemAddSubmit = function (event) {
        console.log('add');
        //get form input from UICtrl

        const input = UICtrl.getItemInput();
        if (input.name !== '' && input.calories !== '') {
            const newItem = ItemCtrl.addItem(input.name, input.calories);


            UICtrl.addListItem(newItem);
            // UICtrl.getTotalCalories(ItemCtrl.data.totalCalories);
            const totalCalories = ItemCtrl.getTotalCalories(newItem.calories);
            console.log(totalCalories);
            UICtrl.setTotalCalories(totalCalories);

            UICtrl.clearInputFields();
        }
        event.preventDefault();
    }

    const itemEditClick = function (event) {
        if (event.target.classList.contains('edit-item')) {
            const listId = event.target.parentNode.parentNode.id;
            const listIdArr = listId.split('-');
            const id = parseInt(listIdArr[1]);

            const itemToEdit = ItemCtrl.getItemById(id);
            console.log(itemToEdit);

            ItemCtrl.setCurrentItem(itemToEdit)

            UICtrl.showEditState();

            UICtrl.addItemToForm();


        }

        event.preventDefault();
    }

    const itemUpdateSubmit = function (event) {
        console.log('update');
        const input = UICtrl.getItemInput();
        if (input.name !== '' && input.calories !== '') {
            const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

            UICtrl.updateListItem(updatedItem);
            const totalCalories = ItemCtrl.getTotalCalories();
            console.log(totalCalories);
            UICtrl.setTotalCalories(totalCalories);

            UICtrl.clearInputFields();
            UICtrl.clearEditState();
        }
        event.preventDefault();
    }

    const itemDeleteSubmit = function (e) {
        const currentItem = ItemCtrl.getCurrentItem();
        ItemCtrl.removeItem();
        UICtrl.deleteListItem(currentItem.id)

        const totalCalories = ItemCtrl.getTotalCalories();
        UICtrl.setTotalCalories(totalCalories);
        UICtrl.clearInputFields();
        UICtrl.clearEditState();
        e.preventDefault();
    }

    const clearAllItemsClick = function (e) {
        ItemCtrl.clearAllItems();
        UICtrl.deleteAllListItems();

        UICtrl.clearInputFields();
        UICtrl.clearEditState();
        UICtrl.hideList();
        e.preventDefault();
    }

    return {
        init: function () {
            UICtrl.clearEditState();
            const items = ItemCtrl.getData();

            if (items.length === 0) {
                UICtrl.hideList();

            } else {
                UICtrl.populateItemList(items);
            }



            loadEventListeners();
        }
    }

})(ItemCtrl, UICtrl);

App.init();