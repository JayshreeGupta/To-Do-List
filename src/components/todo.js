import React, { useState, useEffect } from 'react'
import "./style.css";

//get the localstorage data back
const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");

    if(lists){
        return JSON.parse(lists); //list in form of string but we want in array so we can store it into getlocalData.
    } else{
        return [];
    }
};

const Todo = () => {
    const [inputdata, setInputData] = useState(" ");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem , setIsEditItem]= useState(" ");
    const [toggleButton ,setToggleButton]=useState(false);
   
     //add the items functions
    const addItem = () => {
        if (!inputdata) {
            alert('plz fill the data');
        }else if(inputdata && toggleButton){
         setItems(
            items.map((curElem) =>{     //to get new item after edited
             if(curElem.id === isEditItem){
                return{...curElem,name: inputdata};
             }
             return curElem;
            })
         );
        setInputData(""); 
        setIsEditItem("");
        setToggleButton(false); 

        } else {
            const myNewInputData = {  //unique id created to show id of the data it works on key:value pair.
                id: new Date().getTime().toString(),
                name: inputdata,
            };
            setItems([... items,myNewInputData]);
            setInputData("");
        }
    };
    //edit items
     const editItem = (index) =>{
        const item_todo_edited = items.find((curElem) =>{
               return curElem.id === index;
        })

        setInputData(item_todo_edited.name); //after edited that name should come fot editition.
        setIsEditItem(index);
        setToggleButton(true); //to set edit or plus button while editing

     };
   //how to delete item section
     const deleteItem = (index) => {
        const updatedItems = items.filter((curElem) =>{
            return curElem.id !==index;
        });
        setItems(updatedItems);
     };
 //remove all element at once
  const removeAll = () => {
    setItems([]);
  };
  //adding localStorage
    useEffect(() =>{
     localStorage.setItem("mytodolist",JSON.stringify(items));   //localstorage work on key value pair &only we can pass string.
    }, [items]);



  return (
    <>
      <div className="main-div">
        <div className="child-div">
            <figure>
                <img src="./images/logo.png" alt="todologo" />
                <figcaption>Add Your Daily List Here..✌</figcaption>
            </figure>
            <div className="addItems">
                    <input 
                    type="text"
                    placeholder="✍️ Add Item"
                       className="form-control"
                        value={inputdata}
                        onChange={(event) => setInputData(event.target.value)}
                    />
                    {toggleButton ? ( <i className="far fa-edit add-btn" onClick={addItem}></i>) :( <i className="fa fa-plus add-btn" onClick={addItem}></i>)}
                   {/* <i className="fa fa-plus add-btn" onClick={addItem}></i> */}
                   </div>
                   {/* show our item */}
                  <div className="showItems">
                    {items.map((curElem) => {
                        return (
                            <div className="eachItem" key={curElem.id}>
                            <h3>{curElem.name}</h3>
                            <div className="todo-btn">
                            <i className="far fa-edit add-btn"
                              onClick={() =>editItem(curElem.id) }></i>
                            <i className="far fa-trash-alt add-btn" onClick = {()=> deleteItem(curElem.id)}></i>
                            </div>
                          </div>
                        )
                    })}
                    
                 </div>
                          
                   {/* remove all button */}
           <div className="showItems"><button className ="btn effect04" data-sm-link-text="Remove All"
           onClick={removeAll}> 
           <span>CHECK LIST</span>
            </button>
            </div>
        </div>
      </div>
    </>
  )
}

export default Todo;
