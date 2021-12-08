const parseISOString = (string) => {
    // the regex matches any character that isn't a digit and matches it unlimited times 
    var splitString = string.split(/\D+/);
    return new Date(Date.UTC(splitString[0],splitString[1],splitString[2],splitString[3], splitString[4], splitString[5], splitString[6]));
}

// An ISO string has letters and punctuation in it; example: 2021-12-08T11:53:32+0000
// The regex above will remove anything that is not a digit, meaning the letters and punctuation.
// splitString will look like this: ['2021-12-08T11:53:32+0000']
// As splitString is an array, we can assign each index to Date.UTC. 
// Date.UTC's arguments are as follows (year, month, day, time in hours, time in minutes, time in seconds)
// A fully formatted time is returned!

export default parseISOString;