import dbConnect from "../../lib/dbConnect";
import Contact from "../../models/Contact";

async function handler(req, res) {
    const { method } = req
    
    try {
        await dbConnect()
    }catch(error) {
        res.status(500).json({ message: 'Connecting to the database failed!' });
    }

    switch (method) {
        case 'POST':

            const { email, name, message } = req.body;

            if (
                !email || 
                !email.includes("@") || 
                !name || 
                name.trim() === "" || 
                !message || 
                message.trim() === ""
            ) {
                res.status(422).json({ message: "Invalid input." });
            }

            const newContact = new Contact({
                email: email,
                name: name,
                message: message,
            });
            
            try {
                
                const contactAdded = await newContact.save();
                
                res.status(201).json({ message: "Successfully stored message!", message: contactAdded });
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}

export default handler;