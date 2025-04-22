import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { Container, Form, Button } from "react-bootstrap";
import { useBooking } from "./BookingContext";
import Copy from "./Copy";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { updateBookedSeats } = useBooking();
  

  const { bus, selectedSeats } = location.state || {};

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      passengers: selectedSeats.map(() => ({
        name: "",
        gender: "",
        age: "",
        state: "",
      })),
      email: "",
      countryCode: "+91",
      phone: "",
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "passengers",
  });

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      bus: {
        id: bus._id,
        name: bus.name,
        price: bus.price,
        origin: bus.origin,
        destination: bus.destination,
        date: bus.date,
      },
      selectedSeats,
      totalAmount: selectedSeats.length * bus.price,
    };

    try {
      const res = await fetch("http://localhost:5001/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Booking confirmed");
        updateBookedSeats(bus.id, selectedSeats); // Update booked seats in context
        navigate("/", { state: payload }); // Then navigate
      } else {
        alert("Booking failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };



  if (!bus || !selectedSeats) return <div>No booking data found</div>;

  return (
    <div className="bg-light py-4">
      <Container className="bg-white p-4 rounded shadow">
        <h4 className="mb-4">Passenger Details</h4>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <h6>Passenger Information</h6>

          {fields.map((field, index) => (
            <div key={field.id} className="mb-4 border p-3 rounded">
              <div className="mb-2 fw-semibold">
                Passenger {index + 1} | <span className="text-dark">Seat {selectedSeats[index]}</span>
              </div>

              {/* Name */}
              <Form.Group className="mb-2">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  {...register(`passengers.${index}.name`, { required: true })}
                />
                {errors.passengers?.[index]?.name && (
                  <small className="text-danger">Name is required</small>
                )}
              </Form.Group>

              {/* Gender & Age */}
              <div className="d-flex gap-3 mb-2">
                <Form.Group>
                  <Form.Label>Gender</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      type="radio"
                      label="Male"
                      value="Male"
                      {...register(`passengers.${index}.gender`, { required: true })}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      label="Female"
                      value="Female"
                      {...register(`passengers.${index}.gender`, { required: true })}
                    />
                  </div>
                  {errors.passengers?.[index]?.gender && (
                    <small className="text-danger">Select gender</small>
                  )}
                </Form.Group>

                <Form.Group>
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Age"
                    {...register(`passengers.${index}.age`, { required: true, min: 1 })}
                  />
                  {errors.passengers?.[index]?.age && (
                    <small className="text-danger">Valid age required</small>
                  )}
                </Form.Group>
              </div>

              {/* State of Residence */}
              <Form.Group>
                <Form.Label>State of Residence</Form.Label>
                <Form.Select {...register(`passengers.${index}.state`, { required: true })}>
                  <option value="">-- Select State --</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Karnataka">Karnataka</option>
                </Form.Select>
                {errors.passengers?.[index]?.state && (
                  <small className="text-danger">State is required</small>
                )}
              </Form.Group>
            </div>
          ))}

          {/* Contact Section */}
          <h6>Contact Details</h6>
          <p className="text-warning small">Your ticket will be sent to these details</p>

          {/* Email */}
          <Form.Group className="mb-3">
            <Form.Label>Email ID</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email ID"
              {...register("email", { required: true })}
            />
            {errors.email && <small className="text-danger">Email is required</small>}
          </Form.Group>

          {/* Phone */}
          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <div className="d-flex">
              <Form.Select className="me-2" style={{ width: "100px" }} {...register("countryCode")}>
                <option value="+91">+91</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
              </Form.Select>
              <Form.Control
                type="tel"
                placeholder="Phone Number"
                {...register("phone", { required: true })}
              />
            </div>
            {errors.phone && <small className="text-danger">Phone is required</small>}
          </Form.Group>

          {/* Amount + Proceed */}
          <div className="d-flex justify-content-between align-items-center mt-4">
            <div>
              <strong>Total Amount :</strong> INR {bus.price * selectedSeats.length}.00 <br />
              <small className="text-muted">(*Exclusive of Taxes)</small>
            </div>
            <Button type="submit" className="btn-danger px-4">
              PROCEED TO PAY
            </Button>
          </div>
        </Form>
      </Container>
      <Copy/>
    </div>
  );
};

export default PaymentPage;
