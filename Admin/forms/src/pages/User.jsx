
import React, { useState, useEffect } from 'react';
import './Table.css';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Dropdown, DropdownButton, Button } from 'react-bootstrap';
import { RiDeleteBinLine } from "react-icons/ri";
import Pagination from 'react-bootstrap/Pagination';

const User = () => {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/auth/users');
                const data = await response.json();
                setUsers(data.reverse()); // Show newest users first
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:5001/api/auth/users/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (response.ok) {
                setUsers(users.filter(user => user._id !== id));
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleSelect = (userId) => {
        setSelectedUsers((prev) =>
            prev.includes(userId)
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    };
    const handleBulkDelete = async () => {
        if (selectedUsers.length === 0) return alert('Please select at least one user to delete.');

        try {
            await Promise.all(
                selectedUsers.map(userId =>
                    fetch(`http://localhost:5001/api/auth/users/${userId}`, {
                        method: 'DELETE',
                    })
                )
            );
            setUsers(users.filter(user => !selectedUsers.includes(user._id)));
            setSelectedUsers([]);
        } catch (error) {
            console.error('Error deleting users:', error);
        }
    };

    const handleExport = (type) => {
        const exportDataSource = selectedUsers.length > 0
            ? users.filter(user => selectedUsers.includes(user._id))
            : filteredUsers;

        const exportData = exportDataSource.map(({ username, email }) => ({
            Username: username,
            Email: email,
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

        const excelBuffer = XLSX.write(workbook, { bookType: type, type: "array" });
        const data = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(data, `users_export.${type}`);
    };


    // 🔍 Filtered users list
    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 🔢 Pagination logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    return (
        <div>
            <h2>User List</h2>
            <div className='d-flex justify-content-between align-items-center mb-3'>
                <input
                    type="text"
                    placeholder="Search by username or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ marginBottom: '10px', padding: '5px', width: '300px' }}
                />
                <div className='d-flex align-items-center gap-2'>
                    {selectedUsers.length > 0 && (
                        <Button variant="danger" size="sm" onClick={handleBulkDelete}>
                            Delete Selected Users
                        </Button>
                    )}
                    <DropdownButton id="dropdown-export" title="Export" variant="outline-primary">
                        <Dropdown.Item onClick={() => handleExport('csv')}>Export as CSV</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleExport('xlsx')}>Export as Excel</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>

            {/* 🧾 User Table */}
            <div className='tablediv'>
                <table>
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox" onChange={(e) => { setSelectedUsers(e.target.checked ? users.map(user => user._id) : []); }}
                                    checked={selectedUsers.length === users.length && users.length > 0}
                                />
                            </th>
                            <th className='tablewidth'>Username</th>
                            <th className='tablewidth'>Email</th>
                            <th className='tablewidth'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((user) => (
                            <tr key={user._id}>
                                <td>
                                    <input type="checkbox" checked={selectedUsers.includes(user._id)} onChange={() => handleSelect(user._id)} />
                                </td>
                                <td className='tablewidth'>{user.username}</td>
                                <td className='tablewidth'>{user.email}</td>
                                <td className='tablewidth'>
                                    <Button variant="danger" onClick={() => handleDelete(user._id)}><RiDeleteBinLine /></Button>
                                </td>
                            </tr>
                        ))}
                        {currentUsers.length === 0 && (
                            <tr>
                                <td colSpan="4">No users found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="d-flex justify-content-between align-items-center mt-3">
                    <Pagination>
                        <Pagination.First
                            onClick={() => handlePageChange(1)}
                            disabled={currentPage === 1}
                        />
                        <Pagination.Prev
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        />

                        {/* Dynamically show pages with ellipsis */}
                        {currentPage > 2 && (
                            <>
                                <Pagination.Item onClick={() => handlePageChange(1)}>
                                    1
                                </Pagination.Item>
                                <Pagination.Ellipsis />
                            </>
                        )}

                        {[...Array(totalPages)].map((_, index) => {
                            const pageNumber = index + 1;
                            if (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1) {
                                return (
                                    <Pagination.Item
                                        key={pageNumber}
                                        active={currentPage === pageNumber}
                                        onClick={() => handlePageChange(pageNumber)}
                                    >
                                        {pageNumber}
                                    </Pagination.Item>
                                );
                            }
                            return null;
                        })}

                        {currentPage < totalPages - 1 && (
                            <>
                                <Pagination.Ellipsis />
                                <Pagination.Item onClick={() => handlePageChange(totalPages)}>
                                    {totalPages}
                                </Pagination.Item>
                            </>
                        )}

                        <Pagination.Next
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        />
                    </Pagination>

                    <div className="text-end pe-2" style={{ fontSize: "14px" }}>
                        {`Showing ${indexOfFirstUser + 1} to ${Math.min(
                            indexOfLastUser,
                            filteredUsers.length
                        )} of ${filteredUsers.length} (${totalPages} Pages)`}
                    </div>
                </div>


            </div>
        </div>
    );
};

export default User;
