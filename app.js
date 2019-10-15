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
        getTotalCalories: function (calories) {
            data.totalCalories += parseInt(calories); 
            console.log(data.totalCalories);
            
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
        totalCalories: '.total-calories'


    }
    return {
        
        setTotalCalories: function (totalCalories) {
            console.log(document.querySelector(UISelectors.totalCalories).textContent);
            
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
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);
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