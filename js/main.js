var CoinProcessor = function () {
    var self = this,
        _regex = /^£?(\d+)(?:\.(\d*))?p?$/i;
        _coins = [{value: 200, text: '£2'}, {value: 100, text: '£1'}, {value: 50, text: '50p'},
                  {value: 20, text: '20p'}, {value: 10, text: '10p'}, {value: 5, text: '5p'},
                  {value: 2, text: '2p'}, {value: 1, text: '1p'}],
        $output = $('.main-container .change-output')[0],
        $error = $('.main-container .error')[0];

    // Takes users input, validates and calculates correct change
    this.process = function(value) {
        var amount = self.convert(value);
        if (amount !== false) {
            var coins = self.calculateChange(amount);
            self.display(coins);
        }
    };

    // Validate user input is valid string, returns false for invalid string
    this.parse = function(value) {
        return value.match(_regex);
    };

    // Convert a given string into its corresponding value in pennies
    this.convert = function (value) {
        var amount,
            parts = self.parse(value);
        
        // Invalid input
        if (parts === null) {
            self.error('Invalid amount entered');
            return false;
        }

        // If only the number before the decimal is present assume it is pence,
        // unless otherwise stated
        if (typeof parts[2] == "undefined" && value.charAt(0) !== '£') {
            amount = parseFloat(parts[1], 10);
        } else {
            // Rebuild and parse parts into valid float
            amount = parseFloat(parts[1] + '.' + parts[2], 10);
            
            // Round amount to correct precisison
            amount = amount.toFixed(2);
            // Covert amount into pennies
            amount = amount * 100;
        }

        return amount;
    };

    // Take an integer and return an array of the smallest denomination of coins
    this.calculateChange = function (amount) {
        var change = [],
            i,
            n = _coins.length,
            coin,
            quantitiy;

        for (i = 0; i < n; i += 1) {
            coin = _coins[i];
            if (coin.value > amount) {
                continue;
            }

            quantitiy = Math.floor(amount / coin.value);
            change.push({coin: coin.text, quantitiy: quantitiy});

            amount -= coin.value * quantitiy;
        }

        return change;
    };

    // Display error on screen
    self.error = function (error) {
        if ($error == null)
            return;

        if (typeof error == 'string') {
            $error.innerHTML = error;
            $error.style.opacity = 1;
        } else {
            $error.style.opacity = 0;
        }
    };

    // Take array of coins and display in $output
    this.display = function (coins) {
        var i,
            n = coins.length,
            element;

        // Hide error message
        self.error();

        // Clear previous output
        $output.innerHTML = '';
        for (i = 0; i < n; i += 1) {
            element = document.createElement("li");
            element.innerHTML = coins[i].coin + ' x' + coins[i].quantitiy;
            $output.appendChild(element);
        }
    };
};


// Create coin processing object
var processor = new CoinProcessor();


// Cache input element
var $input = $('.main-container input');

$input.on('keypress', function (e) {
    if (e.keyCode === 13) {
        var value = this.value;
        processor.process(value);
    }
});