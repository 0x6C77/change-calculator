var CoinProcessor = function () {
    var self = this,
        _regex = /^£?(\d+)(?:\.(\d*))?p?$/i;

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
};


// Create coin processing object
var processor = new CoinProcessor();


// Cache input element
var $input = $('.main-container input');

$input.on('keypress', function (e) {
    if (e.keyCode === 13) {
        var value = this.value;
        var amount = processor.convert(value);
    }
});