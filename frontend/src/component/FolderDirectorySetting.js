import React from 'react';

export const FolderDirectorySetting = (props) => {
    const handleKeypress = e => {
        if (e.key === "Enter") {
            setDirectory();
        }
    };
    const setDirectory = _ => {
        const directory = document.getElementById("directory").value;
        if(!directory)
            return alert("Directory cannot be empty!");
        props.setDirectory(directory);
        closeForm();
        props.inputRef.current.click();
    };
    const closeForm = _ => {
        document.getElementById("setFolderDirectoryForm").style.display = "none";
    };
    return(
        <section id="setFolderDirectoryForm" className='form-popup center form-container create-form'>
            <div className='content-form'>
                <h2>Set Folder Directory</h2>
                <hr/>
                <div className='pop-up-input'>
                    <label>Folder Directory</label>
                    <input
                        id="directory"
                        type='text'
                        onKeyPress={handleKeypress}
                    />
                </div>
                <div className='pop-up-button'>
                    <button className='cancel-button' onClick={closeForm}>Cancel</button>
                    <button className='next-button' onClick={setDirectory}>Save</button>
                </div>
            </div>
        </section>
    );
};