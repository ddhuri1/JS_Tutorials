const list = document.querySelector('ul');
const input = document.querySelector('input');
const button = document.querySelector('button');

button.onclick = function() 
{
    let myItem = input.value;
    if(myItem != '')//Add only if there is something in the text field
    {
        const listItem = document.createElement('li');
        const listText = document.createElement('span');
        const listBtn = document.createElement('button');

        listItem.appendChild(listText);
        listText.textContent = myItem;
        listItem.appendChild(listBtn);
        listBtn.textContent = 'Delete';
        list.appendChild(listItem);

        listBtn.onclick = function(e) 
        {
            list.removeChild(listItem);
        }
        input.value = ''; //Refresh the input value in text box to store next value
    }
}