import React, { useEffect } from 'react';
import {Link} from "react-router-dom"

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/UserTypedSelector';

const UserList: React.FC = () => {
    const [page, setPage] = React.useState(0);
    const rowsPerPage = 10;

    interface Column {
        id: 'name' | 'surname' | 'dateOfBirthday' | 'phone' | 'email' | 'create/update';
        label: string;
        minWidth?: number;
        align?: 'right';
        format?: ((value: string) => string);
        }
    
    const columns: readonly Column[] = [
        { id: 'name', label: 'Name', minWidth: 120 },
        { id: 'surname', label: 'Surname', minWidth: 120 },
        {
            id: 'dateOfBirthday',
            label: 'Date of Birthday',
            minWidth: 120,
            align: 'right',
            format: (value: string) => value.split("-").reverse().join("."),
        },
        {
            id: 'phone',
            label: 'Phone',
            minWidth: 120,
            align: 'right',
        },
        {
            id: 'email',
            label: 'E-Mail',
            minWidth: 120,
            align: 'right',
        },
        {
            id: 'create/update',
            label: 'Create/Update',
            minWidth: 120,
            align: 'right',
        },
    ];

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };


    const {users, error, loading} = useTypedSelector(state => state.users);

    

    const {fetchUsersData, deleteUserData} = useActions();

    useEffect(() => {
        fetchUsersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if(loading) {
        return(
            <h1>Loading...</h1>
        )
    }

    if(error) {
        return(
            <h1>{error}</h1>
        )
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Button variant="contained" color = "info"><Link to="/createUser" style = {styles.buttons}>Add User</Link></Button>
            <TableContainer>
                <Table aria-label="table">
                <TableHead>
                    <TableRow style = {{backgroundColor: "gray"}}>
                    {columns.map((column) => (
                        <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    <TableCell key = "buttons" align = "center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users && users
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user) => {
                        return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                            {columns.map((column) => {
                            const value = user[column.id];
                            return (
                                <TableCell key={column.id} align={column.align}>
                                {(column.format)
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                                
                            );
                            
                            })}
                            <TableCell>
                                <ButtonGroup>
                                    <Button variant="contained" color = "info"><Link to = {`/createUser/${user.id}`} style={styles.buttons}>Edit</Link></Button>
                                    <Button variant="contained" color = "error" onClick = {() => deleteUserData(user.id)}>Delete</Button>
                                </ButtonGroup>
                            </TableCell>
                        </TableRow>
                        );
                    })}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
            />
        </Paper>
    )
}

const styles = {
    buttons: {
        textDecoration: "none",
    }
}

export default UserList;