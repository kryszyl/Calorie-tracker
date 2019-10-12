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
            { id: 0, name: 'Steak Dinner', calories: 1200 },
            { id: 1, name: 'Coookie', calories: 400 },
            { id: 2, name: 'Eggs', calories: 300 }
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

        }
    }
})();


// UI Controller 
const UICtrl = (function () {
    const UISelectors = {
        itemList: '#item-list'
    }
    return {
        
        populateItmeList: function (items) {
            let html = '';
            const itemList = document.querySelector(UICtrl.itemList);
            items.forEach(item => {
                html += `<li class="collection-item" id="item-${item.id}"><strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="tiny material-icons blue-text">border_color</i>
                </a>
                </li>`
            });
            itemList.innerHTML = html;

        }


    }

})();
// App Controller
const App = (function (ItemCtrl, UICtrl) {

    return {
        init: function () {
            const items = ItemCtrl.getData();
            ItemCtrl.addDataItem('Sausage', 300);
            console.log('Initializing App...');

        }
    }

})(ItemCtrl, UICtrl);

App.init();