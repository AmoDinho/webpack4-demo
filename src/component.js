export default (text = "Hellow world") =>{
    const element = document.createElement("div");

    element.innerHTML = text;

    return element;
};