const Utilities = (() => {
    const toggleElement = (element) => {
        element.classList.toggle('hide');
    };

    const hideElement = (element) => {
        element.classList.add('hide');
    };

    const showElement = (element) => {
        element.classList.remove('hide');
    };

    return {
        toggleElement,
        hideElement,
        showElement,
    };
})();

export default Utilities;
