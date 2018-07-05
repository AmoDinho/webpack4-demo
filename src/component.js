

export default (text = "Hellow world") => {
    const element = document.createElement("div");

    element.className = "pure-button";
    element.innerHTML = text;

    

    return element;
};