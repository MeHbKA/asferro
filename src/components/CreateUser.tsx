import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import {useParams, Link, useNavigate} from "react-router-dom"
import { useUserActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/UserTypedSelector';

const CreateUser : React.FC = () => {
    let {userId} = useParams();

    let navigate = useNavigate();

    const { fetchUserData, createUser, editUserData } = useUserActions();
    let {user, error} = useTypedSelector(state => state.user);

    const [state, setState] = useState({
        name: '',
        surname: '',
        dateOfBirthday: '',
        email: '',
        phone: '',
    })

    const [errors, setErrors] = useState({
        nameErr: '',
        surnameErr: '',
        emailErr: '',
        phoneErr: '',
        birthErr: '',
    })

    useEffect(() => {
        if (userId){ 
            fetchUserData(userId);
        } else {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            user = {
                name: '',
                surname: '',
                dateOfBirthday: '',
                email: '',
                phone: '',
            }
        }
    }, []);
    
    useEffect(() => {
        if (user) {
            setState({...user})
        }
    }, [user])

    

    const {name, surname, dateOfBirthday, email, phone} = state;

    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let {name , value} = e.target;
        setState({...state, [name] : value})
    }

    const validate = () => {
        if (name !== "undefined") {
            if(name.length < 3 || name.length > 60) {
                setErrors(prevState => 
                    ({...errors,
                        ...prevState,
                        nameErr:"Please enter correct Name(min 3 symbols, max 60 symbols)."
                        
                    })
                    );
            } else {
                setErrors(prevState => 
                    ({...errors,
                        ...prevState,
                        nameErr:""
                        
                    })
                );
            }
        }
        if ( typeof surname !== "undefined") {
            if(surname.length < 3 || surname.length > 60) {
                setErrors(prevState => 
                    ({...errors,
                        ...prevState, 
                        surnameErr:"Please enter correct Surname(min 3 symbols, max 60 symbols)."
                    })
                );
            } else {
                setErrors(prevState => 
                    ({...errors,
                        ...prevState,
                        surnameErr:""
                        
                    })
                );
            }
        }
        if (new Date(dateOfBirthday).toString() !== "Invalid Date"){
            setErrors(prevState => 
                ({...errors,
                    ...prevState,
                    birthErr:""
                    
                })
            );
        } else {
            setErrors(prevState => 
                ({...errors,
                    ...prevState,
                    birthErr:"Please enter Date Of Birthday"
                    
                })
            );
        }
        if (typeof email !== undefined){
            let patternMail = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            if (!patternMail.test(email)) {
                setErrors(prevState => 
                    ({...errors,
                        ...prevState, 
                        emailErr:"Please enter correct E-Mail."
                    })
                );
            } else {
                setErrors(prevState => 
                    ({...errors,
                        ...prevState,
                        emailErr:""
                        
                    })
                );
            }
        }
        if (typeof phone !== "undefined") {
            
            let patternPhone = new RegExp(/^0?([0])(\d{9})+$/);
            if (!patternPhone.test(phone)) {
                setErrors(prevState => 
                    ({...errors,
                        ...prevState, 
                        phoneErr:"Please enter correct phone(Start with 0, 10 symbols)"
                    })
                );
            } else {
                setErrors(prevState => 
                    ({...errors,
                        ...prevState,
                        phoneErr:""
                        
                    })
                );
            }
        }
    }
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if(userId){
            if (!errors.nameErr && !errors.surnameErr && !errors.emailErr && !errors.phoneErr){
                
                editUserData(userId, user);
                navigate('/')
            }
        } else {
            if (!errors.nameErr && !errors.surnameErr && !errors.emailErr && !errors.phoneErr){
                
                createUser(state);
                navigate('/')
            }
        }
        
        
    }

    

    if (error) {
        return(
            <h1>{error}</h1>
        )
    }

    return (
        <>
            <Button variant="contained" color = "info"><Link to="/" style={styles.buttons}>Home</Link></Button>
            { user &&
            <form noValidate autoComplete="off" onSubmit = {(e) => handleSubmit(e)}>
                <TextField
                    fullWidth
                    style = {styles.inputs}
                    id = "name"
                    required = {true}
                    margin="dense"
                    label = "Name"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value = { name || ""} 
                    name = "name"
                    onChange={handleChange}
                    error ={!!errors.nameErr}
                    helperText={errors.nameErr}               
                 />
                 <TextField
                    fullWidth
                    style = {styles.inputs}
                    id = "surname"
                    required = {true}
                    margin="dense"
                    label = "Surname"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value = { surname || ""} 
                    name = "surname"
                    onChange={handleChange}
                    error ={!!errors.surnameErr}
                    helperText={errors.surnameErr}               
                 />
                 <TextField
                    fullWidth
                    style = {styles.inputs}
                    type="date"
                    required = {true}
                    id = "dateOfBirthday"
                    margin="dense"
                    label = "Date Of Birthday"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value = { dateOfBirthday || ""} 
                    name = "dateOfBirthday"
                    onChange={handleChange} 
                    error ={!!errors.birthErr}
                    helperText={errors.birthErr}             
                 />
                 <TextField
                    fullWidth
                    style = {styles.inputs}
                    id = "email"
                    required = {true}
                    margin="dense"
                    label = "E-Mail"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value = { email || ""} 
                    name = "email"
                    onChange={handleChange}
                    error ={!!errors.emailErr}
                    helperText={errors.emailErr}               
                 />
                 <TextField
                    fullWidth
                    required = {true}
                    style = {styles.inputs}
                    id = "phone"
                    margin="dense"
                    label = "Phone"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value = { phone || ""} 
                    name = "phone"
                    onChange={handleChange}
                    error ={!!errors.phoneErr}
                    helperText={errors.phoneErr}                                
                 />
                <Button onClick = {validate} type = "submit">Submit</Button>
            </form>
            }
        </>
    )
}


const styles = {
    inputs: {
        display: "block",
        maxWidth: 300,
    },
    buttons: {
        textDecoration: "none",
    },
}

export default CreateUser;
