import { useState, useEffect } from "react";

import classes from "./contact-form.module.css";
import Notification from "../ui/notification";

async function sendContactData(contactDetails) {
    const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(contactDetails),
        headers: {
            "Content-Type": "application/json",
        }
    });

    const data = await response.json();

    if(!response.ok) {
        throw new Error(data.message || "Something went wrong!");
    }
}

function ContactForm() {
    const [contact, setContact] = useState({
        email: "",
        name: "",
        message: ""         
    });
    const [requestStatus, setRequestStatus] = useState(); // "pending", "success", "error"
    const [requestError, setRequestError] = useState();

    useEffect(() => {
        if(requestStatus === "success" || requestStatus === "error") {
            const timer = setTimeout(() => {
                setRequestStatus(null);
                setRequestError(null);
            }, 3000);
            
            return () => clearTimeout(timer); 
        }
    }, [requestStatus]);

    function handleChange(event){
        const {value, name} = event.target;
    
        setContact(prevValue => {
            if(name === "email"){
                return {
                    email: value,
                    name: prevValue.name,
                    message: prevValue.message
                };
            } else if (name === "name"){    
                return {
                    email: prevValue.email,
                    name: value,
                    message: prevValue.message
                };
            } else if (name === "message"){    
                return {
                    email: prevValue.email,
                    name: prevValue.name,
                    message: value
                };
            } 
        });
    }

    async function sendMessageHandler(event) {
        event.preventDefault();

        setRequestStatus("pending");

        try {
            await sendContactData(contact);
            setRequestStatus("success");
            setContact({
                email: "",
                name: "",
                message: ""
            })
        } catch (error) {
            setRequestError(error.message);
            setRequestStatus("error");
        }

    }
    
    let notification;

    if (requestStatus === "pending") {
        notification = {
            status: "pending",
            title: "Sending message...",
            message: "Your message is on its way"
        }
    }

    if (requestStatus === "success") {
        notification = {
            status: "success",
            title: "Success!",
            message: "Message sent successfully!"
        }
    }

    if (requestStatus === "error") {
        notification = {
            status: "error",
            title: "Error!",
            message: requestError
        }
    }

    return (
        <section className={classes.contact}>
            <h1>How can I help you?</h1>
            <form className={classes.form} onSubmit={sendMessageHandler}>
                <div className={classes.control}>
                    <div className={classes.control}>
                        <label htmlFor="email">Your Email</label>
                        <input onChange={handleChange} type="email" name="email" required value={contact.email}/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="name">Your Name</label>
                        <input onChange={handleChange} type="text" name="name" required value={contact.name}/>
                    </div>
                </div>
                <div className={classes.control}>
                    <label htmlFor="message">Your Message</label>
                    <textarea onChange={handleChange} name="message" rows="5" required value={contact.message}/>
                </div>
                <div className={classes.actions}>
                    <button>Send Message</button>
                </div>
            </form>
            {notification && (
                <Notification 
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />
            )}
        </section>
    );
}

export default ContactForm;