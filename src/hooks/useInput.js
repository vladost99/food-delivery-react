import {useState} from 'react';

export default (initialValue = '') => {
    const [value, setValue] = useState(initialValue);

    const handleValue = (e) => setValue(e.target.value)

    const setInitValue = (val) => setValue(val)


    return {
        value,
        handleValue,
        setInitValue
    }

}