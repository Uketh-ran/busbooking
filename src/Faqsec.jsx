
import "./Faqsec.css"
import React, { useState } from "react";
import { Container } from "react-bootstrap";

const Faqsec = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const [activeTab, setActiveTab] = useState("General");

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const tabs = ["General", "Ticket-related", "Payment", "Cancellation & Refund"];

    const faqData = {
        General: [
            { question: "Can I track the location of my booked bus online?", answer: "Yes, you can track your bus online by using our bus tracking app feature called “Track My Bus”. This feature allows passengers and their families to track the live bus location. You may follow your bus on a map and use the information to plan your trip to the boarding point and to get off at the correct stop. Family and friends may also check the bus position to schedule pick-ups and ensure safety." },
            { question: "What are the advantages of purchasing a bus ticket with redBus?", answer: "There are many advantages to purchasing online bus tickets with redBus. redBus is India’s most trusted bus ticket company, where you can book any type of private or government-owned bus. redBus allows you to find the different types of buses, choose the preferred bus seats, and find your nearest boarding and dropping points. You can also filter the buses based on timings, like morning, evening, etc." },
            { question: "Why book bus tickets online on redBus?", answer: "Booking bus tickets online on redBus is increasingly becoming the preferred choice for travellers due to its numerous advantages over traditional methods. With redBus, customers can book their bus tickets effortlessly from the comfort of their homes, avoiding the inconvenience of standing in long lines at bus stations or travel agencies. Online bus booking offers the luxury of comparing different bus schedules and operators and presents various discount offers and exclusive deals, resulting in significant savings. Payment security is another notable feature of online booking, which ensures that your financial information is well-protected against fraud. Additionally, customers can pick their seats, providing a customized travel experience. Online bus booking platforms give real-time updates about any changes in the bus timetable, including delays or cancellations, enabling better planning. The convenience doesn't stop here; travellers can even compare onboard amenities like charging points or snacks, further enhancing the travel experience." },
            { question: "Do I need to create an account on the redBus site to book my bus ticket?", answer: "No, you don’t have to create an account on the redBus site to book your bus ticket. But it is advisable to make one to accelerate the process next time you want to book bus tickets. Also, redBus has many discounts and offers that you can easily access if you have an account with us." },
            { question: "Does bus booking online cost me more?", answer: "Not at all! The bus ticket price is the same as you would get from the bus operator/ counter of any bus ticket agency. redbus reduces the travel budget by comparing the bus ticket prices among various operators, making it a more cost-effective choice. Therefore, online bus booking is increasingly recognized as a more convenient, efficient, and economical mode of securing travel arrangements." },
            { question: "How can I get the discounts on the bus booking?", answer: "To get a discount on bus booking, please visit https://www.redbus.in/info/OfferTerms and check the available offers. Copy the coupon code and paste it during checkout to avail of the discount." },
            { question: "What's New in Bus Booking on redBus?", answer: "Primo Bus Ticket: redBus has launched Primo bus services, where passengers can enjoy travelling in high-rated buses with best-in-class services. While looking for bus tickets on the desired route, customers can check the Primo tag to choose this excellent service. From hygiene standards to on-time service and comfort, passengers can benefit from the online bus booking experience from Primo buses." }
        ],
        "Ticket-related": [
            { question: "How can I book bus tickets on redBus?", answer: "Bus ticket Booking is effortless on redBus. To book the bus tickets, go to the main page and enter your source city and destination city in the “From” and “To” fields, respectively. Enter the travel date and hit the search button. Now, you will see the bus list available on the given bus route. You can use the filter option, such as duration, fare, bus type, etc., to rearrange the list accordingly. This makes it easier for customers to book their bus tickets online with redBus." },
            { question: "Can I change the date of my journey after I have booked my bus ticket?", answer: "Yes. You can change the journey date after booking a bus ticket on redBus by clicking the “Reschedule” icon if your travel plan might get interrupted while booking. Bus operators with the “Reschedule icon” next to it offer rescheduling of the bus ticket in case your initially selected date is not viable to travel on." },
            { question: "Is it mandatory to take a printout of the ticket?", answer: "It depends on the bus operator you have booked your online bus tickets with. Even mTickets are available on redBus. For operators that support mTickets, the SMS that is sent to your mobile can be produced at the time of boarding and you will be allowed to travel.For operators that do not support mTickets it is a must to take a printout of the e-ticket and produce it at the time of boarding. The e-ticket is sent to the e-mail ID provided at the time of boarding.To know which operators are mTicket enabled, look for the mTicket icon under the mTicket column while searching for buses." },
            { question: "I've lost my ticket. What should I do now?", answer: "A copy of the bus ticket would have been sent to you by email when you booked bus ticket online. Please take a printout of that mail and produce it at the time of boarding. If you have not received the ticket e-mail, please call any of our call centers and our executive will resend you a copy by mail." },
            { question: "What is an mTicket?", answer: "An mTicket is an SMS that is sent to your mobile on booking bus tickets with select private bus operators. This SMS has the TIN number and the PNR number along with other ticket related information. It can be used to board the bus. Please note that not all operators accept mTickets. To know which operators are mTicket enabled, look for the mTicket icon under the mTicket column while searching for buses." },
            { question: "I didn’t receive my mTicket. Can you resend it?", answer: "You can generate your mTicket online. To generate m-Ticket online click on the Print/SMS ticket link on the redbus home page on www.redBus.in. Enter your TIN number mentioned on the e-ticket we emailed you. Choose the SMS option and click on Submit. In case you don’t have a copy of the e-ticket either, contact our call center and our executive will assist you." },
            { question: "I entered the wrong mobile number while booking. Can I get my mTicket on a different number?", answer: "Yes, you can get the m-Ticket on the different numbers.To get the M-Ticket on the different number please contact redBus call center and our customer executive will send you the mTicket on your desired number." }
        ],
        Payment: [
            { question: "Is it safe to use my credit or debit card to buy bus tickets on redBus?", answer: "Transactions on redBus are very safe. We employ the best-in-class security and the transactions done are secure. Apart from being certified by Verisign, redBus uses Secure Socket Layers (SSL) data encryption. Using SSL ensures that the information exchanged with us is never transmitted unencrypted, thus protecting the information from being viewed by unauthorized individuals." },
            { question: "Does the owner of the credit card/debit card with which the bus ticket is purchased need to be one of the passengers?", answer: "Not at all! A passenger can use any debit or credit card to pay for the bus ticket, not necessarily their own. However, please note that the passenger in whose name the ticket is booked should carry a proof of his identity (along with the ticket) at the time of boarding the bus." },
            { 
                question: "What are the different payment options available on Bus Ticket booking?", 
                answer: (
                    <ul className="">
                        <li>There are many payment modes available to book buses on the redBus website and app. Some of these payment modes that are available for the bus ticket booking process are:Debit Card/Credit Card/ATM Cards (Visa, MasterCard, Maestro & Rupay)</li>
                        <li>Net Banking (HDFC Bank, ICICI Bank, Indian Bank, Axis Bank, SBI, and all major banks)</li>
                        <li>UPI (Google Pay, Amazon Pay, PhonePe)</li>
                        <li>Book Now, Pay Later (Simpl)</li>
                        <li>Wallets (Paytm) Make sure to check the coupon code to get discounts on bus booking online. redBus offers a lot of redDeals to book bus tickets on a budget.</li>
                    </ul>
                )
            },
            { question: "How does the transaction appear on my card / account statement?", answer: "Transactions on redBus will appear as REDBUS.IN, www.redbus.in in your bank statement." }
        ],
        "Cancellation & Refund": [
            { question: "How do I cancel my bus ticket?", answer: "Yes you can cancel bus tickets online, Most of the tickets can be canceled online. However, there are some bus tickets that can only be canceled through our call center.However please note that the cancellation fee and cancellation period may differ for specific bus services. Please contact any of our executives for cancellation details on any specific service." },
            { question: "How can I cancel my bus ticket online?", answer: "To cancel the bus ticket online, you need to click on the cancellation link provided on our home page. Enter your ticket number and the e-mail ID that was provided at the time of bus booking and click on cancel ticket." },
            { question: "I missed the bus. Do I get a refund?", answer: "redBus provides a 100% refund if the bus is missed due to either redBus or its partner company's fault. However, if the bus is missed due to any other reason not directly related to redBus no refund is provided." },
            { question: "How can I get a refund in case I cancel my ticket?", answer: "The refund is provided as per cancellation policy of the operator. The refund can be credited to the source of payment (Example: debit card, credit card, net banking) or credited to redBus wallet. Wallet credit can be used for bus booking in future (within 6 months of cancellation)." },
            { question: "What happens if the bus does not leave on time or is canceled?", answer: "If your bus does not leave on time or is canceled, in such situations, you will need to consult the counter of the respective bus operators. You can also call the redBus customer care to discuss the appropriate actions." },
            { question: "How can I reschedule my bus tickets?", answer:(
                <ul className="">
                    <li>To reschedule your bus ticket on redBus, follow these steps: Visit https://www.redbus.in/reschedule</li>
                    <li>Search for your bus ticket by entering your ticket number and registered email ID. </li>
                    <li>Verify your online bus ticket details and select the date to reschedule your journey. </li>
                    <li>Verify your online bus ticket details and select the date to reschedule your journey. </li>
                    <li>Select a bus operator, verify every detail, and make your payment if any difference in bus ticket prices needs to be cleared.</li>
                </ul>
            )  }
        ],
    };

    return (
        <Container>
            <div className="mx-auto pt-5">
                <h2 className="fs-1  mb-5">FAQs related to Bus Tickets Booking</h2>

                {/* Tabs */}
                <div className="flex space-x-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            className={`homefaq-btn pb-2 text-lg ${activeTab === tab ? "active" : ""}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* FAQ List */}
                <div className="mt-4">
                    {faqData[activeTab].map((faq, index) => (
                        <div
                            key={index}
                            className={`bg-ques-home-faq mb-2 ${openIndex === index ? "active" : ""}`}
                        >
                            <button
                                className="flex question-home-faq p-4 text-left fw-bold font-semibold"
                                onClick={() => toggleFAQ(index)}
                            >
                                {faq.question}
                                <span className="plus-minus">{openIndex === index ? "−" : "+"}</span>
                            </button>
                            {openIndex === index && <p className="ps-4 pe-4">{faq.answer}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default Faqsec;
