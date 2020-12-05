
// Read me ../readme.md#Basic Basic basic Test 


module.exports = {
    'My first test case'(browser) {
        browser
        .url('http://steveycee.com/')
        .waitForElementVisible('.header-head')
        .assert.containsText('.header-head', '../steveycee/..');
    }
}