const helper = {
    formatDate : (date) => {
        // Check if date is a valid Date object
        if (date instanceof Date && !isNaN(date)) {
            // Format the date to 'YYYY-MM-DD'
            return date.toISOString().split('T')[0];
        } else {
            return 'Invalid Date';
        }
    },
    incrementIndex : (data) => {
        return data + 1;
    }
}

module.exports = helper;