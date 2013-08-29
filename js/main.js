var CoinProcessor = function () {
    var _regex = /^£?(\d+)(?:\.(\d*))?p?$/i;

    // Validate user input is valid string
    this.parse = function (value) {
        var amount,
            parts = value.match(_regex);
        
        // String doesn't match regex
        if (parts === null) {
            return false;
        }

        return true;
    };
};


// Create coin processing object
var processor = new CoinProcessor();


// Cache input element
var $input = $('.main-container input');

$input.on('keypress', function (e) {
    if (e.keyCode === 13) {
        var value = this.value;
        var amount = processor.parse(value);
    }
});