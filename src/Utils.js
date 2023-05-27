const Utilities = (() => {
    const getElement = (query) => document.querySelector(query);

    const toggleElement = (query) => {
        getElement(query).classList.toggle('hide');
    };

    const hideElement = (query) => {
        getElement(query).classList.add('hide');
    };

    const showElement = (query) => {
        getElement(query).classList.remove('hide');
    };

    return {
        getElement,
        toggleElement,
        hideElement,
        showElement,
    };
})();

export default Utilities;
