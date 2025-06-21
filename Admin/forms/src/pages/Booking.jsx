
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { Button, Modal } from 'react-bootstrap';
import './Table.css';
import { FaEye } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import Pagination from 'react-bootstrap/Pagination';

const Booking = () => {
    const [bookings, setBookings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [selectedBookings, setSelectedBookings] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedBookingDetails, setSelectedBookingDetails] = useState(null);
    const [selectAll, setSelectAll] = useState(false);
    const [usersMap, setUsersMap] = useState({}); // userId -> user object

    useEffect(() => {
        axios.get('http://localhost:5001/api/auth/users')
            .then(res => {
                // Create map: userId -> user object
                const map = {};
                res.data.forEach(user => {
                    map[user._id] = user;
                });
                setUsersMap(map);
            })
            .catch(err => {
                console.error('Error fetching users:', err);
            });
    }, []);

    useEffect(() => {
        // Fetch bookings
        axios
            .get(`http://localhost:5001/api/bookings?page=${currentPage}&limit=10&search=${search}`)
            .then((res) => {
                setBookings(res.data.bookings);
                setTotalPages(res.data.totalPages);
            })
            .catch((err) => console.error('Error fetching bookings:', err));
    }, [currentPage, search]);

    // Function to fetch bus name based on busId
    const getBusName = (busId) => {
        console.log('Fetching bus details for Bus ID:', busId);  // Debugging log
        return axios
            .get(`http://localhost:5001/api/bus/${busId}`)
            .then((res) => {
                console.log('Bus Details Response:', res.data);  // Log the API response for debugging
                if (res.data && res.data.busName) {
                    return res.data.busName; // Return the bus name
                } else {
                    return 'Bus name not found'; // Fallback if bus name is not found
                }
            })
            .catch((err) => {
                console.error('Error fetching bus details:', err);
                return 'Bus name not found';  // Fallback error message
            });
    };

    const handleExport = (type) => {
        const exportDataSource = selectedBookings.length > 0
            ? bookings.filter(b => selectedBookings.includes(b._id))
            : bookings;

        const exportData = exportDataSource.map(booking => ({
            UserName: usersMap[booking.user]?.username || 'Unknown User',
            Seats: booking.selectedSeats.join(', '),
            Passengers: booking.passengers.map(p => p.name).join(', '),
            Email: booking.email,
            Phone: booking.phone,
            Total: `Rs:${booking.totalAmount}`,
            BookedAt: new Date(booking.createdAt || booking.bookedAt).toLocaleString(),
        }));

        if (type === "csv") {
            const csv = Papa.unparse(exportData);
            const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
            saveAs(blob, "bookings_export.csv");
        } else if (type === "xlsx") {
            const ws = XLSX.utils.json_to_sheet(exportData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Bookings");

            const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
            const blob = new Blob([excelBuffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });

            saveAs(blob, "bookings_export.xlsx");
        }
    };

    const handleCheckboxChange = (e, bookingId) => {
        if (e.target.checked) {
            setSelectedBookings([...selectedBookings, bookingId]);
        } else {
            setSelectedBookings(selectedBookings.filter(id => id !== bookingId));
        }
    };

    const handleSelectAllChange = (e) => {
        if (e.target.checked) {
            setSelectedBookings(bookings.map(booking => booking._id));
        } else {
            setSelectedBookings([]);
        }
        setSelectAll(e.target.checked);
    };

    const handleViewBooking = (booking) => {
        // Fetch the bus name before showing the modal
        console.log('Viewing booking:', booking);  // Log the booking for debugging
        getBusName(booking.busId).then(busName => {
            setSelectedBookingDetails({
                ...booking,
                busName: busName, // Add bus name to booking details
            });
            setShowModal(true);
        });
    };
    const handleDeleteBooking = (bookingId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this booking?");
        if (!confirmDelete) return;

        axios
            .delete(`http://localhost:5001/api/bookings/${bookingId}`)
            .then(() => {
                setBookings(bookings.filter((booking) => booking._id !== bookingId));
                alert('Booking deleted successfully!');
            })
            .catch((err) => console.error('Error deleting booking:', err));
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className='container mt-4'>
            <h4 className='mb-3'>All Bookings</h4>
            <div className='d-flex justify-content-between mb-3'>
                <input type='text' className='form-control w-25 mb-3' placeholder='Search by Passenger Name' value={search} onChange={(e) => setSearch(e.target.value)} />
                <div className='d-flex gap-2'>
                    <div className='mb-3'>
                        <Button className='btn btn-success me-2' onClick={() => handleExport('xlsx')}>
                            Export to Excel
                        </Button>
                        <Button className='btn btn-info ml-2' onClick={() => handleExport('csv')}>
                            Export to CSV
                        </Button>
                    </div>
                </div>
            </div>

            <div className='tablediv'>
                <table>
                    <thead className=''>
                        <tr>
                            <th>
                                <input type='checkbox' checked={selectAll} onChange={handleSelectAllChange} />
                            </th>
                            <th className='tablewidth'>User Name</th>
                            <th className='tablewidth'>Seats</th>
                            <th className='tablewidth'>Passenger(s)</th>
                            <th className='tablewidth'>Email</th>
                            <th className='tablewidth'>Phone</th>
                            <th className='tablewidth'>Total</th>
                            <th className='tablewidth'>Booked At</th>
                            <th className='tablewidth'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, idx) => (
                            <tr key={idx}>
                                <td>
                                    <input type='checkbox' checked={selectedBookings.includes(booking._id)} onChange={(e) => handleCheckboxChange(e, booking._id)} />
                                </td>
                                <td className='tablewidth'>
                                    {usersMap[booking.user]?.username || 'Unknown User'}
                                </td>

                                <td className='tablewidth'>{booking.selectedSeats.join(', ')}</td>
                                <td className='tablewidth'>
                                    {booking.passengers.map((p, i) => (
                                        <div key={i}> {p.name} ({p.gender}, {p.age}) </div>
                                    ))}
                                </td>
                                <td className='tablewidth'>{booking.email}</td>
                                <td className='tablewidth'>{booking.countryCode} {booking.phone}</td>
                                <td className='tablewidth'>Rs:{booking.totalAmount}</td>
                                <td className='tablewidth'>
                                    {booking.createdAt ? new Date(booking.createdAt).toLocaleString() : 'Date not available'}
                                </td>

                                <td className='tablewidth'>
                                    <Button variant='primary' onClick={() => handleViewBooking(booking)}><FaEye /></Button>
                                    <Button variant='danger' className='ms-2' onClick={() => handleDeleteBooking(booking._id)}><RiDeleteBinLine /></Button>
                                </td>
                            </tr>
                        ))}
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

                    <span> Showing Page {currentPage} of {totalPages} ({totalPages} Pages)</span>

                </div>

            </div>

            {/* View Booking Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Booking Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedBookingDetails && (
                        <div>
                            <h5>User Name: {usersMap[selectedBookingDetails.user]?.username || 'Unknown User'}</h5> {/* User Name Displayed */}
                            <h5>Bus Name: {selectedBookingDetails.bus.busName}</h5> {/* Bus Name Displayed */}
                            <h5>From: {selectedBookingDetails.bus.from}</h5>
                            <h5>To: {selectedBookingDetails.bus.to}</h5>
                            <h5>
                                Date of Departure:{" "}
                                {selectedBookingDetails.bus.dateOfDeparture
                                    ? new Date(selectedBookingDetails.bus.dateOfDeparture).toLocaleDateString("en-IN", {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })
                                    : "Not available"}
                            </h5>

                            <h6>Seats: {selectedBookingDetails.selectedSeats.join(', ')}</h6>
                            <h6>Passengers:</h6>
                            {selectedBookingDetails.passengers.map((p, i) => (
                                <div key={i}>
                                    {p.name} ({p.gender}, {p.age})
                                </div>
                            ))}
                            <h6>Email: {selectedBookingDetails.email}</h6>
                            <h6>Phone: {selectedBookingDetails.countryCode} {selectedBookingDetails.phone}</h6>
                            <h6>Total Amount: ₹{selectedBookingDetails.totalAmount}</h6>
                            <h6>Booked At: {new Date(selectedBookingDetails.createdAt).toLocaleString()}</h6>
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Booking;
