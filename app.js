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
        addItem: function (name, calories) {

            calories = parseInt(calories);
            newItem = new Item(data.items.length, name, calories);
            data.items.push(newItem);
            console.log(data.items);

            return newItem;
        }
    }
})();


// UI Controller 
const UICtrl = (function () {
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories'
    }
    return {

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
                                    <i class="tiny material-icons blue-text">border_color</i>
                                    </a>`;
            itemList.appendChild(listItem);
        },
        clearInputFields: function () {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        hideList: function () {
            document.querySelector(UISelectors.itemList).style.display = 'none';
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
    }

    const itemAddSubmit = function (event) {
        console.log('add');
        //get form input from UICtrl

        const input = UICtrl.getItemInput();
        if (input.name !== '' && input.calories !== '') {
            const newItem = ItemCtrl.addItem(input.name, input.calories);
            UICtrl.addListItem(newItem);

            UICtrl.clearInputFields();
        }
        event.preventDefault();
    }
    return {
        init: function () {

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