import React from "react";

function CreateRoomForm(props) {
    
    return (
        <div className="flex flex-col justify-center items-center">
            <form className="flex flex-col justify-center items-center">
                <label className="text-white text-xl">Room Name</label>
                <input className="border-2 border-indigo-500 rounded-xl p-2 m-2" type="text" name="name" onChange={props.handleChange} value={props.name} />
                <label className="text-white text-xl">Room Description</label>
                <input className="border-2 border-indigo-500 rounded-xl p-2 m-2" type="text" name="description" onChange={props.handleChange} value={props.description} />
                <label className="text-white text-xl">Room Password</label>
                <input className="border-2 border-indigo-500 rounded-xl p-2 m-2" type="password" name="password" onChange={props.handleChange} value={props.password} />
                <label className="text-white text-xl">Room Password Confirmation</label>
                <input className="border-2 border-indigo-500 rounded-xl p-2 m-2" type="password" name="passwordConfirmation" onChange={props.handleChange} value={props.passwordConfirmation} />
                <button className="border-2 border-indigo-500 rounded-xl p-2 m-2" onClick={props.handleSubmit}>Create Room</button>
            </form>
        </div>
    );

}

export default CreateRoomForm;