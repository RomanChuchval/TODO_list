import React, {ChangeEvent, memo, useState} from 'react';

type EditableSpanPropsType = {
    OldTitle: string
    callBack: (newTaskTitle: string) => void
}

export const EditableSpan = memo((props: EditableSpanPropsType) => {
    console.log('edit span')

    const [editMode, setEditMode] = useState(false)
    let [newTitle, setNewTitle] = useState(props.OldTitle)

    const onEditModeHandler = () => {
        setEditMode(!editMode)
        props.callBack(newTitle)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return (
            editMode
            ? <input
                    onChange={onChangeHandler}
                    onBlur={onEditModeHandler}
                     value={newTitle}
                     autoFocus/>
            : <span onDoubleClick={onEditModeHandler}>{props.OldTitle}</span>
    );
});
